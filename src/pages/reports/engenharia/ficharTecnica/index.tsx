import { IFichaTecnicaResponse } from "../../../../components/reports/interface/reports/engenharia/fichaTecnica";
import { FichaTecnicaServices } from "../../../../components/reports/services/reports/engenharia";
import { FichaTecnicaBody, Header, TableDinamic } from "../../../../components/reports/pdf";
import headers from "../../../../components/reports/pdf/headers.json";
import { Preloader } from "../../../../components/reports/preloader";
import AccordionDinamic from "../../../../components/accordion";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import Filtros from "./filtros";
import { getTableDinamicDOM } from "../../../../components/reports/pdf/DOM";


const FichaTecnica = (props: any) =>{
    const [exibirPreloader, setExibirPreloader] = useState<boolean>(false);
    const [exibirExportar, setExibirExportar] = useState<boolean>(false);
    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<{propery?: string, description?: string}[]>([]);

    const [fichaTecnicaResponse, setFichaTecnicaResponse] = useState<IFichaTecnicaResponse>();
    async function getfichaTecnica (value : any) {
        setCargaUtil(value);
        await FichaTecnicaServices( value)
        .then( (data: any) => {
            setFichaTecnicaResponse(data);
        })
        setExibirPreloader(false);
        setExibirExportar(true);
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
                            "portrait", // orientação da página
                            7, // tamanho da fonte
                            70, // margem de baixo da página
                            isDownload
                        ) }
                    }
                    components={<> {descricao.map((i : any) => <p><strong>{i.propery}:</strong> {i.description}</p> )} </>}
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
                        getPayload={async (value: any ) => {
                            getfichaTecnica(value);
                        }
                        }
                        getDescricao={(value: any ) => setDescricao(value)}
                        openPreview={(value: boolean) =>  setExibirPreloader(true) }
                    />
                }
            />
            <div className="export-content">
               { !exibirExportar ? <></> : previewPDF()}
            </div>
        </div>
    )
}
export default FichaTecnica;