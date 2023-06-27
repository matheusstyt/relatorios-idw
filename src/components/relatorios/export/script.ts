import tbodyAnaliseProducao from "./DOM/analiseproducao";
import { CollectionToArray, dividirColuna } from "./DOM/functions";
import tbodyIndiceParadaXPosto from "./DOM/indiceparaddaxposto";
import relatorioPDF from "./pdmake";

export function getTableDinamicDOM (descricao : Object, title: string, orientation: string, fontSize: number, marginTop: number) {
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
        fontSize,
        marginTop,
        orientation
    });
}
export function getTableAcompanhamentoDOM (descricao : Object, title: string, orientation: string, fontSize: number, marginTop: number) {
    const tabela: HTMLElement | null = document.getElementById("table-acompanhamento");
    const children: HTMLCollectionOf<HTMLTableSectionElement> | any = tabela?.children;

    const arrTableSection = Array.from(children).map((filho: any) => filho.children );
    const body: any[] = []
    // ARRAY COM OS THEAD E TBODY
    Array.from(arrTableSection).forEach((section: HTMLCollection) => {
      //  VERIFICA SE É THEAD, POIS SEMPRE TEM DUAS TR
        if(section.length === 2 ){
            Array.from(section).forEach(( tr: any) => {
                let arrRow: any[] = [];
                Array.from(tr?.children).forEach((th : any) => {
                    const colspan = parseInt(th.getAttribute("colspan") || "1");
                    if(colspan == 9){
                        arrRow.push({text: th?.textContent, fontSize: fontSize, colSpan: 9})
                     }else{
                        arrRow.push({text: th?.textContent, fontSize: fontSize,fillColor: '#C9E1F2', border: [true, true, true, true]})
                    }
                });
                body.push(arrRow);
            });
        }else{
            // ROTINA PARA O TBODY
            Array.from(section).forEach(( tr: any) => {
                let arrRow: any[] = [];
                Array.from(tr?.children).forEach((td : any) => {
                    const colspan = parseInt(td.getAttribute("colspan") || "1");
                    if(colspan == 9){
                        arrRow.push({text: td?.textContent, fontSize: fontSize, colSpan: 9, marginBottom: 10, border: [false, false, false, false]})
                    }else{
                        if(td.classList.contains("cor-personalizada")){
                            arrRow.push({text: td?.textContent, fontSize: fontSize, fillColor: '#C9E1F2', border: [true, true, true, true]})
                        }else{
                            arrRow.push({text: td?.textContent, fontSize: fontSize, border: [true, true, true, true]})
                        }
                    }
                })
                body.push(arrRow);
            })
        }
    });
    const headers : any[] = [];
    for (let i = 0; i < 9; i++) {
        headers.push(
            {
                _span: true, 
                _minWidth: 0,
                _maxWidth: 0, 
                rowSpan: undefined, 
                border: [false, false, false, false]
            }
        );
    }

    // total geral

    // linha de espaçamento
    body.push([{text: "", fontSize: fontSize, colSpan: 9, marginBottom: 10, border: [false, false, false, false]}]);
    // dados de total geral
    const total: HTMLCollection | any = document.getElementById("table-total-acompanhamento")?.firstElementChild?.firstElementChild?.children
    let rowTotalGeral = Array.from(total).map((td : any) => {
        return {text: td.textContent, fontSize: fontSize, fillColor: "#0d427e", color: "#FFFFFF", margin: [0, 0, 35, 0] }
    })
    body.push(rowTotalGeral);

    // chamada do gerador de relatório
    relatorioPDF({
        headers, 
        body, 
        descricao, 
        title, 
        columns: [],
        fontSize,
        marginTop,
        orientation,
        layout: {
        hLineWidth: (i: number, node: any) => (i === 1 ? 1 : 1),
        vLineWidth: () => 1,
        hLineColor: (i: number, node: { table: { body: string | any[]; }; }) => (i === 0 || i === node.table.body.length) ? 'black' : 'gray',
        vLineColor: (i: number, node: { table: { widths: string | any[]; }; }) => (i === 0 || i === node.table.widths.length) ? 'black' : 'gray'
      }
    });
}
