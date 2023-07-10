import { IPlanejadoXRealizadoResponse } from "../../../../interface/reports/planejamento/planejadoxrealizado";
import { Header, PlanejadoXRealizadoBody, TableDinamic } from "../../../../components/reports/pdf";
import { PlanejadoXRealizadoServices } from "../../../../services/reports/planejamentos";
import { getTableDinamicDOM } from "../../../../components/reports/pdf/DOM";
import headers from "../../../../components/reports/pdf/headers.json";
import { Preloader } from "../../../../components/reports/preloader";
import AccordionDinamic from "../../../../components/accordion";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import Filtros from "./filtro";
import FontRange from "../../../../components/reports/fontRange";

const PlanejadoRealizado = (props : any) => {
    const [exibirPreloader, setExibirPreloader] = useState<boolean>(false);
    const [openReport, setOpenReport] = useState<boolean>(false);
    const [descricao, setDescricao] = useState<any>({});
    const [fontTable, setfontTable] = useState(14); 

    const [planejadoXRealizadoResponse, setPlanejadoXRealizadoResponse] = useState<IPlanejadoXRealizadoResponse>();

    async function getPlanejadoXRealizado (value : any) {
        await PlanejadoXRealizadoServices( value)
        .then( (data) => {
            setPlanejadoXRealizadoResponse(data);
        });
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
                            6, // tamanho da fonte
                            70, // margem de baixo da página
                            isDownload
                        ) }
                    }
                    components={<> {descricao.map((i : any, index: number) => <p key={index}><strong>{i.propery}:</strong> {i.description}</p> )} </>}
                />
                <FontRange changed={(size : number) => setfontTable(size)} />
                <div className="table-content">
                    {<TableDinamic 
                        headers={headers.planejamento.planejadoxrealizado} 
                        body={<PlanejadoXRealizadoBody itens={planejadoXRealizadoResponse?.itens} />}
                        fontTable={fontTable}
                    />}
                </div>
            </div>
        )
    }

    return(
        <div className="container-page">

            { exibirPreloader ? <Preloader /> : <></> }

            <h3 className="title-relatorio">{props.title}</h3>
            <AccordionDinamic
                title="Filtro"
                img={<FiFilter size={25}/>}
                component={
                    <Filtros 
                        getPayload={async (value: any ) => getPlanejadoXRealizado(value) }
                        getDescricao={(value: any ) => setDescricao(value) }
                        openPreview={(value: boolean) =>  setExibirPreloader(true) }
                        closeReport={(value: boolean) => setOpenReport(value) }
                    />
                }
            />
            { !openReport ? <></> : previewPDF()}
        </div>
    )
}
export default PlanejadoRealizado;