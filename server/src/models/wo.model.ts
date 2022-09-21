import { model, Schema, Document } from 'mongoose'
import { Orden } from '@/interfaces/wo.interface'

const woSchema: Schema = new Schema(
    {
        asignado: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        supervisor: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        prioridad: {
            type: Schema.Types.String
        },
        createdBy: {
            type: Schema.Types.String
        },
        descripcion: {
            type: Schema.Types.String
        },
        fechaInicio: {
            type: Date
        },
        fechaTermino: {
            type: Date
        },
        tareas: [
            {
                type: Object,
            }
        ],
        cliente: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Cliente'
            }
        ],
        contrato: [
            {
                type: Object,
            }
        ],
        deleted: {
            type: Boolean,
            required: false
        },
        nroWo: {
            type: Number
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