import { Header, IndiceParadaXPostoBody, IndiceParadasFerramentaBody, IndiceParadasPadraoBody, IndiceParadasProdutoBody, TableDinamic, TotalGeralIndiceParadaXPosto } from "../../../../components/relatorios/export";
import { IIndiceParadaResponse } from "../../../../components/relatorios/filtros/interface/reports/paradas/indiceParadas";
import { IndiceParadaServices } from "../../../../components/relatorios/export/services/paradas";
import getTableDinamicDOM from "../../../../components/relatorios/export/script";
import headers from "../../../../components/relatorios/export/headers.json";
import AccordionDinamic from "../../../../components/relatorios/accordion";
import { useState } from "react";
import Filtros from "./filtros";
import { FiFilter } from "react-icons/fi";
import { Button } from "@mui/material";
import "../../../pages.scss";
export default function IndiceParadas (props : any) {
    const [exibirPreloader, setExibirPreloader] = useState<boolean>(false);
    const [exibirExportar, setExibirExportar] = useState<boolean>(false);
    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<Object[]>([]);

    const [listaIndiceParada, setListIndiceParada] = useState<IIndiceParadaResponse>();
    async function getIndiceParadas (value : any) {
        setCargaUtil(value);
        await IndiceParadaServices( value)
        .then( (data) => {
            setListIndiceParada(data)            
        })
        setExibirPreloader(false);
        setExibirExportar(true);
    }
    const previewPDF = () => {
        console.log(listaIndiceParada)
        return (
            <div className="export-content">
                <Header 
                    title={props.title}
                    components={<> {descricao.map((i : any) => <p><strong>{i.propery}:</strong> {i.description}</p> )} </>}
                />
                <div className="table-content">
                    {
                        cargaUtil.isAgrupamentoPadrao ?
                        <TableDinamic headers={headers.paradas.indiceParadasPadrao} body={<IndiceParadasPadraoBody className="indiceparadaxposto" paradas={listaIndiceParada?.indiceParadasDTO} />} />
                        :cargaUtil.isAgrupadoPorProduto ?
                        <TableDinamic headers={headers.paradas.indiceParadasProduto} body={<IndiceParadasProdutoBody className="indiceparadaxposto" paradas={listaIndiceParada?.indiceParadasDTO} />} />
                        :cargaUtil.isAgrupadoPorFerramenta ?
                        <TableDinamic headers={headers.paradas.indiceParadasFerramenta} body={<IndiceParadasFerramentaBody className="indiceparadaxposto" paradas={listaIndiceParada?.indiceParadasDTO} />} />
                        : <></>
                    }
                </div>
                <h2>Total Geral</h2>
                <Button variant="contained" onClick={() => { getTableDinamicDOM(descricao, props.title, "portrait", 10, 90) }}>GERAR PDF</Button>

            </div>
        )
    }

    return (
        <div className="container-page">
            <h3 className="title-relatorio">{props.title}</h3>
            <AccordionDinamic
                title="Filtro"
                img={<FiFilter size={25}/>}
                component={
                    <Filtros 
                        getPayload={(value: any ) => getIndiceParadas(value)}
                        getDescricao={(value: any ) => setDescricao(value)}
                        openPreview={(value: boolean) =>  setExibirPreloader(true) }
                    />
                }
            />

            <div className="export-content">
                { previewPDF()}
            </div>
        </div>
    )   
}