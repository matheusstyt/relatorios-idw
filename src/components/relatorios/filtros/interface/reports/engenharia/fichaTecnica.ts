export interface IProduto {
    cdProduto?: string | number;
    dsProduto?: string | number;
    molde?: string | number;
    cavAtivas?: string | number;
    maquina?: string | number;
    cioPadrao?: string | number;
    cdCliente?: string | number;
    nmCliente?: string | number;
    psBruto?: string | number;
    psLiquido?: string | number;

}

export interface IFichaTecnicaResponse {
    itens: IProduto[]
}