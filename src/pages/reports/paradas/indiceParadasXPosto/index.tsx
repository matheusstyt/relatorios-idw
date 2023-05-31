import AccordionDinamic from "../../../../components/relatorios/accordion";
import { useState } from "react";
import Filtros from "./filtros";
import "../../../pages.scss";
export default function IndiceParadasXPosto () {

    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<any>({});

    return (
        <div className="container-page">
            <AccordionDinamic 
                title=" Índice de Parada por Posto (R029)"
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