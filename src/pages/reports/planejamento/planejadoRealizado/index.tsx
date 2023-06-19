import { FiFilter } from "react-icons/fi";
import AccordionDinamic from "../../../../components/relatorios/accordion";
import Filtros from "./filtro";
import { useState } from "react";
import headers from "../../../../components/relatorios/export/headers.json";
import { Button } from "@mui/material";
import { Preloader } from "../../../../components/relatorios/preloader";
import { PlanejadoXRealizadoServices } from "../../../../components/relatorios/export/services/planejamentos";
import { Header, PlanejadoXRealizadoBody, TableDinamic } from "../../../../components/relatorios/export";
import getTableDinamicDOM from "../../../../components/relatorios/export/script";
import { IPlanejadoXRealizadoResponse } from "../../../../components/relatorios/export/interface/planejadoxrealizado";

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
                 //   components={<> {descricao.map((i : any) => <p><strong>{i.propery}:</strong> {i.description}</p> )} </>}
                />
                <div className="table-content">
                    {<TableDinamic 
                        headers={headers.planejamento.planejadoxrealizado} 
                        body={<PlanejadoXRealizadoBody itens={planejadoXRealizadoResponse?.itens} 
                    />}/>}
                </div>
                <Button variant="contained" onClick={() => { getTableDinamicDOM(descricao, props.title, "landscape", 6) }}>GERAR PDF</Button>

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