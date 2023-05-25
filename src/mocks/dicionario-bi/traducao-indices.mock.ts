export const TRADUCAO_INDICES_DICTIONARY: any[] = [
    { codigo: "ER", descricao: "Eficiência de Realização" },
    { codigo: "EC", descricao: "Eficiência de Ciclo" },
    { codigo: "IR", descricao: "Índices de Refugo" },
    { codigo: "IP", descricao: "Índice de Paradas" },
    { codigo: "IPD", descricao: "Índice de Perdas" },
    { codigo: "CI", descricao: "Índice Cavidades Ativas" },
    { codigo: "OEE", descricao: "Produtividade (OEE)" },
]


export class TraducaoIndices {

    static obterDescricao(codigo: string) {

        const item = TRADUCAO_INDICES_DICTIONARY.find(i => i?.codigo == codigo)
        if (item != null)
            return item.descricao;
        // return `Código não catalogado (${codigo})`;
    }
}