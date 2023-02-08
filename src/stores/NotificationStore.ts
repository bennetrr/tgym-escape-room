import {writable} from "svelte/store";
import {v4 as uuid4} from "uuid";

import type INotification from "../interfaces/INotification";

export const notifications = writable<INotification[]>([]);

export function addNotification(data: INotification): string {
    data.id = uuid4();
    notifications.update(oldData => [...oldData, data]);
    return data.id;
}

export function removeNotification(id: string) {
    notifications.update(oldData => oldData.filter(x => x.id !== id));
}
