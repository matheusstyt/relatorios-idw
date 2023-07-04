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
    indiceC?: number;
}
// INTERFACE TRANSFORMADA 
export interface INewIndiceRefugoResponse {
    totalProduzido?: string;
    totalRefugado?: string;
    totalBoas?: string;
    indice?: string;

    itens?: IPostoIndiceRefugo[] | IProdutosIndiceRefugo[] | IRefugoIndiceRefugo[];
}
export interface IPostoIndiceRefugo {
    posto?: string;
    totalProduzido?: string;
    totalRefugado?: string;
    totalBoas?: string;
    indiceC?: string;
    indiceB?: string;
    produtos?: IProdutosIndiceRefugo[];
}
export interface IProdutosIndiceRefugo{
    produto?: string;
    totalProduzido: string;
    totalRefugado: string;
    totalBoas: string;
    indiceA: string;
    indiceB: string;
    refugos: IRefugoIndiceRefugo[];
}
export interface IRefugoIndiceRefugo{
    refugo: string;
    qtdRefugada: string;
    indice: string;
}