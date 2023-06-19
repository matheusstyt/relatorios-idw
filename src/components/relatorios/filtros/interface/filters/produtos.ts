export interface IProduto {
    cdProduto?: string;
    dsProduto?: string;
    molde?: string;
    cavAtivas?: string | number;
    maquina?: string | number;
    cioPadrao?: number | string;
    cdCliente?: string | number;
    nmCliente?: string | number;
    psBruto?: number | string;
    psLiquido?: number | string;

}
export interface IProdutosResponse {
    itens?: IProduto[] 
}