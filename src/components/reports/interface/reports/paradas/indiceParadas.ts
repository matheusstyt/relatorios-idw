export interface IIndiceParadasResponse {
  itens: IItemIndiceParada[];
  tempoParadasTotal: string;
  tempoParadasCP: string;
  tempoParadasSP: string;
}
export interface IItemIndiceParada {
  ferramenta?: string;
  produto?: string;
  paradas?: IParada[];
  indice?: string;  // faltando
  tempoParadasProduto?: string;
  tempoParadasFerramenta?: string;
  postos?: IPostoParada[];

}
export interface IPostoParada {
  posto: string;
  paradas: IParada[];
  tempoParadasPosto: string;
  indice: string; // faltando
}
export interface IParada {
  parada: string;
  tempo: number;
  indice: string;
  tempoDec: number;
}
