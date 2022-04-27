import { Schema, model } from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    surname: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'RECRUITER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;

    return user;
}

const User = model<UserInterface>('User', userSchema);
export default User;