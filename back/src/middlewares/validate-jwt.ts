import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { JwtPayload } from '../interfaces/jwt-payload';
import { ExtendedRequest } from '../interfaces/request-extended';
import User from '../models/user';


const validateJWT = async (req: ExtendedRequest, res: Response, next: NextFunction) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }
    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY!) as JwtPayload;

        //Leer el usuario de la BBDD que corresponde al uid
        const user = await User.findById(uid);

        //Verificar si el uid tiene el state en true
        if (!!user && !user.state!) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con state: false'
            })
        }
        !!user ? req.user = user : null;

        next();

    } catch (error) {

        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

};

export {
    validateJWT
};
