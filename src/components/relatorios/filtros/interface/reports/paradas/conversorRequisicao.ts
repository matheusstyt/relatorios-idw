interface IndiceParadasDTO {
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
  
  interface PostoParada {
    posto: string;
    paradas: Parada[];
    tempoParadaPosto: number;
    tempoFerProd: number;
    indiceBC: string;
    indiceCD: string;
  }
  
  interface Parada {
    parada: string;
    tempo: number;
    indice: string;
  }
  
  interface IndiceParadasTransformado {
    ferramenta: string;
    postos: PostoParada[];
  }
  
  interface RequisicaoOriginal {
    indiceParadasDTO: IndiceParadasDTO[];
  }
  
  interface RequisicaoTransformada {
    indiceParadasDTO: IndiceParadasTransformado[];
  }
  
  function converterRequisicao(requisicao: RequisicaoOriginal): RequisicaoTransformada {
    const indiceParadasDTOTransformado: IndiceParadasTransformado[] = [];
  
    requisicao.indiceParadasDTO.forEach((item) => {
      const ferramenta = item.ferramenta;
      const maquina = item.maquina;
  
      let ferramentaExistente = indiceParadasDTOTransformado.find((obj) => obj.ferramenta === ferramenta);
  
      if (!ferramentaExistente) {
        ferramentaExistente = {
          ferramenta,
          postos: [],
        };
        indiceParadasDTOTransformado.push(ferramentaExistente);
      }
  
      let postoExistente = ferramentaExistente.postos.find((obj) => obj.posto === maquina);
  
      if (!postoExistente) {
        postoExistente = {
          posto: maquina,
          paradas: [],
          tempoParadaPosto: 0,
          tempoFerProd: item.tempoFerProd,
          indiceBC: '',
          indiceCD: '',
        };
        ferramentaExistente.postos.push(postoExistente);
      }
  
      const parada: Parada = {
        parada: item.parada,
        tempo: item.tempo,
        indice: item.indice,
      };
  
      postoExistente.paradas.push(parada);
      postoExistente.tempoParadaPosto += item.tempo;
    });
  
    indiceParadasDTOTransformado.forEach((ferramenta) => {
      ferramenta.postos.forEach((posto) => {
        posto.indiceBC = ((posto.tempoParadaPosto / posto.tempoFerProd) * 100).toFixed(2) + '%';
        posto.indiceCD = ((posto.tempoFerProd / posto.tempoParadaPosto) * 100).toFixed(2) + '%';
      });
    });
  
    const requisicaoTransformada: RequisicaoTransformada = {
      indiceParadasDTO: indiceParadasDTOTransformado,
    };
  
    return requisicaoTransformada;
  }
  