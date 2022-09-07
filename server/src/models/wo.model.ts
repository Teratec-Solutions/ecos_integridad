import { model, Schema, Document } from 'mongoose'
import { Orden } from '@/interfaces/wo.interface'

const woSchema: Schema = new Schema(
    {
        asignado: [
            {
                type: Object
            }
        ],
        fechaInicio: {
            type: Date
        },
        fechaTermino: {
            type: Date
        },
        tareas: [
            {
                type: Object
            }
        ],
        cliente: [
            {
                type: Object
            }
        ],
        deleted: {
            type: Boolean,
            required: false
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

const woModel = model<Orden & Document>('WorkOrder', woSchema)

export default woModel