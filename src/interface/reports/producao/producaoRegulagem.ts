export interface IParadaProducaoRegulagem {
    parada: string;
    tempoParada: number;
    tempoParadaHora: string;
}
  
export interface IPostoPeriodo {
    paradas: IParadaProducaoRegulagem[];
    cdPosto: string;
    cdProduto: string;
    posto: string;
    ferramenta: string;
    produto: string;
    totalTempoParadaComPesoNaEficiencia: number;
    totalTempoParadaSemPesoNaEficiencia: number;
    totalTempoParadaRegulagemComPesoNaEficiencia: number;
    totalTempoParadaRegulagemSemPesoNaEficiencia: number;
    totalTempoParada: number;
    totalProducaoEmRegulagem: number;
    totalTempoParadaComPesoNaEficienciaHora: string;
    totalTempoParadaSemPesoNaEficienciaHora: string;
    totalTempoParadaRegulagemComPesoNaEficienciaHora: string;
    totalTempoParadaRegulagemSemPesoNaEficienciaHora: string;
    totalTempoParadaHora: string;
    totalProducaoEmRegulagemHora: string;
}
  
export interface IProducaoRegulagemResponse {
    postosPeriodo: IPostoPeriodo[];
    periodoTempoParadaComPesoNaEficiencia: number;
    periodoTempoParadaSemPesoNaEficiencia: number;
    periodoTempoParadaRegulagemComPesoNaEficiencia: number;
    periodoTempoParadaRegulagemSemPesoNaEficiencia: number;
    periodoTempoParada: number;
    periodoProducaoEmRegulagem: number;
    periodoTempoParadaComPesoNaEficienciaHora: string;
    periodoTempoParadaSemPesoNaEficienciaHora: string;
    periodoTempoParadaRegulagemComPesoNaEficienciaHora: string;
    periodoTempoParadaRegulagemSemPesoNaEficienciaHora: string;
    periodoTempoParadaHora: string;
    periodoProducaoEmRegulagemHora: string;
}

export interface IParadaOcorrenciasParada {
    maquina: string;
    tempoParMaq: string;
    raps: string;
    parada: string;
    tempoPar: string;
    segTempoPar: number;
}

export interface IOcorrenciasParadaResponse {
    paradas: IParadaOcorrenciasParada[];
}
