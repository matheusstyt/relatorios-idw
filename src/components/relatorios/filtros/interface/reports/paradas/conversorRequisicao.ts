import { convertSecondsToTime } from '../../../../export/datetime';
import { IIndiceParadasTransformado, IParada, IRequisicaoOriginal, IRequisicaoTransformada } from './indiceParadas';
  
 const converterIndiceParadasFerramenta = (req: IRequisicaoOriginal, isFerramenta: boolean, isProduto: boolean, isPadrao: boolean) => {
    const indiceParadasDTOTransformado: IIndiceParadasTransformado[] = [];
    const indiceParadasAbreviada: IParada[] = []
    const tempoTotal = req.tempoTotal;
    let tempoParadaSP = 0;
    let tempoParadaCP = 0;

    let requisicaoTransformada: IRequisicaoTransformada;
    
    
    req?.indiceParadasDTO?.forEach((item) => {
      tempoParadaCP += item.tempoParadaCP;
      tempoParadaSP += item.tempoParadaSP;

      if(!isPadrao){
        const produto = item.produto;
        const ferramenta = item.ferramenta;
        const maquina = item.maquina;
        
        let ferramentaExistente, produtoExistente, postoExistente;
        if(isFerramenta){
          ferramentaExistente = indiceParadasDTOTransformado.find((obj) => obj.ferramenta === ferramenta);
          if (!ferramentaExistente) {
            ferramentaExistente  = {
              ferramenta,
              tempoFerProd: item.tempoFerProd,
              postos: [],
            };
            indiceParadasDTOTransformado.push(ferramentaExistente);
          }
          postoExistente = ferramentaExistente?.postos?.find((obj) => obj.posto === maquina);
        }else if(isProduto){
          produtoExistente = indiceParadasDTOTransformado.find((obj) => obj.produto === produto);
          if (!produtoExistente) {
            produtoExistente = {
              produto,
              tempoFerProd: item.tempoFerProd,
              postos: [],
            };
            indiceParadasDTOTransformado.push(produtoExistente);
          }
          postoExistente = produtoExistente?.postos?.find((obj) => obj.posto === maquina);
        }

        if (!postoExistente) {

          postoExistente = {
            posto: maquina,
            paradas: [],
            tempoParadaPosto: 0,
            indiceBC: '',
          };

          if(isFerramenta) {
            ferramentaExistente?.postos?.push(postoExistente);
          } else if (isProduto) {
            produtoExistente?.postos?.push(postoExistente);
          }
        }
        const parada: IParada = {
          parada: item.parada,
          tempo: item.tempo,
          indice: item.indice,
        };
        postoExistente.paradas.push(parada);
        postoExistente.tempoParadaPosto += item.tempo;
        indiceParadasDTOTransformado.forEach((ferramenta) => {
          let indiceCD: number = 0;
          ferramenta?.postos?.forEach((posto) => {
            
            posto.indiceBC = ((posto.tempoParadaPosto / item.tempoFerProd) * 100).toFixed(2) + '%';
            let temp = 0;
            posto.paradas.forEach((parada: IParada) => {temp += parada.tempo});
            posto.tempoParadaPosto = temp;
          });
          ferramenta.indiceCD = `${indiceCD.toFixed(2)}%`;
        });
      }else{
        const parada: IParada = {
          parada: item.parada,
          tempo: item.tempo,
          indice: item.indice,
        };
        indiceParadasAbreviada.push(parada);
      }
    });
    requisicaoTransformada = {
      indiceParadasDTO: isPadrao? indiceParadasAbreviada : indiceParadasDTOTransformado,
      tempoTotalParadaCP: convertSecondsToTime(tempoParadaCP),
      tempoTotalParadaSP: convertSecondsToTime(tempoParadaSP),
      tempoTotal: convertSecondsToTime(tempoTotal)
    };
    console.log(requisicaoTransformada)
    return requisicaoTransformada;
  }
export default converterIndiceParadasFerramenta;