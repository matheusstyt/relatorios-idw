import tbodyAnaliseProducao from "./DOM/analiseproducao";
import { CollectionToArray, dividirColuna } from "./DOM/functions";
import tbodyIndiceParadaXPosto from "./DOM/indiceparaddaxposto";
import relatorioPDF from "./pdmake";

const getTableDinamicDOM = (descricao : Object, title: string, orientation: string, fontSize: number, marginTop: number) => {
    const tabela: HTMLElement | null = document.getElementById("table-main");

    // TRECHO QUE BUSCA O CABEÇALHO DA TABELA      
    const headers: any[] = [];
    let body: Object[] = [];

    const thead: HTMLCollectionOf<HTMLTableSectionElement> | any = tabela?.getElementsByTagName("thead");
    for ( let i = 0; i < thead?.length; i++) {
        const primeiroThead: HTMLTableSectionElement | any = thead?.[i];
        let columns : HTMLCollectionOf<HTMLTableCellElement> = primeiroThead.getElementsByTagName("tr");
        Array.from(columns).forEach((coluna: HTMLTableCellElement) => {
            Array.from(coluna.getElementsByTagName("th")).forEach((i : any) => {headers.push({text : i.textContent, fontSize : fontSize, bold : true, style: "tableHeaderCell"})});
        });
    }  
    // TRECHO QUE BUSCA O CORPO DA TABELA
    const tbodies: HTMLCollectionOf<HTMLTableSectionElement> | any = tabela?.getElementsByTagName("tbody");
    for ( let i = 0; i < tbodies?.length; i++) {
        const Tbody: HTMLTableSectionElement | undefined = tbodies?.[i];
        // SE FOR INDICE DE PARADA POR POSTO, IRÁ REALIZAR UMA ABORDAGEM DIFERENTE, PARA TOTAIS.
       // const body: {details?: Object[], totais?: Object | null} = {};
        if(Tbody?.className === "t-indiceparadaxposto"){
            
            body = body.concat(tbodyIndiceParadaXPosto(Tbody, fontSize));

        }else if(Tbody?.className === "t-analiseproducao"){

            body = body.concat(tbodyAnaliseProducao(Tbody, fontSize));

        }else{
            const rowsDetails: HTMLCollectionOf<HTMLTableRowElement> | any = tbodies?.[i]?.getElementsByTagName("tr");
            Array.from(rowsDetails).forEach((linha : any ) => {
                let columns : HTMLCollectionOf<HTMLTableCellElement> = linha.getElementsByTagName("td");
                // TRANSFORMA COLEÇÃO DE TR EM ARRAY DE OBJETOS COM AS PROPRIEDADES DO PDFMAKE
                body.push(CollectionToArray(columns, fontSize));
            })
        }
    }
    

    // CASO TENHA TOTAL GERAL 
    let arrTotais: Object[] = [];
    try {
        const total: HTMLCollectionOf<HTMLParagraphElement> | any = document.getElementsByClassName("total-geral")[0].children;
        arrTotais = Array.from(total).map( (p : any ) => {
            let objTextTotais: {
                text?: string, 
                fontSize?: number, 
                bold?: boolean, 
                marker?: string,
                margin?: number[],
                listType?: string
            } = {};
            objTextTotais.text = p.textContent;
            objTextTotais.fontSize = fontSize;
            objTextTotais.marker = "";
            objTextTotais.margin = [0, 0, 0, 5];
            objTextTotais.listType = "none";

            return objTextTotais;
        } )
        
    } catch (error) {
        
    }
   // console.log(body)
    relatorioPDF({
        headers, 
        body, 
        descricao, 
        title, 
        columns: dividirColuna(arrTotais),
        fontSize,
        marginTop,
        orientation
    });
}
export default getTableDinamicDOM;
