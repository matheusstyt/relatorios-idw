import AccordionDinamic from "../../../../components/relatorios/accordion";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import { ConsolidadosBody, Header, TableDinamic } from "../../export";
import Filtros from "./filtros";
import "../../../pages.scss";
import { ConsolidadosServices } from "../../export/services/paradas";
import { IConsolidadosResponse, IPosto } from "../../export/interface/consolidados";
export default function Consolidados (props : any) {

    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<any>({});

    const [listaConsolidado, setListaConsolidado] = useState<IPosto[]>([]);

    async function getIndiceRelatorioPosto (value : any) {
        setCargaUtil(value);
        await ConsolidadosServices( value)
        .then( (data) => {
            setListaConsolidado(data?.postos);
            
        })
        // setExibirPreloader(false);
        // setExibirExportar(true);
    }

    const previewPDF = () => {
        return (
            <div className="export-content">
                <Header 
                    title={props.title}
                    components={
                        <>
                            <p>GRUPO DE TRABALHO: {descricao.grupoTrabalho}</p>
                            <p>TURNO: {descricao.turno}</p>
                            <p>PERÍODO: {descricao.periodo}</p>
                        </>
                    }
                />
                <div className="table-content">
                    <TableDinamic body={<ConsolidadosBody postos={listaConsolidado} />}/>
                </div>
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
                        getPayload={(value: any ) => {
                            console.log(value)
                            setCargaUtil(value);
                            getIndiceRelatorioPosto(value);
                        }

                        }
                        getDescricao={(value: any ) => setDescricao(value)}
                    />
                }
            />
            <div className="export-content">
                {previewPDF()}

            </div>
        </div>
    )   
}