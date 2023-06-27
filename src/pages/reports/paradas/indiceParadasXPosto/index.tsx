import AccordionDinamic from "../../../../components/relatorios/accordion";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import Filtros from "./filtros";
import "../../../pages.scss";
import headers from "../../../../components/relatorios/export/headers.json";

import { Header, IndiceParadaXPostoBody, TableDinamic, TotalGeralIndiceParadaXPosto } from "../../../../components/relatorios/export";
import { IIndiceParadaPostoResponse } from '../../../../components/relatorios/filtros/interface/reports/paradas/indiceParadasXPosto';
import { Preloader } from "../../../../components/relatorios/preloader";
import { Button } from "@mui/material";
import { IndiceParadaXPostoServices } from "../../../../components/relatorios/export/services/paradas";
import {getTableDinamicDOM} from "../../../../components/relatorios/export/script";
export default function IndiceParadasXPosto (props : any) {
    const [exibirPreloader, setExibirPreloader] = useState<boolean>(false);
    const [exibirExportar, setExibirExportar] = useState<boolean>(false);
    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<any>({});
    
    const [listaIndiceParadaPosto, setListIndiceParadaPosto] = useState<IIndiceParadaPostoResponse>();
    async function getIndiceRelatorioPosto (value : any) {
        setCargaUtil(value);
        await IndiceParadaXPostoServices( value)
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
                    components={<> {descricao.map((i : any) => <p><strong>{i.propery}:</strong> {i.description}</p> )} </>}
                />
                <div className="table-content">
                    <TableDinamic headers={headers.paradas.indiceParadasPosto} body={<IndiceParadaXPostoBody className="indiceparadaxposto" parada={listaIndiceParadaPosto} />} />
                </div>
                <h2>Total Geral</h2>
                <TotalGeralIndiceParadaXPosto dados={listaIndiceParadaPosto} />
                <Button variant="contained" onClick={() => { getTableDinamicDOM(descricao, props.title, "portrait", 10, 90) }}>GERAR PDF</Button>

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