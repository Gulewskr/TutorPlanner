export interface Account {
    id: number;
    name: string;
    color: string;
}

//TODO - remove this and use data returned from server instead
export const ACCOUNTS: Account[] = [{
    id: 0,
    name: "Natalia",
    color: '#FFC0CB'
}, {
    id: 1,
    name: "Rafał",
    color: '#8cc0fc'
}]
