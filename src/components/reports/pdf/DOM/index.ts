import tbodyAnaliseProducao from "./analiseproducao";
import { ColecaoHTMLParaArrayBodyPadrao, dividirColuna } from "./functions";
import tbodyIndiceParada from "./indiceparada";
import tbodyIndiceParadaXPosto from "./indiceparaddaxposto";
import relatorioPDF from "../pdmake";

export function getTableDinamicDOM (descricao : Object, title: string, orientation: string, fontSize: number, marginTop: number, isDownload: boolean) {
    const tabela: HTMLElement | null = document.getElementById("table-main");

    // TRECHO QUE BUSCA O CABEÇALHO DA TABELA      
    const headers: any[] = [];
    let body: Object[] = [];

    const thead: HTMLCollectionOf<HTMLTableSectionElement> | any = tabela?.getElementsByTagName("thead");
    for ( let i = 0; i < thead?.length; i++) {
        const primeiroThead: HTMLTableSectionElement | any = thead?.[i];
        let listTr : HTMLCollectionOf<HTMLTableCellElement> = primeiroThead.getElementsByTagName("tr");
        Array.from(listTr).forEach((tr: HTMLTableCellElement) => {
            let row: any[] = [];
            Array.from(tr.getElementsByTagName("th")).forEach((th : HTMLElement) => {
                const colSpan = parseInt(th.getAttribute("colspan") || "1");
                if(colSpan > 1){
                    row.push({text : th.textContent,fillColor : "#bbb", color: "#000", alignment: "center", colSpan: colSpan,  fontSize : fontSize, bold : true, margin: [5, 0, 0, 0], style: "tableHeaderCell"});
                    for(let i = 1; i  < colSpan; i++){
                        row.push({_span: true, fillColor : "#404040", _minWidth: 0, _maxWidth: 0, rowSpan: undefined});
                    }
                }else{
                    row.push({text : th.textContent, fontSize : fontSize, bold : true, margin: [5, 0, 0, 0], style: "tableHeaderCell"});
                }
            
            });
            headers.push(row);
        });
    }  
    // TRECHO QUE BUSCA O CORPO DA TABELA
    const tbodies: HTMLCollectionOf<HTMLTableSectionElement> | any = tabela?.getElementsByTagName("tbody");
    for ( let i = 0; i < tbodies?.length; i++) {
        const Tbody: HTMLTableSectionElement | undefined = tbodies?.[i];

        if(Tbody?.className === "t-indiceparadaxposto"){
            
            body = body.concat(tbodyIndiceParadaXPosto(Tbody, fontSize));
            
        }else if(Tbody?.className === "t-analiseproducao"){
            
            body = body.concat(tbodyAnaliseProducao(Tbody, fontSize));
            
        }else if(Tbody?.className === "t-indiceparada"){
            
            body = body.concat(tbodyIndiceParada(Tbody, fontSize));
            
        }else{
            
            body = body.concat(ColecaoHTMLParaArrayBodyPadrao(Tbody, fontSize));
            
        }
    }
    // TOTAL GERAL PRODUÇÃO EM REGULAGEM 
    const tableTotaisProducaoEmRegulagem: HTMLElement | null = document.getElementById("table-total-geral");
    const trTotais: any = tableTotaisProducaoEmRegulagem?.lastElementChild?.firstElementChild?.children;
    // adiciona o total do período
    if(tableTotaisProducaoEmRegulagem){
        let row: any[] = [];
        for (let i = 0; i < trTotais.length; i++){
            row.push({
                fillColor : "#aaa",
                text: trTotais[i]?.textContent, 
                width: ["*"], 
                _minWidth: 0, 
                fontSize, 
                _maxWidth: 0
            });
            if(i === 0 || i === 4 || i === 5){
                row.push(
                    {_span: true, _minWidth: 0, _maxWidth: 0, fillColor : "#aaa", rowSpan: undefined});
            }
        }
        body.push(row);
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
    console.log(headers);
    console.log(body);
    relatorioPDF({
        headers, 
        body, 
        descricao, 
        title, 
        columns: dividirColuna(arrTotais),
        fontSize,
        marginTop,
        orientation,
        isDownload
    });
}
