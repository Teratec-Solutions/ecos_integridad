import { WoActualiceDatabase, WoAll, WoById, WoDatabase } from "../interfaces/IndexedDb"
import { Template } from "../interfaces/Template"

const init = () => {
    const indexedDb: IDBFactory = window.indexedDB
    const conexion = indexedDb.open('Executions', 1)
    return new Promise<WoDatabase>(resolve => {
        conexion.onsuccess = () =>{
            let db: IDBDatabase = conexion.result
            resolve(
                {
                    message: "Base de datos abierta",
                    database: db,
                    error: null,
                    state: 'abierta'
                }
            )
        }
    
        conexion.onupgradeneeded = (e) =>{
            let db = (e.target as IDBOpenDBRequest).result
            const coleccionObjetos = db.createObjectStore('WorkOrders',{
                keyPath: 'id'
            })
            coleccionObjetos.transaction.oncomplete = (event) => {
                resolve(
                    {
                        message: "Base de datos creada / actualizada",
                        database: db,
                        error: null,
                        state: 'actualizada'
                    }
                )
            }
            
        }
    
        conexion.onerror = (error) =>{
            resolve(
                {
                    message: "Error",
                    error: error,
                    state: 'error'
                } as WoDatabase
            )
        }
    })
}

const actualizar = (data: Object, database: IDBDatabase) => {
    return new Promise<WoActualiceDatabase>(resolve => {
        try {
            const trasaccion = database.transaction(['WorkOrders'],'readwrite')
            const coleccionObjetos = trasaccion.objectStore('WorkOrders')
            const conexion = coleccionObjetos.put(data)

            conexion.onsuccess = (ev) =>{
                resolve({
                    data: ev,
                    state: true,
                    err: null
                })
            }

            conexion.onerror = (ev) =>{
                resolve({
                    data: ev,
                    state: false,
                    err: null
                })
            }

        } catch (err) {
            resolve({
                err: err,
                state: false
            } as WoActualiceDatabase)
        }
    }) 
}

const eliminar = (clave: string | number, database: IDBDatabase) =>{      
    return new Promise(resolve => {
        const trasaccion = database.transaction(['WorkOrders'],'readwrite')
        const coleccionObjetos = trasaccion.objectStore('WorkOrders')
        const conexion = coleccionObjetos.delete(clave)

        conexion.onsuccess = (ev) =>{
            resolve({
                data: ev,
                state: true
            })
        }

        conexion.onerror = (ev) =>{
            resolve({
                data: ev,
                state: false
            })
        }
    })
}

const leerWoPorId = (id: string, database: IDBDatabase) => {
    return new Promise<WoById>(resolve => {
        const trasaccion = database.transaction(['WorkOrders'],'readonly')
        const coleccionObjetos = trasaccion.objectStore('WorkOrders')
        const conexion = coleccionObjetos.openCursor()
    
        conexion.onsuccess = () =>{
            const objectResponse: IDBRequest<Template> = coleccionObjetos.get(id)
            objectResponse.onsuccess = (ev) => {
                resolve({
                    data: (ev.target as IDBRequest).result,
                    state: true,
                    error: null
                })
            }
            objectResponse.onerror = (err) => {
                resolve({
                    error: err,
                    state: false
                } as WoById)
            }
        }
    
        conexion.onerror = (err) =>{
            resolve({
                error: err,
                state: false
            } as WoById)
        }
    })
}


const leerTodas = (database: IDBDatabase) => {
    return new Promise<WoAll>(resolve => {
        const trasaccion = database.transaction(['WorkOrders'],'readonly')
        const coleccionObjetos = trasaccion.objectStore('WorkOrders')
        const conexion = coleccionObjetos.openCursor()
    
        conexion.onsuccess = () =>{
            const allObject: IDBRequest<Template[]> = coleccionObjetos.getAll()
            allObject.onsuccess = (ev) => {
                resolve({
                    data: (ev.target as IDBRequest).result,
                    state: true,
                    error: null
                })
            }
            allObject.onerror = (err) => {
                resolve({
                    error: err,
                    state: false
                } as WoAll)
            }
        }
    
        conexion.onerror = (err) =>{
            resolve({
                error: err,
                state: false
            } as WoAll)
        }
    })
}

export default {
    init,
    actualizar,
    eliminar,
    leerWoPorId,
    leerTodas
}