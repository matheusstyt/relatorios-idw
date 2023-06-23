export interface IAcompanhamentoPrroducaoResponse {
intervalos: IIntervalo[];
totalGeral: ITotalGeralAcompanhamentoProducao;
paradasAbertas: IParadaAberta[];
}
  
export interface IIntervalo {
    intervalo: string;
    postos: IPostoIntervalo;
    totais: ITotaisIntervalo;
  }
export interface IPostoIntervalo{
  maquina: string;
  projecaofPeriodo: number;
  qtdProduzida: number;
  qtdPrevista: number;
  metaPeriodo: number;
  eficRealizacao:number;
  indRefugo: number;
  indParada: number;
  eficCiclo: number;
}
export interface ITotaisIntervalo{
  projecaofPeriodo: number;
  qtdProduzida: number;
  qtdPrevista: number;
  metaPeriodo: number;
  eficRealizacao: number;
  indRefugo: number;
  indParada: number;
  eficCiclo: number;
}
export interface ITotalGeralAcompanhamentoProducao{
  projecaofPeriodo: number;
  qtdProduzida: number;
  qtdPrevista: number;
  metaPeriodo: number;
  eficRealizacao: number;
  indRefugo: number;
  indParada: number;
  eficCiclo: number;
}
export interface IParadaAberta{
  maquina: string;
  dsMaquinaCurta: string;
  parada: string;
  areaResp: string;
  dthrInicio: string;
  dthrFim: string;
  duracao: string;
}