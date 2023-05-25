interface IListColumns {
    field: string;
    name: string;
    width: string;
    justifyLastColumn?: boolean;
}

export interface IOperadores {
    cdUsr: string;
    dsApelido: string;
    dsNome: string;
    dtHrLogin: string;
    dtHrLogout: string;
    login: string;
}

export const COLUMNS_OPERADORES: IListColumns[] = [
    {
        field: "cdPt",
        name: "Posto",
        width: "20%",
    },
    {
        field: "dtHrLogin",
        name: "Data/Hora Login",
        width: "25%",
    },
    {
        field: "cdUsr",
        name: "Usuário",
        width: "25%",
    },
    {
        field: "dsNome",
        name: "Nome do Usuário",
        width: "25%",
    },
    {
        field: "dtHrLogout",
        name: "Data/Hora Fim",
        width: "25%",
    },
];
