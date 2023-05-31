import AccordionDinamic from "../../../../components/relatorios/accordion";
import { useState } from "react";
import Filtros from "./filtros";
import "../../../pages.scss";
export default function IndiceParadas () {

    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<any>({});

    return (
        <div className="container-page">
            <AccordionDinamic 
                title="Índices de Paradas (R027)"
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