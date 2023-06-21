export interface IListaAcompanhamentoProducaoDTO {
    eficRelaizacao: number | string;
    eficiCiclo: number | string;
    indicePa: number | string;
    indiceRef: number | string;
    indicecavAtiva: number | string;
    intervalo: string;
    maquina: string;
    metaPeriodo: number | string;
    qtdPrevista: number | string;
    qtdProduzida: number | string;
    projecaofPeriodo: number | string;
    eficRelaizacaoDec: number | string;
    eficiCicloDec: number | string;
    indicePaDec: number | string;
    indiceRefDec: number | string;
    indicecavAtivaDec: number | string;
    metaPeriodoDec: number | string;
    qtdPrevistaDec: number | string;
    qtdProduzidaDec: number | string;
    projecaofPeriodoDec: number | string;
  }
  
export interface IAcompanhamentoPrroducaoResponse {
listaAcompanhamentoProducaoDTO: IListaAcompanhamentoProducaoDTO[];
listaCompletaParadas: any[];
}
  