export interface ItemProducaoEficienciaHoraAHora {
    dthrIHora: string;
    dthrFHora: string;
    intervaloHoraInicial: string;
    intervaloHoraFinal: string;
    producaoBruta: string | number;
    producaoPrevista: string | number;
    producaoRefugada: string | number;
    producaoLiquida: string | number;
    cicloMedio: string | number;
    cicloPadrao: string | number;
    tempoAtivo: string | number;
    tempoTotalParadasCP: string | number;
    metaHora: string | number;
    indiceMAtivas: string | number;
    indiceEficienciaRealizacao: string | number;
    indiceRefugo: string | number;
    indiceParada: string | number;
    paradaRefugo: string;
    tempoParadaOuQtRefugo: string | number;
    isParada: boolean;
    tempoAtivoFormatado: string;
    tempoTotalParadasCPFormatado: string;
    tempoParadaOutQtRefugoFormatado: string;
    dthrIRef: string;
  }
  
  export interface IListaDTO {
    codigoProduto: string;
    descricaoProduto: string;
    gPesoLiquidoProduto: string | number;
    itensProducaoEficienciaHoraAHora: ItemProducaoEficienciaHoraAHora[];
    totalProducaoPrevista: string | number;
    totalProducaoLiquida: string | number;
    totalIndiceMAtivas: string | number;
    totalTempoAtivo: string | number;
    totalIndiceParadas: string | number;
    totalProducaoBruta: string | number;
    totalProducaoRefugada: string | number;
    totalTempoParadaCP: string | number;
    totalIndiceRefugo: string | number;
    totalIndiceEficienciaRealizacao: string | number;
    totalTempoAtivoFormatado: string;
    totalTempoParadaCPFormatado: string;
    listaOperadoresDTO: IOperador[];
    totalCavidadesAtivas: string | number;
    totalCavidadesTotais: string | number;
  }
  
  export interface IAnaliseProducaoResponse {
    listaDTOs: IListaDTO[];
  }
  export interface IOperador{
    nome?: string;
    loginFormatado?: string;
    logoutFormatado?: string
    login?: string
  }