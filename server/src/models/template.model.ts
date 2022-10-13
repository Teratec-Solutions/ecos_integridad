import { model, Schema, Document } from 'mongoose'
import { Template } from '@/interfaces/template.interface'

const templateSchema: Schema = new Schema(
    {
        nombrePlanilla: {
            type: Schema.Types.String
        },
        informacion: [
            {
                nombreDato: {
                    type: Schema.Types.String
                },
                tipoDato: {
                    type: Schema.Types.String
                }
            }
        ],
        contenido: [
            {
                titulo: {
                    type: Schema.Types.String
                },
                elementos: [
                    {
                        descripcion: {
                            type: Schema.Types.String
                        },
                        respuesta: {
                            type: Schema.Types.String || Schema.Types.Number || Schema.Types.Boolean
                        }
                    }
                ],
                tareas: [
                    {
                        id: {
                            type: Schema.Types.Number
                        },
                        nroTarea:  {
                            type: Schema.Types.Number
                        },
                        descripcionTarea: {
                            type: Schema.Types.String
                        },
                        observaciones: {
                            type: Schema.Types.String
                        },
                        respuestas: [
                            {
                                habilitado: {
                                    type: Schema.Types.Boolean
                                },
                                valorRespuesta: {
                                    type: Schema.Types.String || Schema.Types.Number || Schema.Types.Boolean
                                }
                            }
                        ],
                        imagenes: [
                            {
                                urlBase64: {
                                    type: Schema.Types.String
                                },
                                url: {
                                    type: Schema.Types.String
                                },
                                metadata: {
                                    autor: {
                                        type: Schema.Types.String
                                    },
                                    localizacion: {
                                        lat: {
                                            type: Schema.Types.Number
                                        },
                                        lng: {
                                            type: Schema.Types.Number
                                        },
                                    }
                                }
                            }
                        ]
                    }
                ],
                totalRespuestas: {
                    type: Schema.Types.Number
                }
            }
        ],
        responsablesInternos: [
            {
                responsable: {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                },
                fecha: {
                    type: Schema.Types.Date
                },
                firma: {
                    type: Schema.Types.String
                },
            }
        ],
        responsablesExternos:  [
            {
                responsable: {
                    nombre: {
                        type: Schema.Types.String
                    },
                    apellido: {
                        type: Schema.Types.String
                    }
                },
                fecha: {
                    type: Schema.Types.Date
                },
                firma: {
                    type: Schema.Types.String
                }
            }
        ],
        contrato: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Contrato'
            }
        ],
        cliente: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Cliente'
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

const templateModel = model<Template & Document>('Template', templateSchema)

export default templateModel