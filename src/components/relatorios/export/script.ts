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

        }else if(Tbody?.className === "t-indiceparada"){

            const rows: HTMLCollectionOf<HTMLTableRowElement> | any = tbodies?.[i]?.getElementsByTagName("tr");
            Array.from(rows).forEach((row: any) => {
                let columns : HTMLCollectionOf<HTMLTableCellElement> = row.getElementsByTagName("td");
                let newRow: any[] = [];
                Array.from(columns).forEach((column: HTMLElement) => {
                    // SE O ATRIBUTO COLSPAN DO TD DA VEZ FOR MAIOR QUE 1, IRÁ CRIAR COLUNAS DE EXPANSÃO PARA PDFMAKE
                    const colspan = parseInt(column.getAttribute("colspan") || "1");
                    for (let i = 0; i < colspan; i++) {
                        if(i > 0) {
                            newRow.push({_span: true, _minWidth: 0, _maxWidth: 0, rowSpan: undefined});
                        }else{
                            // SE HOUVER SUB ELEMENTOS NA TD (tags p) DA VEZ, IRÁ CRIAR UMA UL PARA PDFMAKE
                            let arrP: HTMLCollectionOf<HTMLParagraphElement> = column.getElementsByTagName("p"); 
                            if(arrP.length > 0){
                                let ul: any[];
                                ul = Array.from(arrP).map((p: HTMLParagraphElement) => {
                                    return {text: p.textContent, fontSize: fontSize, maker: "", listType: "none", margin: [0, 0, 0, 5]};
                                })
                                newRow.push({ ul: ul});
                            }else{
                                // SE NÃO, IRÁ ADICIONAR UMA LINHA APENAS COM CONTEÚDO DA TD
                                newRow.push({ text: column.textContent, fontSize: fontSize });
                            }
                        }
                    }
                    
                })
                body.push(newRow);
            })
           // console.log(arrRows);
        }else{
            const rows: HTMLCollectionOf<HTMLTableRowElement> | any = tbodies?.[i]?.getElementsByTagName("tr");
            Array.from(rows).forEach((row : any ) => {
                let columns : HTMLCollectionOf<HTMLTableCellElement> = row.getElementsByTagName("td");
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
            return {text: p.textContent, fontSize: fontSize, marker: "", margin: [0, 0, 0, 5], listType: "none"};
        });
        
    } catch (error) {
        
    }
   console.log(body)
    relatorioPDF({
        headers, 
        body, 
        descricao, 
        title, 
        columns: arrTotais,
        //columns: arrTotais.length > 2 ? dividirColuna(arrTotais) : arrTotais,
        fontSize,
        marginTop,
        orientation
    });
}
export default getTableDinamicDOM;
