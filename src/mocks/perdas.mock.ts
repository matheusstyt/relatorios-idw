interface IListColumns {
    field: string;
    name: string;
    width: string;
    justifyLastColumn?: boolean;
}

export interface IPerdas {
    eficienciaCiclo: string;
    indiceCavidadesAtivas: string;
    indiceParada: string;
    indiceRefugo: string;
    perdasIneficienciaCiclo: string;
    perdasPorCavidadesInativas: string;
    perdasPorParada: string;
    perdasPorRefugo: string;
    totalPerdas: string;
    viewProduto: string;
}

export const COLUMNS_PERDAS: IListColumns[] = [
    {
        field: "viewProduto",
        name: "Produto",
        width: "70%",
    },
    {
        field: "eficienciaCiclo",
        name: "Efic. de ciclo",
        width: "40%",
    },
    {
        field: "perdasIneficienciaCiclo",
        name: "Perdas Inef. de ciclo",
        width: "50%",
    },
    {
        field: "indiceParada",
        name: "Índice de Paradas",
        width: "40%",
    },
    {
        field: "perdasPorParada",
        name: "Perdas por Paradas",
        width: "40%",
    },
    {
        field: "indiceRefugo",
        name: "Índice do Refugo",
        width: "40%",
    },
    {
        field: "perdasPorRefugo",
        name: "Perdas por Refugo",
        width: "40%",
    },
    {
        field: "indiceCavidadesAtivas",
        name: "Índice Cav.Ativas",
        width: "50%",
    },

    {
        field: "perdasPorCavidadesInativas",
        name: "Perdas Por Cav.Inativas",
        width: "60%",
    },

    {
        field: "totalPerdas",
        name: "Total de Perdas",
        width: "40%",
    },
];
export const COLUMNS_PERDAS_OP: IListColumns[] = [
    {
        field: "viewPt",
        name: "Posto",
        width: "40%",
    },
    {
        field: "viewRap",
        name: "Ferramenta",
        width: "40%",
    },
    {
        field: "viewProduto",
        name: "Produto",
        width: "70%",
    },
    {
        field: "eficienciaCiclo",
        name: "Efic. de ciclo",
        width: "40%",
    },
    {
        field: "perdasIneficienciaCiclo",
        name: "Perdas Inef. de ciclo",
        width: "50%",
    },
    {
        field: "indiceParada",
        name: "Índice de Paradas",
        width: "40%",
    },
    {
        field: "perdasPorParada",
        name: "Perdas por Paradas",
        width: "40%",
    },
    {
        field: "indiceRefugo",
        name: "Índice do Refugo",
        width: "40%",
    },
    {
        field: "perdasPorRefugo",
        name: "Perdas por Refugo",
        width: "40%",
    },
    {
        field: "indiceCavidadesAtivas",
        name: "Índice Cav.Ativas",
        width: "50%",
    },

    {
        field: "perdasPorCavidadesInativas",
        name: "Perdas Por Cav.Inativas",
        width: "60%",
    },

    {
        field: "totalPerdas",
        name: "Total de Perdas",
        width: "40%",
    },
];
