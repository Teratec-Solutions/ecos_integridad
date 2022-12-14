import { model, Schema, Document } from 'mongoose'
import { Cliente } from '@/interfaces/clients.interface'

const clientSchema: Schema = new Schema(
    {
        empresa: {
            type: Object,
            required: [true, 'Name is required']
        },
        habilitado: {
            type: Boolean,
            required: false
        },
        contratos: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Contrato'
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

const clientModel = model<Cliente & Document>('Cliente', clientSchema)

export default clientModel
