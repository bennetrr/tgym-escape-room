import {writable} from "svelte/store";
import type {EscapeStation} from "./DataStructures";

export const stations = writable<EscapeStation[]>([]);
