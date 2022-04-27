import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import User from "../models/user";
import { googleVerify } from "../helpers/google-verify";
import { generateJWT } from "../helpers/jwt-generator";


const getUsers = async (req: Request, res: Response) => {

    //En el query de la consulta podemos enviar los parametros limit y from
    //De esta manera traemos los usuarios de forma paginada
    const { limit = 10, from = 0 } = req.query;
    // Utilizamos el state para verificar si el usuario esta activo o inactivo
    // solo queremos traernos en la consulta los usuarios activos
    const query = { state: true }

    const [total, users] = await Promise.all([
    //Contamos el total de usuarios activos y los enviamos en la respuesta
        User.countDocuments(query), 
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])
    //Devolvemos el total de usuarios y el arreglo de usuarios
    res.json({
        total,
        users
    });
};

const registerUser = async (req: Request, res: Response) => {
    //Obtenemos desde el body, el nombre, email, password y rol del usuario
    const { name, surname, email, password, role } = req.body;
    const user = new User({ name, surname, email, password, role });

    // Encriptamos la contraseña con la libreria bcryptjs para evitar almacenarla de forma vulnerable
    const salt = bcryptjs.genSaltSync(); 
    user.password = bcryptjs.hashSync(password, salt);

    //Guardamos el usuario en la base de datos

    await user.save();

    res.json({
        msg: 'Usuario registrado correctamente',
        user
    });
};

const loginUser = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        //Verificar si el email existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos'
            });
        }

        //Si el usuario esta inactivo
        if (!user.state) {
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos'
            });
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password  incorrectos'
            });
        }

        //Generar el JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Ocurrio un problema con el servidor'
        })
    }
}

const googleSignIn = async (req: any, res: Response) => {
    const tokenId: string = req.body.tokenId;

    try {

        const { email, surname, name, img } = await googleVerify(tokenId);

        //varificamos si el usuario ya estaba registrado en la BBDD
        let user = await User.findOne({ email });
        //Si no esta registrado lo guardamos en la BBDD
        if (!user) {
            //Tengo que crear usuario
            const data = {
                name,
                surname,
                email,
                password: 'google', //Nunca va a hacer match ya que es un password simbolico
                img,
                google: true
            };

            user = new User(data);
            await user.save();
        }
        //Si Esta registrado pero su estado esta en falso quiere decir que fue desavtivado o borrado en algun momento
        if (!!user && !user.state) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        //Si salio todo bien generamos el token JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Token de google no es válido'
        })
    }

}

export{
    getUsers,
    loginUser,
    registerUser,
    googleSignIn
}