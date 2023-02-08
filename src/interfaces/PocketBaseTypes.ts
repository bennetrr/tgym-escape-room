/**
 * This file was @generated using pocketbase-typegen
 */

export enum Collections {
    EscapeStations = "escape_stations",
    Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
    id: RecordIdString
    created: IsoDateString
    updated: IsoDateString
    collectionId: string
    collectionName: Collections
    expand?: T
}

export type AuthSystemFields<T = never> = {
    email: string
    emailVisibility: boolean
    username: string
    verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type EscapeStationsRecord = {
    name: string
    code: string
}

export type UsersRecord = {
    completed_stations?: RecordIdString[]
}

// Response types include system fields and match responses from the PocketBase API
export type EscapeStationsResponse = EscapeStationsRecord & BaseSystemFields
export type UsersResponse<Texpand = unknown> = UsersRecord & AuthSystemFields<Texpand>

export type CollectionRecords = {
    escape_stations: EscapeStationsRecord
    users: UsersRecord
}
