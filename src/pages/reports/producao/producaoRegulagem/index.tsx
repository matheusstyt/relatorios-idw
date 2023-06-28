import { ConsolidadosFerramentaBody, ConsolidadosPostoBody, ConsolidadosProdutoBody, Header, TableDinamic, TotalGeralConsolidados } from "../../../../components/reports/pdf";
import { IConsolidadosResponse } from "../../../../components/reports/interface/reports/producao/consolidados";
import { OcorrenciasParadaServices, ProducaoRegulagemServices } from "../../../../components/reports/services/reports/produtos";
import { getTableDinamicDOM } from "../../../../components/reports/pdf/DOM";
import headers from "../../../../components/reports/pdf/headers.json";
import { Preloader } from "../../../../components/reports/preloader";
import AccordionDinamic from "../../../../components/accordion";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import Filtros from "./filtros";
import "../../../pages.scss";
import { IOcorrenciasParadaResponse, IProducaoRegulagemResponse } from "../../../../components/reports/interface/reports/producao/producaoRegulagem";

export default function ProducaoRegulagem (props : any) {
    const [exibirPreloader, setExibirPreloader] = useState<boolean>(false);
    const [exibirExportar, setExibirExportar] = useState<boolean>(false);
    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<{propery?: string, description?: string}[]>([]);

    const [producaoRegulagemResponse, setProducaoRegulagemResponse] = useState<IProducaoRegulagemResponse>();
    const [ocorrenciasParadaResponse, setOcorrenciasParadaResponse] = useState<IOcorrenciasParadaResponse>();

    async function getProducaoRegulagem (value : any) {
        setCargaUtil(value);
        await ProducaoRegulagemServices( value)
        .then( (data) => {
            console.log(data)
            setProducaoRegulagemResponse(data);
        })
        setExibirPreloader(false);
        setExibirExportar(true);
    }
    async function getOcorrenciasParada (value : any) {
        setCargaUtil(value);
        await OcorrenciasParadaServices( value)
        .then( (data) => {
            console.log(data)
            setOcorrenciasParadaResponse(data);
        })
        setExibirPreloader(false);
        setExibirExportar(true);
    }

    const previewPDF = () => {
        return (
            <div className="export-content">
                <Header 
                    title={`${props.title} - POR ${descricao[4].description}`}

                    getTableDOM={(isDownload: boolean) =>{
                        getTableDinamicDOM(
                            descricao, // lista de descrição dinâmica
                            `${props.title} - POR ${descricao[4].description}`, // título da página
                            "landscape", // orientação da página
                            5, // tamanho da fonte
                            90, // margem de baixo da página
                            isDownload
                        ) }
                    }
                    components={<> {descricao.map((i : any) => <p><strong>{i.propery}:</strong> {i.description}</p> )} </>}
                
                />
                {/* <div className="table-content">
                    {
                        cargaUtil.isAgrupadoPorPt === true ? 
                        <TableDinamic headers={headers.producao.consolidadoPosto} body={<ConsolidadosPostoBody postos={consolidadosResponse?.postos} />}/>
                        : cargaUtil.isAgrupadoPorFerramenta === true ?
                        <TableDinamic headers={headers.producao.consolidadoFerramenta} body={<ConsolidadosFerramentaBody ferramentas={consolidadosResponse?.ferramentas} />}/>
                        : cargaUtil.isAgrupadoPorProduto === true ?
                        <TableDinamic headers={headers.producao.consolidadoProduto} body={<ConsolidadosProdutoBody produtos={consolidadosResponse?.produtos} />}/>
                        : <></>
                    }
                </div>
                <TotalGeralConsolidados totais={producaoRegulagemResponse} /> */}
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
                        getPayload={async (value: any ) => {
                            setCargaUtil(value);
                        }
                        }
                        getDescricao={(value: any ) => setDescricao(value)}
                        openPreview={(value: boolean) =>  setExibirPreloader(true) }
                        isProducaoRegulagem={(value: boolean) => {
                            if(value){
                                getProducaoRegulagem(value)
                            }else{
                                getOcorrenciasParada(value)
                            }
                        }}
                    />
                }
            />
            { !exibirExportar ? <></> : previewPDF()}
        </div>
    )   
}