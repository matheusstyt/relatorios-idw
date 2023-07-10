import { AcompanhamentoProducaoBody, Header, TotalGeralAcompanhamentoProducao } from "../../../../components/reports/pdf";
import { getTableAcompanhamentoDOM } from "../../../../components/reports/pdf/DOM/acompanhamentoproducao";
import headers from "../../../../components/reports/pdf/headers.json"
import { Preloader } from "../../../../components/reports/preloader";
import { IAcompanhamentoProducaoResponse, IIntervalo } from "../../../../interface/reports/producao/acompanhamentoProducao";
import { AcompanhamentoProducaoServices } from "../../../../services/reports/produtos";
import AccordionDinamic from "../../../../components/accordion";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import Filtros from "./filtros";
import "../../../pages.scss";
import FontRange from "../../../../components/reports/fontRange";

export default function AcompanhamentoProducao (props : any) {
    const [exibirPreloader, setExibirPreloader] = useState<boolean>(false);
    const [openReport, setOpenReport] = useState<boolean>(false);
    const [descricao, setDescricao] = useState<Object[]>([]);
    const [fontTable, setfontTable] = useState(14); 

    const [analiseProducaoResponse, setAnaliseProducaoResponse] = useState<IAcompanhamentoProducaoResponse>();
    async function getAcompanhamentoProducao (value : any) {
        await AcompanhamentoProducaoServices( value)
        .then((data) => {
            if(data?.request?.status && data?.request?.status === 500){
                setAnaliseProducaoResponse(undefined);  
                setOpenReport(false);
                // aqui deve ficar o toast de aviso!
            }else{
                setAnaliseProducaoResponse(data);
                setOpenReport(true);
            }
        })
        setExibirPreloader(false);
    }

    const previewPDF = () => {
        return (
            <div className="export-content">
                <Header 
                    title={props.title}
                    getTableDOM={(isDownload: boolean) =>{
                        getTableAcompanhamentoDOM(
                            descricao, // lista de descrição dinâmica
                            `${props.title}`, // título da página
                            "portrait", // orientação da página
                            7, // tamanho da fonte
                            70, // margem de baixo da página
                            isDownload
                        ) }
                    }
                    components={<> {descricao.map((i : any, index: number) => <p key={index}><strong>{i.propery}:</strong> {i.description}</p> )} </>}
                />
                <FontRange changed={(size : number) => setfontTable(size)} />
                <div className="table-content">
                    <table id="table-acompanhamento" style={{fontSize : fontTable}}>
                        {analiseProducaoResponse?.intervalos?.map((intervalo: IIntervalo, index: number) => {
                            return <>
                                <thead key={index} id="thead-acompanhamento">
                                    <tr><th align="left" colSpan={9}>PERÍODO: {intervalo.intervalo}</th></tr>
                                    <tr> { headers?.producao?.acompanhamentoProducao?.map( (item : string, index1:number) => <th key={`${index1} - ${item}`}>{item}</th>) } </tr>
                                </thead>
                                <AcompanhamentoProducaoBody postos={intervalo?.postos} totais={intervalo.totais}/>
                            </>
                            }
                        )}
                    </table>
                </div>
                {analiseProducaoResponse?.totalGeral ? <TotalGeralAcompanhamentoProducao total={analiseProducaoResponse?.totalGeral}/> : <></>}
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
                        getPayload={(value: any ) => getAcompanhamentoProducao(value)}
                        getDescricao={(value: any ) => setDescricao(value)}
                        openPreview={() =>  setExibirPreloader(true) }
                        closeReport={(value: boolean) => setOpenReport(value) }
                    />
                }
            />
            { !openReport ? <></> : previewPDF()}
        </div>
    )   
}