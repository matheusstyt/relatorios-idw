import { Header, IndiceParadaXPostoBody, TableDinamic, TotalGeralIndiceParadaXPosto } from "../../../../components/reports/pdf";
import { IIndiceParadaPostoResponse } from "../../../../interface/reports/paradas/indiceParadasXPosto";
import { IndiceParadaXPostoServices } from "../../../../services/reports/paradas";
import { getTableDinamicDOM } from "../../../../components/reports/pdf/DOM";
import headers from "../../../../components/reports/pdf/headers.json";
import { Preloader } from "../../../../components/reports/preloader";
import AccordionDinamic from "../../../../components/accordion";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import Filtros from "./filtros";
import "../../../pages.scss";


export default function IndiceParadasXPosto (props : any) {
    const [exibirPreloader, setExibirPreloader] = useState<boolean>(false);
    const [openReport, setOpenReport] = useState<boolean>(false);
    const [descricao, setDescricao] = useState<any>({});
    
    const [listaIndiceParadaPosto, setListIndiceParadaPosto] = useState<IIndiceParadaPostoResponse>();
    async function getIndiceRelatorioPosto (value : any) {
        await IndiceParadaXPostoServices( value)
        .then( (data) => {
            setListIndiceParadaPosto(data)            
        })
        setExibirPreloader(false);
        setOpenReport(true);
    }
    
    const previewPDF = () => {
        return (
            <div className="export-content">
                <Header 
                    title={props.title}
                    getTableDOM={(isDownload: boolean) =>{
                        getTableDinamicDOM(
                            descricao, // lista de descrição dinâmica
                            `${props.title}`, // título da página
                            "landscape", // orientação da página
                            8, // tamanho da fonte
                            90, // margem de baixo da página
                            isDownload
                        ) }
                    }
                    components={<> {descricao.map((i : any, index: number) => <p key={index}><strong>{i.propery}:</strong> {i.description}</p> )} </>}
                />
                <div className="table-content">
                    <TableDinamic headers={headers.paradas.indiceParadasPosto} body={<IndiceParadaXPostoBody className="indiceparadaxposto" parada={listaIndiceParadaPosto} />} />
                </div>
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
                        getPayload={async (value: any ) => getIndiceRelatorioPosto(value) }
                        getDescricao={async (value: any ) => await setDescricao(value) }
                        openPreview={(value: boolean) =>  setExibirPreloader(true) }
                        closeReport={(value: boolean) => setOpenReport(value) }
                    />
                }
            />
            { !openReport ? <></> : previewPDF() }
        </div>       
    )   
}