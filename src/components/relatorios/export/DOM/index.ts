import tbodyAnaliseProducao from "./analiseproducao";
import { ColecaoHTMLParaArrayBodyPadrao, dividirColuna } from "./functions";
import tbodyIndiceParada from "./indiceparada";
import tbodyIndiceParadaXPosto from "./indiceparaddaxposto";
import relatorioPDF from "../pdmake";

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
    // CASO TENHA TOTAL GERAL 
    let arrTotais: Object[] = [];
    try {
        const total: HTMLCollectionOf<HTMLParagraphElement> | any = document.getElementsByClassName("total-geral")[0].children;
        arrTotais = Array.from(total).map( (p : any ) => {
            return {text: p.textContent, fontSize: fontSize, marker: "", margin: [0, 0, 0, 5], listType: "none"};
        });
        
    } catch (error) {
        
    }
    console.log(body);
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
