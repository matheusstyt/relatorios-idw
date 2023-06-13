import AccordionDinamic from "../../../../components/relatorios/accordion";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import { ConsolidadosFerramentaBody, ConsolidadosPostoBody, ConsolidadosProdutoBody, Header, TableDinamic, TotalGeralConsolidados } from "../../export";
import Filtros from "./filtros";
import "../../../pages.scss";
import headers from "../../export/headers.json";
import { ConsolidadosServices } from "../../export/services/paradas";
import { IConsolidadosResponse, IPosto } from "../../export/interface/consolidados";
import { Preloader } from "../../../../components/relatorios/preloader";
export default function Consolidados (props : any) {
    const [exibirPreloader, setExibirPreloader] = useState<boolean>(false);
    const [exibirExportar, setExibirExportar] = useState<boolean>(false);
    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<any>({});

    const [consolidadosResponse, setConsoldidadosResponse] = useState<IConsolidadosResponse>();
    async function getConsolidados (value : any) {
        setCargaUtil(value);
        await ConsolidadosServices( value)
        .then( (data) => {
            setConsoldidadosResponse(data);
            
        })
        setExibirPreloader(false);
        setExibirExportar(true);
    }

    const previewPDF = () => {
        return (
            <div className="export-content">
                <Header 
                    title={`${props.title} - POR ${descricao.agrupamento}`}
                    components={
                        <>
                            <p><strong>PRODUÇÃO EM: </strong> {descricao.producao}</p>
                            <p><strong>GRUPO DE TRABALHO:: </strong> {descricao.grupoTrabalho}</p>
                            <p><strong>TURNO: </strong> {descricao.turno}</p>
                            <p><strong>PERÍODO: </strong> {descricao.periodo}</p>
                            <p><strong>OP: </strong> {descricao.OP}</p>
                        </>
                    }
                />
                <div className="table-content">
                    {
                        cargaUtil.isAgrupadoPorPt === true ? 
                        <TableDinamic headers={headers.producao.consolidadoPosto} body={<ConsolidadosPostoBody postos={consolidadosResponse?.postos} />}/>
                        : cargaUtil.isAgrupadoPorFerramenta == true ?
                        <TableDinamic headers={headers.producao.consolidadoFerramenta} body={<ConsolidadosFerramentaBody ferramentas={consolidadosResponse?.ferramentas} />}/>
                        : cargaUtil.isAgrupadoPorProduto == true ?
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
            <div className="export-content">
                { !exibirExportar ? <></> : previewPDF()}

            </div>
        </div>
    )   
}