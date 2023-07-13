export interface IIndiceParadasResponse {
  itens: IItemIndiceParada[] | IParadaPadrao[];
  tempoParadasTotal: string;
  tempoParadasCP: string;
  tempoParadasSP: string;
}
export interface IItemIndiceParada {
  ferramenta?: string;
  produto?: string;
  paradas?: IParada[]; // por padrão
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
export interface IParadaPadrao {
  parada?: IParada;
}
export interface IParada {
  parada: string;
  tempo: string;
  indice: string;
  tempoDec: number;
}
