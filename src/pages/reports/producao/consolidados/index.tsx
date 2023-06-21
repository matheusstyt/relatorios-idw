import AccordionDinamic from "../../../../components/relatorios/accordion";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import { ConsolidadosFerramentaBody, ConsolidadosPostoBody, ConsolidadosProdutoBody, Header, TableDinamic, TotalGeralConsolidados } from "../../../../components/relatorios/export";
import Filtros from "./filtros";
import "../../../pages.scss";
import headers from "../../../../components/relatorios/export/headers.json";
import { Preloader } from "../../../../components/relatorios/preloader";
import { Button } from "@mui/material";
import getTableDinamicDOM from "../../../../components/relatorios/export/script";
import { IConsolidadosResponse } from "../../../../components/relatorios/filtros/interface/reports/producao/consolidados";
import { ConsolidadosServices } from "../../../../components/relatorios/export/services/produtos";
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
                    components={<> {descricao.map((i : any) => <p><strong>{i.propery}:</strong> {i.description}</p> )} </>}
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
                <Button variant="contained" onClick={() => { getTableDinamicDOM(descricao, `${props.title} - POR ${descricao[4].description}`, "landscape", 5, 100) }}>GERAR PDF</Button>

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