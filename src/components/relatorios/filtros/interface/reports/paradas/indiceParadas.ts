export interface IindiceParadasDTO{
    parada: string;
    tempo: string | number,
    indice: string | number,
    produto: string | number,
    ferramenta: string | number,
    maquina: string | number,
    tempoParadaCP: string | number,
    tempoParadaSP: string | number,
    tempoFerProd: string | number,
    tempoTotalParadasCP: string | number,
    tempoTotalParadasSP: string | number
}
export interface IIndiceParadaResponse{
    indiceParadasDTO: IindiceParadasDTO[];
    tempoTotal: number | string;
}