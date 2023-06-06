import AccordionDinamic from "../../../../components/relatorios/accordion";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import Filtros from "./filtros";
import "../../../pages.scss";
import { Header, TotalGeralIndiceParadaXPosto } from "../../export";
import { MainTable } from '../../export/index';
import { IIndiceParadaPostoResponse } from '../../../../components/relatorios/filtros/interface/indiceParadasXPosto';
import { IndiceParadaPostoServices } from "../../export/services/paradas";
import { Audio, Blocks, ProgressBar } from 'react-loader-spinner';
import { Preloader } from "../../../../components/relatorios/preloader";
export default function IndiceParadasXPosto (props : any) {
    const [exibirPreloader, setExibirPreloader] = useState<boolean>(false);
    const [exibirExportar, setExibirExportar] = useState<boolean>(false);
    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<any>({});
    
    const [listaIndiceParadaPosto, setListIndiceParadaPosto] = useState<IIndiceParadaPostoResponse[]>([]);
    async function getIndiceRelatorioPosto (value : any) {
        setCargaUtil(value);
        await IndiceParadaPostoServices( value)
        .then( (data) => {
            setListIndiceParadaPosto(data)
            
        })
        setExibirPreloader(false);
        setExibirExportar(true);
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
                <h2>Total Geral</h2>
                <TotalGeralIndiceParadaXPosto dados={listaIndiceParadaPosto} />
            </div>
        )
    }

    return (
        <div className="container-page">

             { exibirPreloader ? <Preloader /> : <></> }

            <h3 className="title-relatorio">{props.title}</h3>
            <AccordionDinamic
                title="Filtro"
                img={<FiFilter size={25}/>}
                component={
                    <Filtros 
                        getPayload={async (value: any ) => {
                            getIndiceRelatorioPosto(value);
                        }}
                        getDescricao={async (value: any ) => await setDescricao(value) }
                        openPreview={(value: boolean) =>  setExibirPreloader(true) }
                    />
                }
            />
            { !exibirExportar ? <></> : previewPDF() }
        </div>       
    )   
}