import { model, Schema, Document, Mongoose } from 'mongoose'
import { Contrato } from '@/interfaces/clients.interface'

const contratoSchema: Schema = new Schema(
    {
        tipoContrato: {
            type: String,
            required: [true, 'Se requiere un tipo de contrato']
        },
        descripcion: {
            type: String,
            required: [true, 'Se requiere una descripción']
        },
        fechaInicio: {
            type: Date,
            required: false
        },
        fechaTermino: {
            type: Date,
            required: false
        },
        supervisores: [
            {
                type: Schema.Types.ObjectId,
                required: false
            }
        ],
        operarios: [
            {
                type: Schema.Types.ObjectId,
                required: false
            }
        ],
        cliente: {
            type: Schema.Types.ObjectId,
            ref: 'Cliente'
        }
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

const contratoModel = model<Contrato & Document>('Contrato', contratoSchema)

export default contratoModel
