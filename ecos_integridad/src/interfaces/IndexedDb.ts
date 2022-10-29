import { Ordenes } from "./Ordenes"

export interface WoDatabase {
    message: string
    database: IDBDatabase
    error: Event | null
    state: string
}

export interface WoActualiceDatabase {
    data: Event
    state: boolean
    err: any
}

export interface WoById {
    data: Ordenes
    state: boolean
    error: any
}

export interface WoAll {
    data: Ordenes[]
    state: boolean
    error: any
}