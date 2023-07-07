import AccordionDinamic from "../../../../components/accordion";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import Filtros from "./filtros";
import "../../../pages.scss";
import { Header } from "../../../../components/reports/pdf";
export default function OcorrenciaParada (props : any) {
    const [exibirPreloader, setExibirPreloader] = useState<boolean>(false);
    const [openReport, setOpenReport] = useState<boolean>(false);
    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<any>({});

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
                        openPreview={() =>  setExibirPreloader(true) }
                        closeReport={(value: boolean) => setOpenReport(value) }
                    />
                }
            />
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

            </div>
        </div>
        
    )   
}