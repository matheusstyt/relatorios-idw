import { ConsolidadosFerramentaBody, ConsolidadosPostoBody, ConsolidadosProdutoBody, Header, TableDinamic, TotalGeralConsolidados } from "../../../../components/reports/pdf";
import { IConsolidadosResponse } from "../../../../components/reports/interface/reports/producao/consolidados";
import { ConsolidadosServices } from "../../../../components/reports/services/reports/produtos";
import { getTableDinamicDOM } from "../../../../components/reports/pdf/DOM";
import headers from "../../../../components/reports/pdf/headers.json";
import { Preloader } from "../../../../components/reports/preloader";
import AccordionDinamic from "../../../../components/accordion";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import Filtros from "./filtros";
import "../../../pages.scss";

export default function Consolidados (props : any) {
    const [exibirPreloader, setExibirPreloader] = useState<boolean>(false);
    const [exibirExportar, setExibirExportar] = useState<boolean>(false);
    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<{propery?: string, description?: string}[]>([]);

    const [consolidadosResponse, setConsolidadosResponse] = useState<IConsolidadosResponse>();
    async function getConsolidados (value : any) {
        setCargaUtil(value);
        await ConsolidadosServices( value)
        .then( (data) => {
            setConsolidadosResponse(data);
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
                <div className="table-content">
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
                <TotalGeralConsolidados totais={consolidadosResponse} />
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
                            getConsolidados(value);
                        }
                        }
                        getDescricao={(value: any ) => setDescricao(value)}
                        openPreview={(value: boolean) =>  setExibirPreloader(true) }
                    />
                }
            />
            { !exibirExportar ? <></> : previewPDF()}
        </div>
    )   
}