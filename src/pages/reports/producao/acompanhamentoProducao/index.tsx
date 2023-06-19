import AccordionDinamic from "../../../../components/relatorios/accordion";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import { Header } from "../../../../components/relatorios/export";
import Filtros from "./filtros";
import "../../../pages.scss";
export default function AcompanhamentoProducao (props : any) {

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
                    />
                }
            />

            <div className="export-content">
                <Header 
                    title={props.title}
                    components={
                        <>
                            <p>{descricao.grupoTrabalho}</p>
                            <p>PERÍODO: {descricao.periodo}</p>
                        </>
                    }
                />

            </div>
        </div>
    )   
}