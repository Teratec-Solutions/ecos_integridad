import { model, Schema, Document } from 'mongoose'
import { User } from '@interfaces/users.interface'

const userSchema: Schema = new Schema(
    {
        nombre: {
            type: String,
            required: [true, 'Name is required']
        },
        apellido1: {
            type: String,
            required: false
        },
        apellido2: {
            type: String,
            required: false
        },
        fono: {
            type: String
        },
        direccion: {
            type: String
        },
        region: {
            type: String
        },
        ciudad: {
            type: String
        },
        comuna: {
            type: String
        },
        depto: {
            type: String
        },
        profesion: {
            type: String
        },
        nacionalidad: {
            type: String
        },
        estadoCivil: {
            type: String
        },
        sueldoBase: {
            type: String
        },
        comision: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        run: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            required: false
        },
        emailVerifiedAt: {
            type: Date,
            default: null,
            required: false
        },
        fechaTitulacion: {
            type: String,
            required: false
        },
        estado: {
            type: Boolean,
            default: true
        },
        role: {
            type: String,
            required: false
        },
        subRoles: [
            {
                type: Schema.Types.String,
                required: false
            }
        ]
    },
    {
        timestamps: true,
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
)

const userModel = model<User & Document>('User', userSchema)

export default userModel
