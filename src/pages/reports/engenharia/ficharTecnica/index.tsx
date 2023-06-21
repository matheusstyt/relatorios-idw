import { useState } from "react";
import { IFichaTecnicaResponse } from "../../../../components/relatorios/filtros/interface/reports/engenharia/fichaTecnica";
import { FichaTecnicaServices } from "../../../../components/relatorios/export/services/engenharia";
import { Preloader } from "../../../../components/relatorios/preloader";
import AccordionDinamic from "../../../../components/relatorios/accordion";
import { FiFilter } from "react-icons/fi";
import Filtros from "./filtros";
import headers from "../../../../components/relatorios/export/headers.json";
import { FichaTecnicaBody, Header, TableDinamic } from "../../../../components/relatorios/export";
import { Button } from "@mui/material";
import getTableDinamicDOM from "../../../../components/relatorios/export/script";

const FichaTecnica = (props: any) =>{
    const [exibirPreloader, setExibirPreloader] = useState<boolean>(false);
    const [exibirExportar, setExibirExportar] = useState<boolean>(false);
    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<{propery?: string, description?: string}[]>([]);

    const [fichaTecnicaResponse, setFichaTecnicaResponse] = useState<IFichaTecnicaResponse>();
    async function getfichaTecnica (value : any) {
        setCargaUtil(value);
        await FichaTecnicaServices( value)
        .then( (data) => {
            console.log(data)
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
                    components={<> {descricao.map((i : any) => <p><strong>{i.propery}:</strong> {i.description}</p> )} </>}
                />
                <div className="table-content">
                    {<TableDinamic headers={headers.engenharia.fichatecnica} body={<FichaTecnicaBody itens={fichaTecnicaResponse?.itens} />}/>}
                </div>
                <Button variant="contained" onClick={() => { getTableDinamicDOM(descricao, `${props.title}`, "landscape", 11, 80) }}>GERAR PDF</Button>

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