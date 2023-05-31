import AccordionDinamic from "../../../../components/relatorios/accordion";
import { useState } from "react";
import Filtros from "./filtros";
import "../../../pages.scss";
export default function QuantidadeParadas () {

    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<any>({});

    return (
        <div className="container-page">
            <AccordionDinamic 
                title="Quantidade de Paradas (R033)"
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