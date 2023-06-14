import { FiFilter } from "react-icons/fi";
import AccordionDinamic from "../../../../components/relatorios/accordion";
import Filtros from "./filtro";
import { useState } from "react";
import { PlanejadoXRealizadoServices } from "../../export/services/planejamentos";
import { IPlanejadoXRealizadoResponse } from "../../export/interface/planejadoxrealizado";
import { Header, PlanejadoXRealizadoBody, TableDinamic } from "../../export";
import headers from "../../export/headers.json";

const PlanejadoRealizado = (props : any) => {
    const [exibirPreloader, setExibirPreloader] = useState<boolean>(false);
    const [exibirExportar, setExibirExportar] = useState<boolean>(false);
    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<any>({});
    
    const [planejadoXRealizadoResponse, setPlanejadoXRealizadoResponse] = useState<IPlanejadoXRealizadoResponse>();

    async function getPlanejadoXRealizado (value : any) {
        setCargaUtil(value);
        await PlanejadoXRealizadoServices( value)
        .then( (data) => {
            console.log(data)
            setPlanejadoXRealizadoResponse(data);
            
        })
        setExibirPreloader(false);
        setExibirExportar(true);
    }

    const previewPDF = () => {
        return (
            <div className="export-content">
                <Header 
                    title={props.title}
                    components={
                        <>
                            <p><strong>PRODUÇÃO EM: </strong> {descricao.producao}</p>
                            <p><strong>GRUPO DE TRABALHO:: </strong> {descricao.grupoTrabalho}</p>
                            <p><strong>PERÍODO: </strong> {descricao.periodo}</p>
                        </>
                    }
                />
                <div className="table-content">
                    {<TableDinamic 
                        headers={headers.planejamento.planejadoxrealizado} 
                        body={<PlanejadoXRealizadoBody itens={planejadoXRealizadoResponse?.itens} 
                    />}/>}
                </div>
            </div>
        )
    }

    return(
        <div className="container-page">
            <h3 className="title-relatorio">{props.title}</h3>
            <AccordionDinamic
                title="Filtro"
                img={<FiFilter size={25}/>}
                component={
                    <Filtros 
                        getPayload={async (value: any ) => {
                            getPlanejadoXRealizado(value);
                        }

                        }
                        getDescricao={(value: any ) => setDescricao(value)}
                        openPreview={(value: boolean) =>  setExibirPreloader(true) }
                    />
                }
            />
            {
                previewPDF()
            }
        </div>
    )
}
export default PlanejadoRealizado;