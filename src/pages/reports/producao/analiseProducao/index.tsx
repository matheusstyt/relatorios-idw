import { IAnaliseProducaoResponse } from "../../../../components/reports/interface/reports/producao/analiseProducao";
import { AnaliseProducaoServices } from "../../../../components/reports/services/reports/produtos";
import { AnaliseProducaoBody, Header, TableDinamic } from "../../../../components/reports/pdf";
import { getTableDinamicDOM } from "../../../../components/reports/pdf/DOM";
import headers from "../../../../components/reports/pdf/headers.json";
import { Preloader } from "../../../../components/reports/preloader";
import AccordionDinamic from "../../../../components/accordion";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import Filtros from "./filtros";
import "../../../pages.scss";

export default function AnaliseProducao (props : any) {
    const [exibirPreloader, setExibirPreloader] = useState<boolean>(false);
    const [exibirExportar, setExibirExportar] = useState<boolean>(false);
    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<{propery?: string, description?: string}[]>([]);

    const [analiseProducaoResponse, setAnaliseProducaoResponse] = useState<IAnaliseProducaoResponse>();
    async function getAnaliseProducao (value : any) {
        setCargaUtil(value);
        await AnaliseProducaoServices( value)
        .then((data) => {
            setAnaliseProducaoResponse(data);  
        })
        setExibirPreloader(false);
        setExibirExportar(true);
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
                            7, // tamanho da fonte
                            70, // margem de baixo da página
                            isDownload
                        ) }
                    }
                    components={<> {descricao?.map((i : any, index: number) => <p key={index}><strong>{i.propery}:</strong> {i.description}</p> )} </>}
                />
                <div className="table-content">
                    {<TableDinamic headers={headers.producao.analiseProducao} body={<AnaliseProducaoBody listaDTO={analiseProducaoResponse?.listaDTOs} />}/>}
                </div>
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
                        getPayload={(value: any ) => { getAnaliseProducao(value) }}
                        getDescricao={(value: any ) => setDescricao(value)}
                        openPreview={(value: boolean) =>  setExibirPreloader(true) }
                    />
                }
            />
            { !exibirExportar ? <></> : previewPDF()}
        </div>
    )   
}