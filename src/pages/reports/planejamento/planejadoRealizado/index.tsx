import { IPlanejadoXRealizadoResponse } from "../../../../components/reports/interface/reports/planejamento/planejadoxrealizado";
import { PlanejadoXRealizadoServices } from "../../../../components/reports/services/reports/planejamentos";
import { Header, PlanejadoXRealizadoBody, TableDinamic } from "../../../../components/reports/pdf";
import headers from "../../../../components/reports/pdf/headers.json";
import { Preloader } from "../../../../components/reports/preloader";
import AccordionDinamic from "../../../../components/accordion";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import Filtros from "./filtro";
import { getTableDinamicDOM } from "../../../../components/reports/pdf/DOM";

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
        });
        setExibirPreloader(false);
        setExibirExportar(true);
    }

    const previewPDF = () => {
        return (
            <div className="export-content">
                <Header 
                    title={props.title}
                    getTableDOM={(isDownload: boolean) =>{
                        getTableDinamicDOM(
                            descricao, // lista de descrição dinâmica
                            `${props.title}`, // título da página
                            "landscape", // orientação da página
                            6, // tamanho da fonte
                            70, // margem de baixo da página
                            isDownload
                        ) }
                    }
                    components={<> {descricao.map((i : any) => <p><strong>{i.propery}:</strong> {i.description}</p> )} </>}
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

            { exibirPreloader ? <Preloader /> : <></> }

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
            <div className="export-content">
                { !exibirExportar ? <></> : previewPDF()}
            </div>
        </div>
    )
}
export default PlanejadoRealizado;