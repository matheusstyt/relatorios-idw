import AccordionDinamic from "../../../../components/relatorios/accordion";
import { FiFilter } from "react-icons/fi";
import { AnaliseProducaoBody, Header, TableDinamic } from "../../../../components/relatorios/export";
import { useState } from "react";
import Filtros from "./filtros";
import "../../../pages.scss";
import headers from "../../../../components/relatorios/export/headers.json";
import { IAnaliseProducaoResponse } from "../../../../components/relatorios/filtros/interface/reports/producao/analiseProducao";
import { AnaliseProducaoServices } from "../../../../components/relatorios/export/services/produtos";
import { Button } from "@mui/material";
import getTableDinamicDOM from "../../../../components/relatorios/export/script";
export default function AnaliseProducao (props : any) {
    const [exibirPreloader, setExibirPreloader] = useState<boolean>(false);
    const [exibirExportar, setExibirExportar] = useState<boolean>(false);
    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<{propery?: string, description?: string}[]>([]);

    const [analiseProducaoResponse, setAnaliseProducaoResponse] = useState<IAnaliseProducaoResponse>();
    async function getAnaliseProducao (value : any) {
        setCargaUtil(value);
        await AnaliseProducaoServices( value)
        .then((data) => {
            setAnaliseProducaoResponse(data);  
        })
        setExibirPreloader(false);
        setExibirExportar(true);
    }
    return (
        <div className="container-page">
            <h3 className="title-relatorio">{props.title}</h3>
            <AccordionDinamic
                title="Filtro"
                img={<FiFilter size={25}/>}
                component={
                    <Filtros 
                        getPayload={(value: any ) => { getAnaliseProducao(value) }}
                        getDescricao={(value: any ) => setDescricao(value)}
                        openPreview={(value: boolean) =>  setExibirPreloader(true) }
                    />
                }
            />
            <div className="export-content">
                <Header 
                    title={props.title}
                    components={<> {descricao?.map((i : any) => <p><strong>{i.propery}:</strong> {i.description}</p> )} </>}
                />
                <div className="table-content">
                    {<TableDinamic headers={headers.producao.analiseProducao} body={<AnaliseProducaoBody listaDTO={analiseProducaoResponse?.listaDTOs} />}/>}
                </div>
                    <Button variant="contained" onClick={() => { getTableDinamicDOM(descricao, `${props.title}`, "landscape", 7, 70) }}>GERAR PDF</Button>
            </div>
        </div>
    )   
}