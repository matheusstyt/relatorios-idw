import { Header, OcorrenciaParadaRegulagemBody, ProducaoEmRegulagemBody, TableDinamic, TotalGeralProducaoRegulagem } from "../../../../components/reports/pdf";
import { getTableDinamicDOM } from "../../../../components/reports/pdf/DOM";
import headers from "../../../../components/reports/pdf/headers.json";
import { Preloader } from "../../../../components/reports/preloader";
import AccordionDinamic from "../../../../components/accordion";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import Filtros from "./filtros";
import "../../../pages.scss";
import { IOcorrenciasParadaResponse, IProducaoRegulagemResponse } from "../../../../interface/reports/producao/producaoRegulagem";
import { OcorrenciasParadaServices, ProducaoRegulagemServices } from "../../../../services/reports/produtos";
import FontRange from "../../../../components/reports/fontRange";

export default function ProducaoRegulagem (props : any) {
    const [exibirPreloader, setExibirPreloader] = useState<boolean>(false);
    const [openReport, setOpenReport] = useState<boolean>(false);
    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<{propery?: string, description?: string}[]>([]);
    const [fontTable, setfontTable] = useState(14); 

    const [producaoRegulagemResponse, setProducaoRegulagemResponse] = useState<IProducaoRegulagemResponse>();
    const [ocorrenciasParadaResponse, setOcorrenciasParadaResponse] = useState<IOcorrenciasParadaResponse>();
    const [isProducaoRegulagem, setIsProducaoRegulagem] = useState<boolean>(true);
    const [exibirParadas, setExibirParadas] = useState<boolean>(false);
    async function getProducaoRegulagem (value : any) {
       setCargaUtil(value);
       console.log(value)
        await ProducaoRegulagemServices( value)
        .then( (data) => {
            setProducaoRegulagemResponse(data);
        })
        setExibirPreloader(false);
        setOpenReport(true);
    }
    async function getOcorrenciasParada (value : any) {
        setCargaUtil(value);
        await OcorrenciasParadaServices( value)
        .then( (data) => {
            console.log(data)
            setOcorrenciasParadaResponse(data);
        })
        setExibirPreloader(false);
        setOpenReport(true);
    }

    const previewPDF = () => {
        return (
            <div className="export-content">
                <Header 
                    title={
                        isProducaoRegulagem ?
                        `${props.title} - POR ${descricao[4].description}` : 
                        "Ocorrências de paradas de regulagem (R025)"
                }

                    getTableDOM={(isDownload: boolean) =>
                        {
                            isProducaoRegulagem ?
                        getTableDinamicDOM(
                            descricao, // lista de descrição dinâmica
                            `${props.title} - POR ${descricao[4].description}`, // título da página
                            "landscape", // orientação da página
                            6, // tamanho da fonte
                            90, // margem de baixo da página
                            isDownload
                        ) :
                        getTableDinamicDOM(
                            descricao, // lista de descrição dinâmica
                            "Ocorrências de paradas de regulagem (R025)", // título da página
                            "portrait", // orientação da página
                            7, // tamanho da fonte
                            90, // margem de baixo da página
                            isDownload
                        )
                    
                    }
                    }
                    components={<> {descricao.map((i : any, index: number) => <p key={index}><strong>{i.propery}:</strong> {i.description}</p> )} </>}
                
                />
                <FontRange changed={(size : number) => setfontTable(size)} />
                <div className="table-content">
                    { isProducaoRegulagem ? <TableDinamic 
                        aux={
                            // verificar se é pra exibir paradas
                            exibirParadas ? 
                            headers.producao.producaoRegulagem.header.comParada
                            : headers.producao.producaoRegulagem.header.semParada
                        } 
                        headers={
                            // verificar se é pra exibir paradas
                            exibirParadas ? 
                            // com parada
                            cargaUtil?.isAgrupadoPorPt ?
                                headers.producao.producaoRegulagem.comParada.porPosto :
                            cargaUtil?.isAgrupadoPorFerramenta ?
                                headers.producao.producaoRegulagem.comParada.porFerramenta :
                            headers.producao.producaoRegulagem.comParada.porProduto
                            :
                            // sem parada
                            cargaUtil?.isAgrupadoPorPt ?
                                headers.producao.producaoRegulagem.semParada.porPosto :
                            cargaUtil?.isAgrupadoPorFerramenta ?
                                headers.producao.producaoRegulagem.semParada.porFerramenta :
                            headers.producao.producaoRegulagem.semParada.porProduto
                        } 
                        body={
                            <ProducaoEmRegulagemBody 
                                postos={producaoRegulagemResponse?.postosPeriodo}
                                isPosto={cargaUtil?.isAgrupadoPorPt}
                                isFerramenta={cargaUtil?.isAgrupadoPorFerramenta}
                                isProduto={cargaUtil?.isAgrupadoPorProduto}
                                exibirParadas={exibirParadas}
                            />}
                        fontTable={fontTable}
                    /> : 
                    <TableDinamic 
                        headers={headers.producao.ocorrenciaParadaRegulagem}
                        body={<OcorrenciaParadaRegulagemBody paradas={ocorrenciasParadaResponse?.paradas} />}
                        fontTable={fontTable}
                    /> }

                </div>
                {
                    isProducaoRegulagem ?
                    <TotalGeralProducaoRegulagem totais={producaoRegulagemResponse} exibirParadas={exibirParadas}/> :
                    <></>
                }

            </div>
        )
    }
    return (
        <div className="container-page">

            { exibirPreloader ? <Preloader /> : <></> }

            <h3 className="title-relatorio">{props.title}</h3>
            <AccordionDinamic
                title="Filtro"
                img={<FiFilter size={25}/>}
                component={
                    <Filtros 
                        getDescricao={(value: any ) => setDescricao(value)}
                        openPreview={(value: boolean) =>  setExibirPreloader(true) }
                        isProducaoRegulagem={(value: boolean, payload: Object, exibirParadas: boolean) => {
                            setExibirParadas(exibirParadas);
                            setOpenReport(false);
                            setIsProducaoRegulagem(value);
                            if(value){
                                getProducaoRegulagem(payload)
                            }else{
                                getOcorrenciasParada(payload)
                            }
                        }}
                        closeReport={(value: boolean) => setOpenReport(value) }
                    />
                }
            />
            { !openReport ? <></> : previewPDF()}
        </div>
    )   
}