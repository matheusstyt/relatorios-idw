import { IIndiceRefugoResponse, INewIndiceRefugoResponse } from "../../../../components/reports/interface/reports/producao/indiceRefugos";
import { Header, IndiceRefugoPostoBody, IndiceRefugoProdutoBody, IndiceRefugoRefugoBody, TableDinamic, TotalGeralIndiceRefugo } from "../../../../components/reports/pdf";
import { IndiceRefugosServices } from "../../../../components/reports/services/reports/produtos";
import { getTableDinamicDOM } from "../../../../components/reports/pdf/DOM";
import headers from "../../../../components/reports/pdf/headers.json";
import { Preloader } from "../../../../components/reports/preloader";
import AccordionDinamic from "../../../../components/accordion";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import Filtros from "./filtros";
import "../../../pages.scss";
import mocks from "../../../../components/reports/interface/reports/producao/indiceRefugoMocks.json";

export default function IndiceRefugos (props : any) {
    const [exibirPreloader, setExibirPreloader] = useState<boolean>(false);
    const [exibirExportar, setExibirExportar] = useState<boolean>(false);
    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<{propery?: string, description?: string}[]>([]);

    const [indiceRefugosResponse, setIndiceRefugosResponse] = useState<INewIndiceRefugoResponse>();
    const [isProducaoRegulagem, setIsProducaoRegulagem] = useState<boolean>(true);
    const [exibirParadas, setExibirParadas] = useState<boolean>(false);

    async function getIndiceRefugo (value : any) {
       setCargaUtil(value);
      // console.log(value)
        // await IndiceRefugosServices( value)
        // .then( (data) => {
        //     console.log(data)
        //     setIndiceRefugosResponse(data);
        // })
        if(value?.isAgrupadoPorPt){
            setIndiceRefugosResponse(mocks.posto)
        }else if( value?.isAgrupadoPorProduto){
            setIndiceRefugosResponse(mocks.produto)
        }else if( value?.isAgrupadoPorRefugo){
            setIndiceRefugosResponse(mocks.refugo)
        }
        setExibirPreloader(false);
        setExibirExportar(true);
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
                            6, // tamanho da fonte
                            90, // margem de baixo da página
                            isDownload
                        ) 
                    
                    }
                    }
                    components={<> {descricao.map((i : any, index: number) => <p key={index}><strong>{i.propery}:</strong> {i.description}</p> )} </>}
                
                />
                <div className="table-content">
                    {
                        cargaUtil?.isAgrupadoPorPt ? 
                        <TableDinamic 
                            headers={ headers.producao.indiceRefugo.posto } 
                            body={ <IndiceRefugoPostoBody postos={indiceRefugosResponse?.itens} /> }
                        /> : cargaUtil?.isAgrupadoPorProduto ?
                        <TableDinamic 
                            headers={ headers.producao.indiceRefugo.produto } 
                            body={ <IndiceRefugoProdutoBody produtos={indiceRefugosResponse?.itens} /> }
                        /> : cargaUtil?.isAgrupadoPorRefugo ?
                        <TableDinamic 
                            headers={ headers.producao.indiceRefugo.refugo } 
                            body={ <IndiceRefugoRefugoBody refugos={indiceRefugosResponse?.itens} /> }
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
                        getDescricao={(value: any ) => setDescricao(value)}
                        openPreview={(value: boolean) =>  setExibirPreloader(true) }
                        isProducaoRegulagem={(value: boolean, payload: Object, exibirParadas: boolean) => {
                            setExibirParadas(exibirParadas);
                            setExibirExportar(false);
                            setIsProducaoRegulagem(value);
                            if(value){
                                getIndiceRefugo(payload)
                            }
                        }}
                    />
                }
            />
            { !exibirExportar ? <></> : previewPDF()}
        </div>
    )   
}