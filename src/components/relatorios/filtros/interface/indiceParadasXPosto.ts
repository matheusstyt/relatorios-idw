export interface IIndiceParadaPostoResponse {
    indiceED?: string;
    tempoAtivo?: number | string;
    tempoParadas?: number | string;
    horasProdutivas?: number | string;
    tempoParadasCP?: number | string;
    tempoParadasSP?: number | string;
    segMTTR?: number | string;
    segMTBF?: number | string;
    tempoMTTR_MTBF?: number | string;
    disponibilidade?: number | string;
    qtdMTTR_MTBF?: number | string;
    qtdOcorrenciasPPE?: number | string;
    qtdParada?: number | string;
    subRelatorioIndiceParadas?: ISubRelatorioIndiceParada[];
    itensRelatorio?: IItemRelatorio[];
  }
  export interface ISubRelatorioIndiceParada {
    maquina?: string;
    tempoAtivo?: number | string;
    tempoParadas?: number | string;
    horasProdutivas?: number | string;
    tempoParadasCP?: number | string;
    tempoParadasSP?: number | string;
    segMTTR?: number | string;
    segMTBF?: number | string;
    tempoMTTR_MTBF?: number | string;
    disponibilidade?: number | string;
    qtdMTTR_MTBF?: number | string;
    qtdOcorrenciasPPE?: number | string;
    qtdParada?: number | string;
    listaParadasRelatorio?: IParada[];
  }
  export interface IItemRelatorio {
    maquina?: string;
    tempoAtivo?: string;
    parada?: string;
    qtdParada?: string;
    tempoParada?: string;
    indiceBA?: string;
    indiceCA?: string;
    indiceCD?: string;
    totalTempoParada?: string;
    horasProdutivas?: string;
    qtdParadasCP?: string;
    qtdMTTR_MTBF?: string;
    tempoMTTR_MTBF?: string;
    minMTTR?: string;
    minMTBF?: string;
    disponibilidade?: string;
  }
  export interface IParada {
    indiceBA?: string | number,
    indiceCA?: string | number,
    parada?: string,
    qtdMTTR_MTBF?: string | number,
    qtdParadaComPeso?: string | number,
    quantidade?: string | number,
    tempoParada?: string | number,
  }


//   export class IIndiceParadaPostoResponse {
//     indiceED: string | undefined;
//     tempoAtivo: number | undefined;
//     tempoParadas!: number;
//     horasProdutivas!: number;
//     tempoParadasCP!: number;
//     tempoParadasSP!: number;
//     segMTTR!: number;
//     segMTBF!: number;
//     tempoMTTR_MTBF!: number;
//     disponibilidade!: number;
//     qtdMTTR_MTBF!: number;
//     qtdOcorrenciasPPE!: number;
//     qtdParada!: number;
//     subRelatorioIndiceParadas!: ISubRelatorioIndiceParada[];
//     itensRelatorio?: IItemRelatorio[];
//   }
//   export class ISubRelatorioIndiceParada {
//     maquina!: string;
//     tempoAtivo!: number;
//     tempoParadas!: number;
//     horasProdutivas!: number;
//     tempoParadasCP!: number;
//     tempoParadasSP!: number;
//     segMTTR!: number;
//     segMTBF!: number;
//     tempoMTTR_MTBF!: number;
//     disponibilidade!: number;
//     qtdMTTR_MTBF!: number;
//     qtdOcorrenciasPPE!: number;
//     qtdParada!: number;
//     listaParadasRelatorio!: IParada[];
//   }
//   export class IItemRelatorio {
//     maquina!: string;
//     tempoAtivo: string | undefined;
//     parada!: string;
//     qtdParada: string | undefined;
//     tempoParada!: string;
//     indiceBA: string | undefined;
//     indiceCA!: string;
//     indiceCD!: string;
//     totalTempoParada!: string;
//     horasProdutivas!: string;
//     qtdParadasCP!: string;
//     qtdMTTR_MTBF!: string;
//     tempoMTTR_MTBF!: string;
//     minMTTR!: string;
//     minMTBF!: string;
//     disponibilidade!: string;
//   }
//   export class IParada {
//     indiceBA!: string | number;
//     indiceCA!: string | number;
//     parada!: string;
//     qtdMTTR_MTBF!: string | number;
//     qtdParadaComPeso!: string | number;
//     quantidade!: string | number;
//     tempoParada!: string | number;
//   }

