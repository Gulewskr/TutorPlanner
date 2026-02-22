export type AccountDTO = {
    id: number;
    name: string;
    color: string;
}

//TODO - add this in database
export const ACCOUNTS: AccountDTO[] = [{
    id: 0,
    name: 'Natalia',
    color: '#FFC0CB'
}, {
    id: 1,
    name: "Rafał",
    color: '#8cc0fc'
}];
