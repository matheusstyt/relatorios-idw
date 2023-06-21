import AccordionDinamic from "../../../../components/relatorios/accordion";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import { Header, TableDinamic } from "../../../../components/relatorios/export";
import headers from "../../../../components/relatorios/export/headers.json";
import Filtros from "./filtros";
import "../../../pages.scss";
import { AcompanhamentoProducaoServices } from "../../../../components/relatorios/export/services/produtos";
import { IAcompanhamentoPrroducaoResponse } from "../../../../components/relatorios/filtros/interface/reports/producao/acompanhamentoProducao";
export default function AcompanhamentoProducao (props : any) {
    const [exibirPreloader, setExibirPreloader] = useState<boolean>(false);
    const [exibirExportar, setExibirExportar] = useState<boolean>(false);
    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<Object[]>([]);

    const [analiseProducaoResponse, setAnaliseProducaoResponse] = useState<IAcompanhamentoPrroducaoResponse>();
    async function getAcompanhamentoProducao (value : any) {
        setCargaUtil(value);
        await AcompanhamentoProducaoServices( value)
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
                        getPayload={(value: any ) => setCargaUtil(value)}
                        getDescricao={(value: any ) => setDescricao(value)}
                    />
                }
            />

            <div className="export-content">
                <Header 
                    title={props.title}
                    components={<> {descricao.map((i : any) => <p><strong>{i.propery}:</strong> {i.description}</p> )} </>}
                />
                <div className="table-content">
                    {<TableDinamic headers={headers.producao.analiseProducao} body={<AcompanhamentoProducao lista={analiseProducaoResponse?.listaAcompanhamentoProducaoDTO} />}/>}
                </div>

            </div>
        </div>
    )   
}