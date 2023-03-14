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

export type EscapeStationsRecord<Tcodes = unknown> = {
	name: string
	codes: null | Tcodes
	color: string
}

export type UsersRecord = {
	completed_stations?: RecordIdString[]
	my_station: RecordIdString
}

// Response types include system fields and match responses from the PocketBase API
export type EscapeStationsResponse<Tcodes = unknown> = EscapeStationsRecord<Tcodes> & BaseSystemFields
export type UsersResponse<Texpand = unknown> = UsersRecord & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	escape_stations: EscapeStationsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	escape_stations: EscapeStationsResponse
	users: UsersResponse
}