import { IParadaOcorrenciasParada, IParadaProducaoRegulagem, IPostoPeriodo } from '../../../interface/reports/producao/producaoRegulagem';
import { IPostoIndiceRefugo, IProdutosIndiceRefugo, IRefugoIndiceRefugo, IRefugoIndiceRefugoExtra } from '../../../interface/reports/producao/indiceRefugos';
import { IParadaIndiceParadaXPosto, ISubRelatorioIndiceParada } from '../../../interface/reports/paradas/indiceParadasXPosto';
import { IListaDTO, IOperador, ItemProducaoEficienciaHoraAHora } from '../../../interface/reports/producao/analiseProducao';
import { IItemIndiceParada, IParada, IParadaPadrao, IPostoParada } from '../../../interface/reports/paradas/indiceParadas';
import { IItemPlanejaxRealizado } from '../../../interface/reports/planejamento/planejadoxrealizado';
import { IFerramenta, IPosto, IProduto } from '../../../interface/reports/producao/consolidados';
import { IPostoIntervalo } from '../../../interface/reports/producao/acompanhamentoProducao';
import { IProdutoFichaTecnica } from '../../../interface/reports/engenharia/fichaTecnica';
import { Formatar, convertSecondsToTime } from './datetime';
import { FiDownload, FiPrinter } from "react-icons/fi";
import { DecimalParaReal } from './DOM/functions';
import { Fragment, useState } from 'react';
import { Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import "./export.scss";



export function Header(props : any) {

    

    return (
        <div className="export-header">
            <div className='title-content'>
                <h2>{props.title}</h2>
                <span>
                    <p>{new Formatar(new Date()).dataGeralPT()}</p>
                    <p>v0.131.10</p>
                </span>
            </div>
            <div className="flex-header">
                <div className='descricao-list'>
                    { props.components}
                </div>
                <div className="btn-pdf">
                    {/* <Button variant="contained" 
                    startIcon={<FiDownload className='header-btn-ico' size={20}/>} 
                    onClick={(e) => {  props.getTableDOM(true) }}>Baixar</Button>
                    <Button  
                    variant="contained" 
                    startIcon={<FiPrinter className='header-btn-ico' size={20}/>} 
                    onClick={(e) => { props.getTableDOM(false) }}>Imprimir</Button> */}

                    {/* só icones */}

                    <Button variant="contained" 
                    onClick={(e) => {  props.getTableDOM(true) }}><FiDownload className='header-btn-ico' size={20}/></Button>
                    <Button variant="contained" 
                    onClick={(e) => { props.getTableDOM(false) }}><FiPrinter className='header-btn-ico' size={20}/></Button>
                </div>
            </div>
            
        </div>
    )
}

export function TableDinamic ( props : any ){
    

    return (
        <>
            
            <table id="table-main" style={{ fontSize: `${props.fontTable}px` }}>
                <thead>
                {/* header auxiliar para "produção e regulagem" */}
                {props?.aux ? (
                    <tr>
                    {props?.aux?.map((item: string, index: number) => {
                        if (index === 2 || index === 3) {
                        return (
                            <th style={{ backgroundColor: "#d9d9d9" }} colSpan={2} key={`${index}-${item}`}>
                            {item}
                            </th>
                        );
                        } else {
                        return <th colSpan={1} key={`${index}-${item}`}>{item}</th>;
                        }
                    })}
                    </tr>
                ) : (
                    <></>
                )}

                {/* header padrão dinâmico */}
                <tr>
                    {props?.headers?.map((item: string, index: number) => (
                    <th key={`${index} -  ${item}`}>{item}</th>
                    ))}
                </tr>
                </thead>

                {props.body}
            </table>
        </>

    )
}
// CONSOLIDADOS 
// POR POSTO
export function ConsolidadosPostoBody ( props : any ){
    return  (
        <tbody className='t-consolidados'>
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
                                return <p className="span nv2" key={index}>{ferramenta.ferramenta}</p>}
                        )}</td>
                        <td >{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                                return <p className="span nv2" key={index}>{ferramenta.cicloPadrao}</p>}
                        )}</td>
                        <td >{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                                return <p className="span nv2" key={index}>{ferramenta.cicloLido}</p>}
                        )}</td>
                        <td >{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                                return <p className="span nv2" key={index}>{ferramenta.eficienciaCiclo}</p>}
                        )}</td>
                        {/* TERCEIRA CAMADA */}
                        <td >{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.produtos?.map((produto : IProduto, index : number) => {
                                return <p className="span nv3" key={index}>{produto.produto}</p>
                                })
                            }
                        )}</td>
                        {/* SEGUNDA CAMADA */}
                        <td >{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                                return <p className="span nv2" key={index}>{ferramenta.cavidadesTotais === "0" ? "" : `${ferramenta.cavidadesAtivas}/${ferramenta.cavidadesTotais}`}</p>}
                        )}</td>
                        <td >{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                                return <p className="span nv2" key={index}>{ferramenta.indiceCavidades}</p>}
                        )}</td>
                        {/* TERCEIRA CAMADA */}
                        <td>{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.produtos?.map((produto : IProduto, index : number) => {
                                return <p className="span nv3" key={index}>{produto.pecasPrevistas}</p>
                                })
                            }
                        )}</td>
                        <td>{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.produtos?.map((produto : IProduto, index : number) => {
                                return <p className="span nv3" key={index}>{produto.pecasProduzidas}</p>
                                })
                            }
                        )}</td>
                        <td>{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.produtos?.map((produto : IProduto, index : number) => {
                                return <p className="span nv3" key={index}>{produto.pecasRefugadas}</p>
                                })
                            }
                        )}</td>
                        <td>{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.produtos?.map((produto : IProduto, index : number) => {
                                return <p className="span nv3" key={index}>{produto.pecasBoas}</p>
                                })
                            }
                        )}</td>
                        <td>{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.produtos?.map((produto : IProduto, index : number) => {
                                return <p className="span nv3" key={index}>{produto.indiceRefugo}</p>
                                })
                            }
                        )}</td>
                        <td>{posto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.produtos?.map((produto : IProduto, index : number) => {
                                return <p className="span nv3" key={index}>{produto.eficienciaRealizacao}</p>
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
    return  (
        <tbody className='t-consolidados'>
            {
                props?.ferramentas?.map( (ferramenta : IFerramenta ,index : number) => {
                    return <tr key={index}>
                        {/* PRIMEIRA CAMADA */}
                        <td>{ferramenta?.ferramenta}</td>

                        {/* SEGUNDA CAMADA */}
                        <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                            return <p className="span nv2" key={index}>{posto.posto}</p>}
                        )}</td>
                        {/* PRIMEIRA CAMADA */}
                        <td>{ferramenta?.cicloPadrao}</td>
                        <td>{ferramenta?.cicloLido}</td>
                        <td>{ferramenta?.eficienciaCiclo}</td>
                        {/* SEGUNDA CAMADA */}
                        <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <p className="span nv2" key={index}>{posto.horasTrabalhadas}</p>}
                        )}</td>
                        <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <p className="span nv2" key={index}>{posto.horasParadas}</p>}
                        )}</td>
                        <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <p className="span nv2" key={index}>{posto.tempoAtivo}</p>}
                        )}</td>
                        <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <p className="span nv2" key={index}>{posto.indiceParadas}</p>}
                        )}</td>
                        {/* TERCEIRA CAMADA */}
                        <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                            return posto?.produtos?.map((produto : IProduto, index : number) => {
                                return <p className="span nv3" key={index}>{produto.produto}</p>
                                })
                            }
                        )}</td>
                       {/* PRIMEIRA CAMADA */}
                       <td>{ferramenta.cavidadesTotais === "0" ? "" : `${ferramenta.cavidadesAtivas}/${ferramenta.cavidadesTotais}`}</td>
                       <td>{ferramenta?.indiceCavidades}</td>
                       {/* TERCEIRA CAMADA */}
                       <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                            return posto?.produtos?.map((produto : IProduto, index : number) => {
                                return <p className="span nv3" key={index}>{produto.pecasPrevistas}</p>
                                })
                            }
                        )}</td>
                       <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                            return posto?.produtos?.map((produto : IProduto, index : number) => {
                                return <p className="span nv3" key={index}>{produto.pecasProduzidas}</p>
                                })
                            }
                        )}</td>
                       <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                            return posto?.produtos?.map((produto : IProduto, index : number) => {
                                return <p className="span nv3" key={index}>{produto.pecasRefugadas}</p>
                                })
                            }
                        )}</td>
                       <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                            return posto?.produtos?.map((produto : IProduto, index : number) => {
                                return <p className="span nv3" key={index}>{produto.pecasBoas}</p>
                                })
                            }
                        )}</td>
                        <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                            return posto?.produtos?.map((produto : IProduto, index : number) => {
                                return <p className="span nv3" key={index}>{produto.indiceRefugo}</p>
                                })
                            }
                        )}</td>
                        <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                            return posto?.produtos?.map((produto : IProduto, index : number) => {
                                return <p className="span nv3" key={index}>{produto.eficienciaRealizacao}</p>
                                })
                            }
                        )}</td>
                        {/* SEGUNDA CAMADA */}
                        <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <p className="span nv2" key={index}>{posto.oee}</p>}
                        )}</td>
                        <td >{ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <p className="span nv2" key={index}>{posto.oeeCap}</p>}
                        )}</td>

                    </tr>
                })
            }   
        </tbody>
    )
}
// POR PRODUTO
export function ConsolidadosProdutoBody ( props : any ){
    return  (
        <tbody className='t-consolidados'>
            {
                props?.produtos?.map( (produto : IProduto ,index : number) => {
                    return <tr key={index}>
                        {/* PRIMEIRA CAMADA */}
                        <td>{produto?.produto}</td>

                        {/* SEGUNDA CAMADA */}
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return <p className="span nv2" key={index}>{ferramenta.ferramenta}</p>}
                        )}</td>
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return <p className="span nv2" key={index}>{ferramenta.cavidadesTotais === "0" ? "" : `${ferramenta.cavidadesAtivas}/${ferramenta.cavidadesTotais}`}</p>}
                        )}</td>
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return <p className="span nv2" key={index}>{ferramenta.indiceCavidades}</p>}
                        )}</td>
                        {/* TERCEIRA CAMADA */}
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <p className="span nv3" key={index}>{posto.posto}</p>
                                })
                            }
                        )}</td>
                        {/* SEGUNDA CAMADA */}
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return <p className="span nv2" key={index}>{ferramenta.cicloPadrao}</p>}
                        )}</td>
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return <p className="span nv2" key={index}>{ferramenta.cicloLido}</p>}
                        )}</td>
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return <p className="span nv2" key={index}>{ferramenta.eficienciaCiclo}</p>}
                        )}</td>
                        {/* TERCEIRA CAMADA */}
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <p className="span nv3" key={index}>{posto.horasTrabalhadas}</p>
                                })
                            }
                        )}</td>
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <p className="span nv3" key={index}>{posto.horasParadas}</p>
                                })
                            }
                        )}</td>
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <p className="span nv3" key={index}>{posto.tempoAtivo}</p>
                                })
                            }
                        )}</td>
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <p className="span nv3" key={index}>{posto.indiceParadas}</p>
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
                                return <p className="span nv3" key={index}>{posto.oee}</p>
                                })
                            }
                        )}</td>
                        <td >{produto?.ferramentas?.map((ferramenta : IFerramenta, index : number) => {
                            return ferramenta?.postos?.map((posto : IPosto, index : number) => {
                                return <p className="span nv3" key={index}>{posto.oeeCap}</p>
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
        <div className="container-totais total-geral" id="totais-totais" style={{height : "160px"}}>
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
        <tbody className='t-planejaxrealizado'>
            {
                props?.itens?.map( (item : IItemPlanejaxRealizado ,index : number) => {
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
    return ( 
        props.parada?.subRelatorioIndiceParadas?.map((row : ISubRelatorioIndiceParada, index : number) => {
            return ( 
                <tbody className="t-indiceparadaxposto">
                    <tr>
                        <td>{row?.maquina}</td>
                        <td>{ convertSecondsToTime( row?.tempoAtivo ) }</td>
                        <td>{row?.listaParadasRelatorio?.map((i: IParadaIndiceParadaXPosto, index: number) => <p key={index}>{i.parada}</p>)}</td>
                        <td>{row?.listaParadasRelatorio?.map((i: IParadaIndiceParadaXPosto, index: number) => <p key={index}>{i.quantidade}</p>)}</td>
                        <td>{row?.listaParadasRelatorio?.map((i: IParadaIndiceParadaXPosto, index: number) => <p key={index}>{convertSecondsToTime(i.tempoParada)}</p>)}</td>
                        <td>{row?.listaParadasRelatorio?.map((i: IParadaIndiceParadaXPosto, index: number) => <p key={index}>{i.indiceBA}</p>)}</td>
                    
                    </tr>
                    <tr>
                        <td colSpan={6} style={{backgroundColor : "#c6dbfa", height: props.fontTable * 9}}>
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
// TOTAL GERAL
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
// FICHA TÉCNICA 
export function FichaTecnicaBody( props : any){
    return (
        <tbody className='t-fichatecnica'>
            {
                props?.itens?.map( (item : IProdutoFichaTecnica ,index : number) => {
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
                                <div className="container-totais total-geral" id="totais-totais" style={{height : props.fontTable * 8}}>
                                    <p style={{fontSize : props.fontTable}}>TOTAL PREVISTO: { item?.totalProducaoPrevista }</p>
                                    <p style={{fontSize : props.fontTable}}>TOTAL PRODUZIDO: { item?.totalProducaoBruta }</p>
                                    <p style={{fontSize : props.fontTable}}>TOTAL REFUGOS: { item?.totalProducaoRefugada }</p>
                                    <p style={{fontSize : props.fontTable}}>TOTAL BOAS: {item?.totalProducaoLiquida}</p>
                                    <p style={{fontSize : props.fontTable}}>TOTAL TEMPO ATIVO: {item?.totalTempoAtivoFormatado}</p>
                                    <p style={{fontSize : props.fontTable}}>TOTAL TEMPO PARADAS: {item?.totalTempoParadaCPFormatado}</p>
                                    <p style={{fontSize : props.fontTable}}>EFICIÊNCIA REALIZAÇÃO: { item?.totalIndiceEficienciaRealizacao }</p>
                                    <p style={{fontSize : props.fontTable}}>ÍNDICE CAV. ATIVAS: {item?.totalCavidadesAtivas}</p>
                                    <p style={{fontSize : props.fontTable}}>ÍNDICE REFUGOS: {item?.totalIndiceRefugo}</p>
                                    <p style={{fontSize : props.fontTable}}>ÍNDICE PARADAS: {item?.totalIndiceParadas}</p>
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
// ACOMPANHAMENTO DE PRODUÇÃO
export function AcompanhamentoProducaoBody ( props : any ) {
    return (
        <tbody className='t-acompanhamento'>
            {
                props?.postos?.map( (item : IPostoIntervalo ,index : number) => {
                    return <tr key={uuidv4()}>
                        {/* PRIMEIRA CAMADA */}
                        <td className='cor-personalizada'>{item.maquina}</td>
                        <td>{DecimalParaReal(item.projecaofPeriodo)}</td>
                        <td>{DecimalParaReal(item.qtdProduzida)}</td>
                        <td>{DecimalParaReal(item.qtdPrevista)}</td>
                        <td>{DecimalParaReal(item.metaPeriodo)}</td>
                        <td>{DecimalParaReal(item.eficRealizacao)}</td>
                        <td>{DecimalParaReal(item.indRefugo)}</td>
                        <td>{DecimalParaReal(item.indParada)}</td>
                        <td>{DecimalParaReal(item.eficCiclo)}</td>
                    </tr>
                })
            }   
            <tr>
                <td className='cor-personalizada'>TOTAL</td>
                <td className='cor-personalizada'>{DecimalParaReal(props?.totais.projecaofPeriodo)}</td>
                <td className='cor-personalizada'>{DecimalParaReal(props?.totais.qtdProduzclassNamea)}</td>
                <td className='cor-personalizada'>{DecimalParaReal(props?.totais.qtdPrevista)}</td>
                <td className='cor-personalizada'>{DecimalParaReal(props?.totais.metaPeriodo)}</td>
                <td className='cor-personalizada'>{DecimalParaReal(props?.totais.eficRealizacao)}</td>
                <td className='cor-personalizada'>{DecimalParaReal(props?.totais.indRefugo)}</td>
                <td className='cor-personalizada'>{DecimalParaReal(props?.totais.indParada)}</td>
                <td className='cor-personalizada'>{DecimalParaReal(props?.totais.eficCiclo)}</td>
            </tr>
            <tr><td id='td-espaco' colSpan={9}></td></tr>
        </tbody>
    )
}
// TOTAL GERAL 
export function TotalGeralAcompanhamentoProducao ( props : any ) {
    return (
        <table id='table-total-acompanhamento'>
            <tbody >
                <tr>
                    <td >TOTAL</td>
                    <td >{ DecimalParaReal(props?.total?.projecaofPeriodo) }</td>
                    <td >{ DecimalParaReal(props?.total?.qtdProduzida) }</td>
                    <td >{ DecimalParaReal(props?.total?.qtdPrevista) }</td>
                    <td >{ DecimalParaReal(props?.total?.metaPeriodo) }</td>
                    <td >{ DecimalParaReal(props?.total?.eficRealizacao) }</td>
                    <td >{ DecimalParaReal(props?.total?.indRefugo) }</td>
                    <td >{ DecimalParaReal(props?.total?.indParada) }</td>
                    <td >{ DecimalParaReal(props?.total?.eficCiclo) }</td>
                </tr>
            </tbody>
        </table>
    )
}
// ÍNDICE DE PARADAS
// PARÃO
export function IndiceParadasPadraoBody ( props : any ) {
    return <tbody className='t-indiceparadapadrao'>
        {
            props?.paradas?.map( (parada : IParadaPadrao ,index : number) => {
                return <tr key={index}>
                    {/* PRIMEIRA CAMADA */}
                    <td className='td-indiceparada'>{parada?.parada?.parada}</td>
                    <td className='td-indiceparada'>{parada?.parada?.tempo}</td>
                    <td className='td-indiceparada'>{parada?.parada?.indice}</td>
                </tr>
            })
        }   
    </tbody>
}
// PRODUTO
export function IndiceParadasProdutoBody ( props : any ) {
    return <>
        {
            props?.paradas?.map( (produto : IItemIndiceParada ,index : number) => {
                return <tbody className='t-indiceparada' key={index}>
                    {produto?.postos?.map(( posto : IPostoParada, index: number) => {
                        return <> <tr key={index}>
                                <td>{produto.produto}</td>
                                {/* PRIMEIRA CAMADA */}
                                <td className='td-posto' align='right'>{ posto.posto }</td>
                                {/* TERCEIRA CAMADA */}
                                <td> {posto?.paradas?.map((parada : IParada, index: number) => {
                                    return <p key={index}>{parada.parada}</p>
                                    })} </td>
                                <td> {posto?.paradas?.map((parada : IParada, index: number) => {
                                    return <p key={index}>{parada.tempo}</p>
                                    })} </td>
                                <td> {posto?.paradas?.map((parada : IParada, index: number) => {
                                    return <p key={index}>{parada?.indice}</p>
                                    })} </td>
                            </tr>
                            {/* SUB TOTAL DE POSTOS */}
                            <tr>
                                <td className='td-sub-total' colSpan={3}>TEMPO DE PARADAS DO POSTO (B): {posto.tempoParadasPosto}</td>
                                <td className='td-sub-total' colSpan={2}>ÍNDICE (B)/(C): {posto?.indice}</td>                                
                            </tr> </>
                    })} 
                    {/* SUB TOTAL DE FERRAMENTAS / PRODUTOS */}
                    <tr>
                        <td className='td-total' colSpan={2}>TEMPO DE PARADAS DO PRODUTO (C):</td>
                        <td className='td-total' colSpan={1}>{produto.tempoParadasProduto}</td>
                        <td className='td-total' colSpan={2}>ÍNDICE (C)/(D): {produto?.indice}</td>
                    </tr>
                </tbody>
            })
        }   
    </>
}
// FERRAMENTA
export function IndiceParadasFerramentaBody ( props : any ) {
    return <>
        {
            props?.paradas?.map( (ferramenta : IItemIndiceParada ,index : number) => {
                return <tbody className='t-indiceparada' key={index}>
                    {ferramenta?.postos?.map(( posto : IPostoParada, index: number) => {
                        return <> <tr key={index}>
                                {/* PRIMEIRA CAMADA */}
                                <td>{ferramenta.ferramenta}</td>
                                <td className='td-posto' align='right'>{ posto.posto }</td>
                                {/* SEGUNDA CAMADA */}
                                <td> {posto?.paradas?.map((parada : IParada, index: number) => {
                                    return <p key={index}>{parada.parada}</p>
                                    })} </td>
                                <td> {posto?.paradas?.map((parada : IParada, index: number) => {
                                    return <p key={index}>{parada.tempo}</p>
                                    })} </td>
                                <td> {posto?.paradas?.map((parada : IParada, index: number) => {
                                    return <p key={index}>{parada.indice}</p>
                                    })} </td>
                            </tr>
                            {/* SUB TOTAL DE POSTOS */}
                            <tr>
                                <td className='td-sub-total' colSpan={3}>TEMPO DE PARADAS DO POSTO (B):</td>
                                <td className='td-sub-total' colSpan={2}>ÍNDICE (B)/(C): {posto?.indice}</td>                                
                            </tr> </>
                    })} 
                     {/* SUB TOTAL DE FERRAMENTAS / PRODUTOS */}
                    <tr>
                        <td className='td-total' colSpan={2}>TEMPO DE PARADAS DA FERRAMENTA (C):</td>
                        <td className='td-total' colSpan={1}>{ferramenta?.tempoParadasFerramenta}</td>
                        <td className='td-total' colSpan={2}>ÍNDICE (C)/(D): {ferramenta?.indice}</td>
                    </tr>
                </tbody>
                
                
            })
        }   
    </>
}
// TOTAL 
export function TotalGeralIndiceParadas ( props : any ) {
    return (
        <div className="container-totais total-geral" id="totais-totais">
            <p>TEMPO PARADAS SEM PESO NA EFICIÊNCIA: { props.dados?.tempoParadasSP }</p>
            <p>TEMPO PARADAS COM PESO NA EFICIÊNCIA: { props.dados.tempoParadasCP }</p>
            <p>TEMPO TOTAL DE PARADAS (D): { props.dados.tempoParadasTotal }</p>
        </div>
    )
}
// PRODUÇÃO EM REGULAGEM
export function ProducaoEmRegulagemBody ( props : any ) {
    return <tbody className='t-producaoregulagem'>
        {
            props?.postos?.map( (posto : IPostoPeriodo ,index : number) => {
                    return <Fragment key={`${uuidv4()}-${index}`}>
                    <tr className='t-producao-regulagem'>
                        {/* verifica se é por posto, ferramenta ou produto */}
                        {
                        props?.isPosto ? 
                            <>
                                <td>{posto?.cdPosto}</td> 
                                <td>{posto?.ferramenta}</td> 
                            </> : 
                        props?.isFerramenta ?
                            <>
                                <td>{posto?.cdPosto}</td> 
                                <td>{posto?.ferramenta}</td> 
                            </>
                        : props?.isProduto ?
                            <>
                                <td>{posto?.produto}</td> 
                                <td>{posto?.cdPosto}</td> 
                            </> : <></>
                        }
                        {/* fim */}
                        <td>{posto?.totalTempoParadaComPesoNaEficienciaHora}</td> 
                        <td>{posto?.totalTempoParadaSemPesoNaEficienciaHora}</td> 
                        <td>{posto?.totalTempoParadaRegulagemComPesoNaEficienciaHora}</td> 
                        <td>{posto?.totalTempoParadaRegulagemSemPesoNaEficienciaHora}</td> 
                        {/* verifica se é por posto, ferramenta ou produto */}
                        { 
                        props?.isPosto ? <td>{posto?.produto}</td> :  
                        props?.isFerramenta ? <td>{posto?.produto}</td> : 
                        props?.isProduto ? <td>{posto?.produto}</td> : <></>}

                        {
                            props?.exibirParadas ? <>
                                <td>{posto?.paradas?.map((parada : IParadaProducaoRegulagem) => <p>{parada.parada}</p> )} </td>
                                <td>{posto?.paradas?.map((parada : IParadaProducaoRegulagem) => <p>{parada.tempoParadaHora}</p> )} </td>
                            </> : <></>
                        }
                        <td>{posto?.totalProducaoEmRegulagem}</td> 
                    </tr>
                    <tr className='t-producao-regulagem'>
                        {/* verifica se é por posto, ferramenta ou produto */}
                        <td className='td-total-posto'>{ 
                        props?.isPosto ? "Totais do Posto" :  
                        props?.isFerramenta ? "Totais da Ferramenta" : 
                        props?.isProduto ? "Totais do Produto": <></>}</td> 

                        <td className='td-total-posto'></td> 
                        <td className='td-total-posto'>{posto?.totalTempoParadaComPesoNaEficienciaHora}</td> 
                        <td className='td-total-posto'>{posto?.totalTempoParadaSemPesoNaEficienciaHora}</td> 
                        <td className='td-total-posto'>{posto?.totalTempoParadaRegulagemComPesoNaEficienciaHora}</td> 
                        <td className='td-total-posto'>{posto?.totalTempoParadaRegulagemSemPesoNaEficienciaHora}</td> 
                        <td className='td-total-posto'></td> 
                        {
                            props?.exibirParadas ? <>
                                <td className='td-total-posto'></td>
                                <td className='td-total-posto'>{convertSecondsToTime(posto?.totalTempoParadaComPesoNaEficiencia+posto?.totalTempoParadaSemPesoNaEficiencia)}</td>
                            </> : <></>
                        }
                        <td className='td-total-posto'>{posto?.totalProducaoEmRegulagem}</td> 
                    </tr>
                </Fragment>
            })
        }   
    </tbody>
}
// TOTAL 
export function TotalGeralProducaoRegulagem ( props : any ) {
    return (
        <table id='table-total-geral'>
            <thead>
                <tr>
                    <th></th>
                    <th colSpan={2}>TEMPO PARADAS</th>
                    <th colSpan={2}>TEMPO PARADAS REGULAGEM</th>
                    {props.exibirParadas ? <th></th> : <></>}
                    <th></th>
                </tr>
                <tr>
                    <th>*</th>
                    <th>C/ PESO NA EFIC.</th>
                    <th>S/ PESO NA EFIC.</th>
                    <th>C/ PESO NA EFIC.</th>
                    <th>S/ PESO NA EFIC.</th>
                    {props.exibirParadas ? <th>TEMPO DA PARADA</th> : <></>}
                    <th>PRODUÇÃO EM REGULAGEM</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>TOTAIS DO PERÍODO</td>
                    <td>{props?.totais?.periodoTempoParadaComPesoNaEficienciaHora}</td>
                    <td>{props?.totais?.periodoTempoParadaSemPesoNaEficienciaHora}</td>
                    <td>{props?.totais?.periodoTempoParadaRegulagemComPesoNaEficienciaHora}</td>
                    <td>{props?.totais?.periodoTempoParadaRegulagemSemPesoNaEficienciaHora}</td>
                    {props.exibirParadas? <td>{props?.totais?.periodoTempoParadaHora}</td> : <></>}
                    <td>{props?.totais?.periodoProducaoEmRegulagemHora}</td>
                </tr>
            </tbody>
        </table>
    )
}
// OCORRÊNCIA DE PARADA DE REGULAGEM
export function OcorrenciaParadaRegulagemBody ( props : any ) {
    return (
        <tbody className='t-ocorrenciaregulagem'>
            {
                props?.paradas?.map( (parada : IParadaOcorrenciasParada ,index : number) => {
                    return <tr key={index}>
                        <td className='td-parada-ocorrencia-regulagem'>{parada.maquina}</td>
                        <td className='td-parada-ocorrencia-regulagem'>{parada.parada}</td>
                        <td className='td-parada-ocorrencia-regulagem'>{parada.raps}</td>
                        <td className='td-parada-ocorrencia-regulagem'>{parada.tempoParMaq}</td>
                    </tr>
                })
            }   
        </tbody>
    )
}
// ÍNDICE DE REFUGO
// POR POSTO
export function IndiceRefugoPostoBody ( props : any ) {
    return (
        <tbody className='t-indicerefugo'>
            {
                props?.postos?.map( (item : IPostoIndiceRefugo,index : number) => {
                    var isExists: boolean = true;
                    return <>
                        {
                            item?.produtos?.map((produto: IProdutosIndiceRefugo, index1) => {

                                return <Fragment key={index1}> 
                                    <tr>
                                        <td className='td-indicerefugo'>{isExists ? item.posto : ""}</td>
                                        <td className='td-indicerefugo'>{produto.produto}</td>
                                        <td className='td-indicerefugo'> { produto.refugos?.map((refugo : IRefugoIndiceRefugo) => <p>{refugo.refugo}</p> ) } </td>
                                        <td className='td-indicerefugo'> { produto.refugos?.map((refugo : IRefugoIndiceRefugo) => <p>{refugo.qtdRefugada}</p> ) } </td>
                                        <td className='td-indicerefugo'> { produto.refugos?.map((refugo : IRefugoIndiceRefugo) => <p>{refugo.indice}</p> ) } </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5} style={{backgroundColor : "#F0F4FA"}}>TOTAIS DO PRODUTO</td>
                                    </tr>
                                    <tr>
                                        <td className='td-subtotais' colSpan={5} style={{backgroundColor : "#E7EEF8", borderBottom: "2px dashed #414141"}}>
                                            <div className='container-subtotais-indice-refugo'>
                                                <p>ÍNDICE COM BASE EM (B) : {produto?.indiceB}</p>
                                                <p>ÍNDICE COM BASE EM (A) : {produto?.indiceA}</p>
                                                <p>QTD. REFUGADA : {produto?.totalRefugado}</p>
                                                <p>QTD. PRODUZIDA (A) : {produto?.totalProduzido}</p>
                                                {/* espaço para ficar igual o original :D */}
                                                <p style={{color: "#fff"}}>-</p>
                                                <p>QTD. BOAS : {produto?.totalBoas}</p>
                                            </div>
                                        </td>
                                    </tr>
                                    {isExists = false}
                                </Fragment>
                            })
                        }
                        <Fragment key={index}>
                            <tr>
                                <td colSpan={5} style={{backgroundColor : "#D0D9ED", fontWeight: 500}}>TOTAIS DO POSTO</td>
                            </tr>
                            <tr>
                                {/* usando o "column-reverse wrap-reverse" */}
                                <td className='td-subtotais' colSpan={5} style={{backgroundColor : "#D0D9ED", fontWeight: 500}}>
                                    <div className='container-subtotais-indice-refugo'>
                                        <p>ÍNDICE COM BASE EM (C) : {item?.indiceC}</p>
                                        <p>ÍNDICE COM BASE EM (B) : {item?.indiceB}</p>
                                        <p>QTD. REFUGADA : {item?.totalRefugado}</p>
                                        <p>QTD. PRODUZIDA (B) : {item?.totalProduzido}</p>
                                        {/* espaço para ficar igual o original :D */}
                                        <p style={{color: "#fff"}}>-</p>
                                        <p>QTD. BOAS : {item?.totalBoas}</p>
                                    </div>
                                </td>
                            </tr>
                        </Fragment>
                    </>
                })
            }   
        </tbody>
    )
}
// POR PRODUTOS
export function IndiceRefugoProdutoBody ( props : any ) {
    return (
        <tbody className='t-indicerefugo'>
            {
                props?.produtos?.map((produto: IProdutosIndiceRefugo, index : number) => {

                    return <Fragment key={index}> 
                        <tr>
                            <td className='td-indicerefugo-produto'>{produto.produto}</td>
                            <td className='td-indicerefugo-produto'> { produto.refugos?.map((refugo : IRefugoIndiceRefugo) => <p>{refugo.refugo}</p> ) } </td>
                            <td className='td-indicerefugo-produto'> { produto.refugos?.map((refugo : IRefugoIndiceRefugo) => <p>{refugo.qtdRefugada}</p> ) } </td>
                            <td className='td-indicerefugo-produto'> { produto.refugos?.map((refugo : IRefugoIndiceRefugo) => <p>{refugo.indice}</p> ) } </td>
                        </tr>
                        <tr>
                            <td className='por-produtos' colSpan={4} style={{backgroundColor : "#F0F4FA", fontWeight: 500}}>TOTAIS DO PRODUTO</td>
                        </tr>
                        <tr>
                            <td className='td-subtotais por-produtos' colSpan={4} style={{backgroundColor : "#E7EEF8", borderBottom: "2px dashed #414141", fontWeight: 500}}>
                                {/* usando o "column-reverse wrap-reverse" */}
                                <div className='container-subtotais-indice-refugo'>
                                    <p>ÍNDICE COM BASE EM (B) : {produto?.indiceB}</p>
                                    <p>ÍNDICE COM BASE EM (A) : {produto?.indiceA}</p>
                                    <p>QTD. REFUGADA : {produto?.totalRefugado}</p>
                                    <p>QTD. PRODUZIDA (A) : {produto?.totalProduzido}</p>
                                    {/* espaço para ficar igual o original :D */}
                                    <p style={{color: "#fff"}}>-</p>
                                    <p>QTD. BOAS : {produto?.totalBoas}</p>
                                </div>
                            </td>
                        </tr>
                    </Fragment>
                })
            }
        </tbody>
    )
}
// POR PRODUTOS
export function IndiceRefugoRefugoBody ( props : any ) {
    return (
        <tbody className='t-indicerefugo'>
            {
                props?.refugos?.map((refugo: IRefugoIndiceRefugoExtra, index : number) => {
                    return <tr key={index}>
                        <td className='td-indicerefugo-refugo'>{refugo.refugo.refugo}</td>
                        <td className='td-indicerefugo-refugo'>{refugo.refugo.qtdRefugada}</td>
                        <td className='td-indicerefugo-refugo'>{refugo.refugo.indice}</td>
                    </tr>
                })
            }
        </tbody>
    )
}
// TOTAL GERAL ÍNDICE PARADAS
export function TotalGeralIndiceRefugo ( props : any ) {
    return (
        <> 
            <div className="container-totais total-geral" id="totais-totais" style={{maxHeight: "70px"}}>
                {props.totais.totalProduzido ? <p>QTD. PRODUZIDA: { props?.totais?.totalProduzido }</p> : <></>}
                {props.totais.totalRefugado ? <p>QTD. REFUGADA: { props?.totais?.totalRefugado }</p> : <></>}
                {props.totais.totalBoas ? <p>QTD. BOAS: { props?.totais?.totalBoas }</p> : <></>}
                {props.totais.indice ? <p>ÍNDICE COM BASE EM (C): { props?.totais?.indice }</p> : <></>}
            </div>
        </> 
    )
}