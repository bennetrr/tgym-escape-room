export interface EscapeStation {
    id: string;
    name: string;
    code: string;
    completed: boolean;
}

export function mapPocketBaseToEscapeStation(obj: any): EscapeStation {
    const data: EscapeStation = {
        id: obj.id,
        name: obj.name,
        code: obj.code,
        completed: false
    };
    return data;
}
