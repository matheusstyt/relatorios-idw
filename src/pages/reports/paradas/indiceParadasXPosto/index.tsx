import AccordionDinamic from "../../../../components/relatorios/accordion";
import { FiFilter } from "react-icons/fi";
import { useEffect, useState } from "react";
import Filtros from "./filtros";
import "../../../pages.scss";
import { Header, TotalGeralIndiceParadaXPosto } from "../../export";
import { MainTable } from '../../export/index';
import { Button } from "@mui/material";
import { IIndiceParadaPostoResponse } from '../../../../components/relatorios/filtros/interface/indiceParadasXPosto';
import { IndiceParadaPostoServices } from "../../export/services/paradas";
export default function IndiceParadasXPosto (props : any) {
    
    const [exibirExportar, setExibirExportar] = useState<boolean>(false);
    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<any>({});
    
    const [listaIndiceParadaPosto, setListIndiceParadaPosto] = useState<IIndiceParadaPostoResponse[]>([]);
    const getIndiceRelatorioPosto = async () => {
        await IndiceParadaPostoServices(cargaUtil)
        .then( (data) => {
            setListIndiceParadaPosto(data)
        })
    }

    const previewPDF = () => {
        return (
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
            
                <MainTable dados={listaIndiceParadaPosto}/>
                <TotalGeralIndiceParadaXPosto dados={listaIndiceParadaPosto} />

                {/* <Button onClick={getIndiceRelatorioPosto} >EXPORTAR PDF</Button> */}
            </div>
        )
    }

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
                        openPreview={(value: boolean) => {
                            getIndiceRelatorioPosto();
                            setExibirExportar(value)}
                        }
                    />
                }
            />
            { !exibirExportar ? <></> : previewPDF() }
        </div>       
    )   
}