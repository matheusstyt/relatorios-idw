import { FiFilter } from "react-icons/fi";
import AccordionDinamic from "../../../../components/relatorios/accordion";
import Filtros from "./filtro";
import { useState } from "react";
import { PlanejadoXRealizadoServices } from "../../export/services/planejamentos";
import { IPlanejadoXRealizadoResponse } from "../../export/interface/planejadoxrealizado";

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
        </div>
    )
}
export default PlanejadoRealizado;