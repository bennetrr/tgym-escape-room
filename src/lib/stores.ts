import {writable} from "svelte/store";
import type {EscapeStation} from "./DataStructures";

export const selectedSetId = writable<string>();

export const sets = writable<EscapeStation[]>([]);

export const addSetActionRunning = writable(false);
