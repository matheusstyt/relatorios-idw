export interface IIndiceRefugoResponse {
    listaRelatorioIndiceRefugo: IItemIndiceRefugo[];
    totalPoduzido: string;
}
export interface IItemIndiceRefugo{
    maquina: string;
    produto: string;
    refugo: string;
    qtdRefugada: number;
    totalqtdProduzidoPt: number;
    totalqtdProduzidoProd: number;
}