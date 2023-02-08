import {writable} from "svelte/store";
import type {EscapeStation} from "../interfaces/IEscapeStation";

export const stations = writable<EscapeStation[]>([]);
