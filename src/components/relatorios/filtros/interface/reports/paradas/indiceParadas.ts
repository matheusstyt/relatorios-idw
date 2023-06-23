export interface IRequisicaoOriginal {
    indiceParadasDTO: IIndiceParadasDTO[];
    tempoTotal: number;
  }
  export interface IIndiceParadasDTO {
      parada: string;
      tempo: number;
      indice: string;
      produto: string;
      ferramenta: string;
      maquina: string;
      tempoParadaCP: number;
      tempoParadaSP: number;
      tempoFerProd: number;
      tempoTotalParadasCP: number;
      tempoTotalParadasSP: number;
    }
    // INTERFFACE IDEAL
    export interface IRequisicaoTransformada {
      indiceParadasDTO: IIndiceParadasTransformado[] | IParada[];
      tempoTotal: string;
      tempoTotalParadaCP: string;
      tempoTotalParadaSP: string;
    }
    export interface IIndiceParadasTransformado {
      ferramenta?: string;
      produto?: string;
      indiceCD?: string;
      tempoFerProd?: number;
      postos?: IPostoParada[];
  
    }
    export interface IPostoParada {
      posto: string;
      paradas: IParada[];
      tempoParadaPosto: number;
      indiceBC: string;
    }
    export interface IParada {
      parada: string;
      tempo: number;
      indice: string;
    }
