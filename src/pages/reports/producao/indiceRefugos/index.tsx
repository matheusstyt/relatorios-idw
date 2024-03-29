import { Header, IndiceRefugoPostoBody, IndiceRefugoProdutoBody, IndiceRefugoRefugoBody, TableDinamic, TotalGeralIndiceRefugo } from "../../../../components/reports/pdf";
import { IIndiceRefugoResponse } from "../../../../interface/reports/producao/indiceRefugos";
import mocks from "../../../../interface/reports/producao/indiceRefugoMocks.json";
import { getTableDinamicDOM } from "../../../../components/reports/pdf/DOM";
import headers from "../../../../components/reports/pdf/headers.json";
import { Preloader } from "../../../../components/reports/preloader";
import AccordionDinamic from "../../../../components/accordion";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import Filtros from "./filtros";
import "../../../pages.scss";
import FontRange from "../../../../components/reports/fontRange";
import { IndiceRefugosServices } from "../../../../services/reports/produtos";

export default function IndiceRefugos (props : any) {
    const [exibirPreloader, setExibirPreloader] = useState<boolean>(false);
    const [openReport, setOpenReport] = useState<boolean>(false);
    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<{propery?: string, description?: string}[]>([]);
    const [fontTable, setfontTable] = useState(14); 
    const [indiceRefugosResponse, setIndiceRefugosResponse] = useState<IIndiceRefugoResponse>();

    async function getIndiceRefugo (value : any) {
       setCargaUtil(value);
        await IndiceRefugosServices( value)
        .then( (data) => {
            console.log(data)
            setIndiceRefugosResponse(data);
        })

        setOpenReport(true);
        setExibirPreloader(false);
    }

    const previewPDF = () => {
        return (
            <div className="export-content">
                <Header 
                    title={`${props.title} - POR ${descricao[4].description}`}

                    getTableDOM={(isDownload: boolean) =>
                        {
                        getTableDinamicDOM(
                            descricao, // lista de descrição dinâmica
                            `${props.title} - POR ${descricao[4].description}`, // título da página
                            "landscape", // orientação da página
                            10, // tamanho da fonte
                            90, // margem de baixo da página
                            isDownload
                        ) 
                    
                    }
                    }
                    components={<> {descricao.map((i : any, index: number) => <p key={index}><strong>{i.propery}:</strong> {i.description}</p> )} </>}
                
                />
                <FontRange changed={(size : number) => setfontTable(size)} />
                <div className="table-content">
                    {
                        cargaUtil?.isAgrupadoPorPt ? 
                        <TableDinamic 
                            headers={ headers.producao.indiceRefugo.posto } 
                            body={ <IndiceRefugoPostoBody postos={indiceRefugosResponse?.itens} /> } fontTable={fontTable}
                        /> : cargaUtil?.isAgrupadoPorProduto ?
                        <TableDinamic 
                            headers={ headers.producao.indiceRefugo.produto } 
                            body={ <IndiceRefugoProdutoBody produtos={indiceRefugosResponse?.itens} /> } fontTable={fontTable}
                        /> : cargaUtil?.isAgrupadoPorRefugo ?
                        <TableDinamic 
                            headers={ headers.producao.indiceRefugo.refugo } 
                            body={ <IndiceRefugoRefugoBody refugos={indiceRefugosResponse?.itens} /> } fontTable={fontTable}
                        /> : <></>
                    }
                </div>
                <TotalGeralIndiceRefugo totais={indiceRefugosResponse} />
              

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
                        getPayload={(value: any ) => getIndiceRefugo(value) }
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