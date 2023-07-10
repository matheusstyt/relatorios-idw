import { FichaTecnicaBody, Header, TableDinamic } from "../../../../components/reports/pdf";
import { IFichaTecnicaResponse } from "../../../../interface/reports/engenharia/fichaTecnica";
import { FichaTecnicaServices } from "../../../../services/reports/engenharia";
import { getTableDinamicDOM } from "../../../../components/reports/pdf/DOM";
import headers from "../../../../components/reports/pdf/headers.json";
import { Preloader } from "../../../../components/reports/preloader";
import AccordionDinamic from "../../../../components/accordion";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import Filtros from "./filtros";


const FichaTecnica = (props: any) =>{
    const [exibirPreloader, setExibirPreloader] = useState<boolean>(false);
    const [openReport, setOpenReport] = useState<boolean>(false);
    const [descricao, setDescricao] = useState<{propery?: string, description?: string}[]>([]);

    const [fichaTecnicaResponse, setFichaTecnicaResponse] = useState<IFichaTecnicaResponse>();
    async function getfichaTecnica (value : any) {
        await FichaTecnicaServices( value)
        .then( (data: any) => {
            setFichaTecnicaResponse(data);
        })
        setExibirPreloader(false);
        setOpenReport(true);
    }
    const previewPDF = () => {
        return (
            <div className="export-content">
                <Header 
                    title={`${props.title}`}
                    getTableDOM={(isDownload: boolean) =>{
                        getTableDinamicDOM(
                            descricao, // lista de descrição dinâmica
                            `${props.title}`, // título da página
                            "landscape", // orientação da página
                            9, // tamanho da fonte
                            70, // margem de baixo da página
                            isDownload
                        ) }
                    }
                    components={<> {descricao.map((i : any, index: number) => <p key={index}><strong>{i.propery}:</strong> {i.description}</p> )} </>}
                />
                <div className="table-content">
                    {<TableDinamic headers={headers.engenharia.fichatecnica} body={<FichaTecnicaBody itens={fichaTecnicaResponse?.itens} />}/>}
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
                        getPayload={async (value: any ) => getfichaTecnica(value) }
                        getDescricao={(value: any ) => setDescricao(value)}
                        openPreview={(value: boolean) =>  setExibirPreloader(true) }
                        closeReport={(value: boolean) => setOpenReport(value) }
                    />
                }
            />
            { !openReport ? <></> : previewPDF()}
        </div>
    )
}
export default FichaTecnica;