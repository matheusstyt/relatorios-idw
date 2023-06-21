import { IFichaTecnicaResponse, IProduto as IProdFT } from '../filtros/interface/reports/engenharia/fichaTecnica';
import { IindiceParadasDTO } from '../filtros/interface/reports/paradas/indiceParadas';
import { ISubRelatorioIndiceParada } from "../filtros/interface/reports/paradas/indiceParadasXPosto";
import { IItem } from "../filtros/interface/reports/planejamento/planejadoxrealizado";
import { IListaAcompanhamentoProducaoDTO } from '../filtros/interface/reports/producao/acompanhamentoProducao';
import { IAnaliseProducaoResponse, IListaDTO, IOperador, ItemProducaoEficienciaHoraAHora } from '../filtros/interface/reports/producao/analiseProducao';
import { IFerramenta, IPosto, IProduto } from "../filtros/interface/reports/producao/consolidados";
import { convertSecondsToTime } from "./datetime";
import "./export.scss";

export function Header(props : any) {
    return (
        <div className="export-header">
            <h2>{props.title}</h2>
            { props.components}
        </div>
    )
}
export function TotalGeralIndiceParadaXPosto (props : any) {
    return (
        <div className="container-totais total-geral" id="totais-totais">
            <p>TEMPO ATIVO TOTAL (D): { convertSecondsToTime(props.dados?.tempoAtivo)}</p>
            <p>TEMPO PARADAS SEM PESO NA EFICIENCIA: { convertSecondsToTime(props.dados?.tempoParadasSP) }</p>
            <p>TEMPO PARADAS COM PESO NA EFICIENCIA (E): { convertSecondsToTime(props.dados?.tempoParadasCP) }</p>
            <p>HORAS PRODUTIVAS: { convertSecondsToTime(props.dados?.horasProdutivas)}</p>
            <p>ÍNDICE (E)/(D): {props.dados?.indiceED}</p>
            <p>QTDE OCORR. PPE: {props.dados?.qtdOcorrenciasPPE}</p>
            <p>QTDE OCORR. MTBF/MTTR: {props.dados?.qtdMTTR_MTBF}</p>
            <p>TEMPO PARADAS MTBF/MTTR: { convertSecondsToTime(props.dados?.tempoMTTR_MTBF) }</p>
            <p>% DISP.: {props.dados?.disponibilidade?.toFixed(2)}</p>
            <p>MTTR (min): {props.dados?.segMTTR}</p>
            <p>MTBF (min): {props.dados?.segMTBF?.toFixed(2)}</p>
        </div>
    )
}
export function TableDinamic ( props : any ){
    return (
        <table id="table-main">
            <thead>
                <tr>
                    {
                        props.headers.map( (item : string) => {
                            return <th key={item}>{item}</th>
                        })
                    }
                </tr>
            </thead>
            {props.body}
        </table>
    )
}
// CONSOLIDADOS 
// POR POSTO
export function ConsolidadosPostoBody ( props : any ){
    return  (
        <tbody>
            {
                props?.postos?.map( (posto : IPosto ,index : number) => {
                    return <tr key={index}>
                        {/* PRIMEIRA CAMADA */}
                        <td>{posto?.posto}</td>
                        <td>{posto?.horasTrabalhadas}</td>
                        <td>{posto?.horasParadas}</td>
                        <td>{posto?.tempoAtivo}</td>
                        <td>{posto?.indiceParadas}</td>

                        {/* SEGUNDA CAMADA */}
                        <td >{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                                return <span className="span nv2" key={index}>{ferramenta.ferramenta}</span>}
                        )}</td>
                        <td >{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                                return <span className="span nv2" key={index}>{ferramenta.cicloPadrao}</span>}
                        )}</td>
                        <td >{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                                return <span className="span nv2" key={index}>{ferramenta.cicloLido}</span>}
                        )}</td>
                        <td >{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                                return <span className="span nv2" key={index}>{ferramenta.eficienciaCiclo}</span>}
                        )}</td>
                        {/* TERCEIRA CAMADA */}
                        <td >{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.produtos?.map((produto : IProduto, index : number) => {
                                return <span className="span nv3" key={index}>{produto.produto}</span>
                                })
                            }
                        )}</td>
                        {/* SEGUNDA CAMADA */}
                        <td >{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                                return <span className="span nv2" key={index}>{ferramenta.cavidadesTotais === "0" ? "" : `${ferramenta.cavidadesAtivas}/${ferramenta.cavidadesTotais}`}</span>}
                        )}</td>
                        <td >{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                                return <span className="span nv2" key={index}>{ferramenta.indiceCavidades}</span>}
                        )}</td>
                        {/* TERCEIRA CAMADA */}
                        <td>{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.produtos?.map((produto : IProduto, index : number) => {
                                return <span className="span nv3" key={index}>{produto.pecasPrevistas}</span>
                                })
                            }
                        )}</td>
                        <td>{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.produtos?.map((produto : IProduto, index : number) => {
                                return <span className="span nv3" key={index}>{produto.pecasProduzidas}</span>
                                })
                            }
                        )}</td>
                        <td>{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.produtos?.map((produto : IProduto, index : number) => {
                                return <span className="span nv3" key={index}>{produto.pecasRefugadas}</span>
                                })
                            }
                        )}</td>
                        <td>{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.produtos?.map((produto : IProduto, index : number) => {
                                return <span className="span nv3" key={index}>{produto.pecasBoas}</span>
                                })
                            }
                        )}</td>
                        <td>{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.produtos?.map((produto : IProduto, index : number) => {
                                return <span className="span nv3" key={index}>{produto.indiceRefugo}</span>
                                })
                            }
                        )}</td>
                        <td>{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.produtos?.map((produto : IProduto, index : number) => {
                                return <span className="span nv3" key={index}>{produto.eficienciaRealizacao}</span>
                                })
                            }
                        )}</td>
                        {/* PRIMEIRA CAMADA */}
                        <td>{posto?.oee}</td>
                        <td>{posto?.oeeCap}</td>
                    </tr>
                })
            }   
        </tbody>
    )
}
// POR FERRAMENTA
export function ConsolidadosFerramentaBody ( props : any ){
    console.log(props.ferramentas)
    return  (
        <tbody>
            {
                props?.ferramentas?.map( (ferramenta : IFerramenta ,index : number) => {
                    return <tr key={index}>
                        {/* PRIMEIRA CAMADA */}
                        <td>{ferramenta?.ferramenta}</td>

                        {/* SEGUNDA CAMADA */}
                        <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                            return <span className="span nv2" key={index}>{posto.posto}</span>}
                        )}</td>
                        {/* PRIMEIRA CAMADA */}
                        <td>{ferramenta?.cicloPadrao}</td>
                        <td>{ferramenta?.cicloLido}</td>
                        <td>{ferramenta?.eficienciaCiclo}</td>
                        {/* SEGUNDA CAMADA */}
                        <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <span className="span nv2" key={index}>{posto.horasTrabalhadas}</span>}
                        )}</td>
                        <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <span className="span nv2" key={index}>{posto.horasParadas}</span>}
                        )}</td>
                        <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <span className="span nv2" key={index}>{posto.tempoAtivo}</span>}
                        )}</td>
                        <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <span className="span nv2" key={index}>{posto.indiceParadas}</span>}
                        )}</td>
                        {/* TERCEIRA CAMADA */}
                        <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                            return posto?.produtos?.map((produto : IProduto, index : number) => {
                                return <span className="span nv3" key={index}>{produto.produto}</span>
                                })
                            }
                        )}</td>
                       {/* PRIMEIRA CAMADA */}
                       <td>{ferramenta.cavidadesTotais === "0" ? "" : `${ferramenta.cavidadesAtivas}/${ferramenta.cavidadesTotais}`}</td>
                       <td>{ferramenta?.indiceCavidades}</td>
                       {/* TERCEIRA CAMADA */}
                       <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                            return posto?.produtos?.map((produto : IProduto, index : number) => {
                                return <span className="span nv3" key={index}>{produto.pecasPrevistas}</span>
                                })
                            }
                        )}</td>
                       <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                            return posto?.produtos?.map((produto : IProduto, index : number) => {
                                return <span className="span nv3" key={index}>{produto.pecasProduzidas}</span>
                                })
                            }
                        )}</td>
                       <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                            return posto?.produtos?.map((produto : IProduto, index : number) => {
                                return <span className="span nv3" key={index}>{produto.pecasRefugadas}</span>
                                })
                            }
                        )}</td>
                       <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                            return posto?.produtos?.map((produto : IProduto, index : number) => {
                                return <span className="span nv3" key={index}>{produto.pecasBoas}</span>
                                })
                            }
                        )}</td>
                        <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                            return posto?.produtos?.map((produto : IProduto, index : number) => {
                                return <span className="span nv3" key={index}>{produto.indiceRefugo}</span>
                                })
                            }
                        )}</td>
                        <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                            return posto?.produtos?.map((produto : IProduto, index : number) => {
                                return <span className="span nv3" key={index}>{produto.eficienciaRealizacao}</span>
                                })
                            }
                        )}</td>
                        {/* SEGUNDA CAMADA */}
                        <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <span className="span nv2" key={index}>{posto.oee}</span>}
                        )}</td>
                        <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <span className="span nv2" key={index}>{posto.oeeCap}</span>}
                        )}</td>

                    </tr>
                })
            }   
        </tbody>
    )
}
// POR PRODUTO
export function ConsolidadosProdutoBody ( props : any ){
    console.log(props.produtos)
    return  (
        <tbody>
            {
                props?.produtos?.map( (produto : IProduto ,index : number) => {
                    return <tr key={index}>
                        {/* PRIMEIRA CAMADA */}
                        <td>{produto?.produto}</td>

                        {/* SEGUNDA CAMADA */}
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return <span className="span nv2" key={index}>{ferramenta.ferramenta}</span>}
                        )}</td>
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return <span className="span nv2" key={index}>{ferramenta.cavidadesTotais === "0" ? "" : `${ferramenta.cavidadesAtivas}/${ferramenta.cavidadesTotais}`}</span>}
                        )}</td>
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return <span className="span nv2" key={index}>{ferramenta.indiceCavidades}</span>}
                        )}</td>
                        {/* TERCEIRA CAMADA */}
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <span className="span nv3" key={index}>{posto.posto}</span>
                                })
                            }
                        )}</td>
                        {/* SEGUNDA CAMADA */}
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return <span className="span nv2" key={index}>{ferramenta.cicloPadrao}</span>}
                        )}</td>
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return <span className="span nv2" key={index}>{ferramenta.cicloLido}</span>}
                        )}</td>
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return <span className="span nv2" key={index}>{ferramenta.eficienciaCiclo}</span>}
                        )}</td>
                        {/* TERCEIRA CAMADA */}
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <span className="span nv3" key={index}>{posto.horasTrabalhadas}</span>
                                })
                            }
                        )}</td>
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <span className="span nv3" key={index}>{posto.horasParadas}</span>
                                })
                            }
                        )}</td>
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <span className="span nv3" key={index}>{posto.tempoAtivo}</span>
                                })
                            }
                        )}</td>
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <span className="span nv3" key={index}>{posto.indiceParadas}</span>
                                })
                            }
                        )}</td>
                        {/* PRIMEIRA CAMADA */}
                        <td>{produto?.pecasPrevistas}</td>
                        <td>{produto?.pecasProduzidas}</td>
                        <td>{produto?.pecasRefugadas}</td>
                        <td>{produto?.pecasBoas}</td>
                        <td>{produto?.indiceRefugo}</td>
                        <td>{produto?.eficienciaRealizacao}</td>
                        {/* TERCEIRA CAMADA */}
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <span className="span nv3" key={index}>{posto.oee}</span>
                                })
                            }
                        )}</td>
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <span className="span nv3" key={index}>{posto.oeeCap}</span>
                                })
                            }
                        )}</td>
                    </tr>
                })
            }   
        </tbody>
    )
}
// TOTAL GERAL 
export function TotalGeralConsolidados ( props : any ) {
    return (
        <div className="container-totais total-geral" id="totais-totais">
            <p>HRS. TRABALHADAS: { props.totais?.horasTrabalhadasTotal }</p>
            <p>HRS. PARADAS: { props.totais?.horasParadasTotal }</p>
            <p>TEMPO ATIVO: { props.totais?.tempoAtivoTotal }</p>
            <p>ÍNDICE PARADAS: {props.totais?.indiceParadasTotal}</p>
            <p>EFIC. REALIZAÇÃO: {props.totais?.eficienciaRealizacaoTotal}</p>
            <p>PROD. PREVISTA: {props.totais?.pecasPrevistasTotal}</p>
            <p>PROD. BRUTA: { props.totais?.pecasProduzidasTotal }</p>
            <p>PROD. REFUGADA: {props.totais?.pecasRefugadasTotal}</p>
            <p>PROD. LÍQUIDA: {props.totais?.pecasBoasTotal}</p>
            <p>ÍNDICE REFUGOS: {props.totais?.indiceRefugosTotal}</p>
            <p>CICLO PADRÃO: {props.totais?.cicloPadraoTotal}</p>
            <p>CICLO LIDO: {props.totais?.cicloLidoTotal}</p>
            <p>EFIC.CICLO: {props.totais?.eficienciaCicloTotal}</p>
            <p>EFIC. CICLO POND.: {props.totais?.eficienciaCicloPondTotal}</p>
            <p>ÍNDICE CAV. ATIVAS: {props.totais?.indiceCavidadesAtivasTotal}</p>
            <p>OEE: {props.totais?.oeeTotal}</p>
            <p>OEE CAP: {props.totais?.oeeCapTotal}</p>
        </div>
    )
}
// PLANEJADO X REALIZADO
export function PlanejadoXRealizadoBody ( props : any ) {
    return (
        <tbody>
            {
                props?.items?.map( (item : IItem ,index : number) => {
                    return <tr key={index}>
                        {/* PRIMEIRA CAMADA */}
                        <td>{item?.op}</td>
                        <td>{item?.pedido}</td>
                        <td>{item?.cliente}</td>
                        <td>{item?.situacao}</td>
                        <td>{item?.dataPrevFim}</td>
                        <td>{item?.molde}</td>
                        <td>{item?.produto}</td>
                        <td>{item?.plano}</td>
                        <td>{item?.producao}</td>
                        <td>{item?.produzir}</td>
                        <td>{item?.maquina}</td>
                        <td>{item?.prodMaq}</td>
                    </tr>
                })
            }   
        </tbody>
    )
}
// ÍNDICE PARADA POR POSTO
export function IndiceParadaXPostoBody( props : any ){
    console.log(props.parada);
    return ( 
        props.parada?.subRelatorioIndiceParadas?.map((row : ISubRelatorioIndiceParada, index : number) => {
            return (
                
                <tbody className={`t-indiceparadaxposto`}>
                    <tr>
                        <td>{row?.maquina}</td>
                        <td>{ convertSecondsToTime( row?.tempoAtivo ) }</td>
                        <td>{row?.listaParadasRelatorio?.map((i, index) => <p key={index}>{i.parada}</p>)}</td>
                        <td>{row?.listaParadasRelatorio?.map((i, index) => <p key={index}>{i.quantidade}</p>)}</td>
                        <td>{row?.listaParadasRelatorio?.map((i, index) => <p key={index}>{convertSecondsToTime(i.tempoParada)}</p>)}</td>
                        <td>{row?.listaParadasRelatorio?.map((i, index) => <p key={index}>{i.indiceBA}</p>)}</td>
                    
                    </tr>
                    <tr>
                        <td colSpan={6}>
                            <div className="container-totais sub-totais">
                                <p>TEMPO DE PARADAS DO POSTO (C): { props.parada?.itensRelatorio[index]?.tempoParada }</p>
                                <p>HORAS PRODUTIVAS: {props.parada?.itensRelatorio[index]?.horasProdutivas }</p>
                                <p>% DISP.: {props.parada?.itensRelatorio[index]?.disponibilidade}</p>
                                <p>ÍNDICE (C)/(A): {props.parada?.itensRelatorio[index]?.indiceCA}</p>
                                <p>ÍNDICE (C)/(D): {props.parada?.itensRelatorio[index]?.indiceCD}</p>
                                <p>QTDE OCORR. PPE: {row?.qtdOcorrenciasPPE}</p>
                                <p>QTDE OCORR. MTBF/MTTR: {row?.qtdMTTR_MTBF}</p>
                                <p>TEMPO PARADAS MTBF/MTTR: {row?.tempoMTTR_MTBF}</p>
                                <p>MTTR (min): {props.parada?.itensRelatorio[index]?.minMTTR}</p>
                                <p>MTBF (min): {props.parada?.itensRelatorio[index]?.minMTBF}</p>                               
                            </div>
                        </td>
                    </tr>
                </tbody>
                        
            )
        })     
    )
}
// FICHA TÉCNICA 
export function FichaTecnicaBody( props : any){
    console.log(props)
    return (
        <tbody>
            {
                props?.itens?.map( (item : IProdFT ,index : number) => {
                    return <tr key={index}>
                        {/* PRIMEIRA CAMADA */}
                        <td>{item?.cdProduto}</td>
                        <td>{item?.dsProduto}</td>
                        <td>{item?.molde}</td>
                        <td>{item?.cavAtivas}</td>
                        <td>{item?.maquina}</td>
                        <td>{item?.cioPadrao}</td>
                        <td>{item?.cdCliente}</td>
                        <td>{item?.nmCliente}</td>
                        <td>{item?.psBruto}</td>
                        <td>{item?.psLiquido}</td>
                    </tr>
                })
            }   
        </tbody>
    )
}
// ANÁLISE DA PRODUÇÃO E EFICIÊNCIA HORA/HORA 
export function AnaliseProducaoBody( props : any){
    return (
            props?.listaDTO?.map( (item : IListaDTO ,index : number) => {
                    return <tbody className='t-analiseproducao' key={index} >
                        <tr className='tr-title'> <th  colSpan={15}>PRODUTO: {item?.descricaoProduto}</th> </tr>      
                        {item?.itensProducaoEficienciaHoraAHora?.map((producao : ItemProducaoEficienciaHoraAHora, index1: number) => {
                            return <tr key={index1} className='tr-data'>
                                <td>{producao?.intervaloHoraInicial} - {producao?.intervaloHoraInicial}</td>
                                <td>{producao?.producaoPrevista}</td>
                                <td>{producao?.producaoBruta}</td>
                                <td>{producao?.producaoLiquida}</td>
                                <td>{producao?.cicloPadrao}</td>
                                <td>{producao?.cicloMedio}</td>
                                <td>{producao?.metaHora}</td>
                                <td>{producao?.tempoAtivo}</td>
                                <td>{producao?.tempoTotalParadasCPFormatado}</td>
                                <td>{item?.totalCavidadesAtivas}</td>
                                <td>{producao?.indiceEficienciaRealizacao}</td>
                                <td>{producao?.indiceRefugo}</td>
                                <td>{producao?.indiceParada}</td>
                                <td>{producao?.paradaRefugo}</td>
                                <td>{producao?.tempoParadaOutQtRefugoFormatado}</td>
                            </tr>
                        })}
                        <tr className='tr-total'>
                            <td  colSpan={15}>
                                <div className="container-totais total-geral" id="totais-totais">
                                    <p>TOTAL PREVISTO: { item?.totalProducaoPrevista }</p>
                                    <p>TOTAL PRODUZIDO: { item?.totalProducaoBruta }</p>
                                    <p>TOTAL REFUGOS: { item?.totalProducaoRefugada }</p>
                                    <p>TOTAL BOAS: {item?.totalProducaoLiquida}</p>
                                    <p>TOTAL TEMPO ATIVO: {item?.totalTempoAtivoFormatado}</p>
                                    <p>TOTAL TEMPO PARADAS: {item?.totalTempoParadaCPFormatado}</p>
                                    <p>EFICIÊNCIA REALIZAÇÃO: { item?.totalIndiceEficienciaRealizacao }</p>
                                    <p>ÍNDICE CAV. ATIVAS: {item?.totalCavidadesAtivas}</p>
                                    <p>ÍNDICE REFUGOS: {item?.totalIndiceRefugo}</p>
                                    <p>ÍNDICE PARADAS: {item?.totalIndiceParadas}</p>
                                </div>
                            </td>
                        </tr>
                        <tr className='tr-operador-th'>
                            <th colSpan={5}>OPERADORES</th>
                            <th colSpan={5}>DT/HR LOGIN</th>
                            <th colSpan={5}>DT/HR LOGOUT</th>
                        </tr>
                        {item?.listaOperadoresDTO.map(((operador : IOperador, index2: number) => {
                        return <tr className='tr-operador-td' key={index2}>
                            <td colSpan={5}>{operador.nome}</td>
                            <td colSpan={5}>{operador.loginFormatado}</td>
                            <td colSpan={5}>{operador.logoutFormatado}</td>
                        </tr>
                        }))}

                    </tbody>
                }) 
  
    )
}
// PLANEJADO X REALIZADO
export function AcompanhamentoProducaoBody ( props : any ) {
    return (
        <tbody>
            {
                props?.lista?.map( (item : IListaAcompanhamentoProducaoDTO ,index : number) => {
                    return <tr key={index}>
                        {/* PRIMEIRA CAMADA */}
                        <td>{item?.maquina}</td>
                        <td>{item?.projecaofPeriodo}</td>
                        <td>{item?.qtdProduzida}</td>
                        <td>{item?.qtdPrevista}</td>
                        <td>{item?.metaPeriodo}</td>
                        <td>{item?.eficRelaizacao}</td>
                        <td>{item?.indiceRef}</td>
                        <td>{item?.indicePa}</td>
                        <td>{item?.eficRelaizacao}</td>
                    </tr>
                })
            }   
        </tbody>
    )
}

// ÍNDICE DE PARADAS
// PARÃO
export function IndiceParadasPadraoBody ( props : any ) {
    console.log(props)
    return <tbody>
        {
            props?.paradas?.map( (parada : IindiceParadasDTO ,index : number) => {
                return <tr key={index}>
                    {/* PRIMEIRA CAMADA */}
                    <td>{parada?.parada}</td>
                    <td>{convertSecondsToTime(parada?.tempo)}</td>
                    <td>{parada?.indice}</td>
                </tr>
            })
        }   
    </tbody>
}
// PRODUTO
export function IndiceParadasProdutoBody ( props : any ) {
    console.log(props)
    return <tbody>
        {
            props?.paradas?.map( (parada : IindiceParadasDTO ,index : number) => {
                return <tr key={index}>
                    {/* PRIMEIRA CAMADA */}
                    <td>{parada?.produto}</td>
                    <td>{parada?.maquina}</td>
                    <td>{parada?.parada}</td>
                    <td>{convertSecondsToTime(parada?.tempo)}</td>
                    <td>{parada?.indice}</td>
                </tr>
            })
        }   
    </tbody>
}
// FERRAMENTA
export function IndiceParadasFerramentaBody ( props : any ) {
    console.log(props)
    return <tbody>
        {
            props?.paradas?.map( (parada : IindiceParadasDTO ,index : number) => {
                return <tr key={index}>
                    {/* PRIMEIRA CAMADA */}
                    <td>{parada?.ferramenta}</td>
                    <td>{parada?.maquina}</td>
                    <td>{parada?.parada}</td>
                    <td>{convertSecondsToTime(parada?.tempo)}</td>
                    <td>{parada?.indice}</td>
                </tr>
            })
        }   
    </tbody>
}