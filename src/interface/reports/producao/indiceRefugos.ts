// INTERFACE TRANSFORMADA 
export interface IIndiceRefugoResponse {
    totalProduzido?: string;
    totalRefugado?: string;
    totalBoas?: string;
    indice?: string;

    itens?: IPostoIndiceRefugo[] | IProdutosIndiceRefugo[] | IRefugoIndiceRefugoExtra[];
}
export interface IPostoIndiceRefugo {
    posto?: string;
    totalProduzido?: string;
    totalRefugado?: string;
    totalBoas?: string;
    indiceB?: string;
    indiceC?: string;
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
export interface IRefugoIndiceRefugoExtra{
    refugo: IRefugoIndiceRefugo;
}
export interface IRefugoIndiceRefugo{
    refugo: string;
    qtdRefugada: string;
    indice: string;
}