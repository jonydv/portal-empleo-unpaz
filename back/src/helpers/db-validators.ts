import User from '../models/user';




const emailAlreadyExistsValidator = async(email: string = '') => {
    const emailAlreadyExists = await User.findOne({email});

    if(emailAlreadyExists){
        throw new Error(`El email: ${email} ya esta registrado`);
    }
}

export {
    emailAlreadyExistsValidator
};