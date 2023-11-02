import PocketBase from "pocketbase";
import {writable} from "svelte/store";
import type {UsersResponse} from "../interfaces/PocketBaseTypes";

export const pb = new PocketBase("http://localhost:3456");
// @ts-ignore
export const currentUser = writable<UsersResponse>(pb.authStore.model);

pb.authStore.onChange(() => {
    // @ts-ignore
    currentUser.set(pb.authStore.model);
});
