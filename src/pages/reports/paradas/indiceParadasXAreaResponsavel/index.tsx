import AccordionDinamic from "../../../../components/relatorios/accordion";
import { useState } from "react";
import Filtros from "./filtros";
import "../../../pages.scss";
export default function IndiceParadasXAreResponsavel () {

    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<any>({});

    return (
        <div className="container-page">
            <AccordionDinamic 
                title="Índices de Paradas Por Área Responsável (R028)"
                component={
                    <Filtros 
                        getPayload={(value: any ) => setCargaUtil(value)}
                        getDescricao={(value: any ) => setDescricao(value)}
                    />
                }
            />
        </div>
    )   
}