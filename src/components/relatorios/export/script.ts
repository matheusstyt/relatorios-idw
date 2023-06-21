import relatorioPDF from "./pdmake";

const getTableDinamicDOM = (descricao : Object, title: string, orientation: string, fontSize: number) => {
    const tabela: HTMLElement | null = document.getElementById("table-main");

    // TRECHO QUE BUSCA O CABEÇALHO DA TABELA      
    const rows : Object[] = [];
    const headers: any[] = [];
    const body: Object[] = [];

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
            // COM UM LOOP, CONSEGUE TODAS AS TAG TD QUE REPRESENTA OS DADOS
            let columnsD : HTMLCollectionOf<HTMLTableCellElement> | any = Tbody.firstElementChild?.getElementsByTagName("td");
            body.push(trDinamic(columnsD));
            // COM UM LOOP, CONSEGUE TODAS AS TAG P QUE REPRESENTA OS TOTAIS DE UMA LINHA
            let totais: HTMLCollectionOf<HTMLParagraphElement> | any = Tbody.lastElementChild?.firstElementChild?.firstElementChild?.getElementsByTagName("p");
            let ul: {items?: any, render?: any} = {};

            let arrSubTotais: Object[] = Array.from(totais).map((p : any) => {
                let objTextTotais: {
                    text?: string, 
                    fontSize?: number, 
                    bold?: boolean, 
                    marker?: string,
                    margin?: number[],
                    listType?: string
                } = {};
                
                objTextTotais.text = p?.textContent;
                objTextTotais.fontSize = fontSize;
                objTextTotais.marker = "";
                objTextTotais.margin = [0, 0, 0, 5];
                objTextTotais.listType = "none";

                return objTextTotais;
            
            });
    
        // RENDERIZAÇÃO PERSONALIZADA DA LISTA
        let columns = dividirColunas(arrSubTotais);
                body.push([
                    {colSpan: 6, style: "subTotal", margin: [0, 0, 0, 15], columns}
                ]);   
        }
        else if(Tbody?.className === "t-analiseproducao"){
            let listaTr: HTMLCollectionOf<HTMLTableRowElement> | any = Tbody?.children;
            
            const arrayListaTr = Array.from(listaTr) as HTMLTableRowElement[];
            let listObj: Object[] = []
            for (const row of arrayListaTr) {
                let obj:{colSpan?: number, 
                    style?: string, 
                    margin?: number[],
                    columns?: Object[], 
                    text?: Object | undefined | null | string} = {};
                    
                if (row.classList.contains("tr-title")) {
                    obj.colSpan = 15;
                    obj.text = row?.firstElementChild?.textContent;
                }else if (row?.classList?.contains("tr-data")){
                    let arr = Array.from(row?.children).map((td :any) => {
                        return {text: td.textContent}
                    })
                    obj.columns = arr;
                    body.push(obj);

                }else if (row?.classList?.contains("tr-total")){
                    let arrP: HTMLCollectionOf<HTMLParagraphElement> | any = row?.firstElementChild?.firstElementChild?.children;
                    obj.columns = dividirColunas(Array.from(arrP).map((p :any) => {
                        return {text: p.textContent}
                    }));
                    body.push(obj);
                }else if (row?.classList?.contains("tr-operador-th")){
                    let arr = Array.from(row?.children).map((th :any) => {
                        return {text: th.textContent, colSpan: 5}
                    })
                    obj.columns = arr;
                    body.push(obj);

                }else if (row?.classList?.contains("tr-operador-td")){
                    let arr = Array.from(row?.children).map((td :any) => {
                        return {text: td.textContent, colSpan: 5}
                    })
                    obj.columns = arr;
                    body.push(obj);
                }
                listObj.push(obj);
            }
            console.log(listObj);
        }else{
            const rowsDetails: HTMLCollectionOf<HTMLTableRowElement> | any = tbodies?.[i]?.getElementsByTagName("tr");
            Array.from(rowsDetails).forEach((linha : any ) => {
                let columns : HTMLCollectionOf<HTMLTableCellElement> = linha.getElementsByTagName("td");
                body.push(trDinamic(columns));
            })
        }
    }
    // VARRER CÉLULAS DE LINHA
    function trDinamic(cell : HTMLCollectionOf<HTMLTableCellElement> ){
        let row : Object[] = [];

        for ( let j = 0; j < cell.length; j++) {
            let objTextTR: {
                list?: Object[],
                text?: string | Object | null,
                fontSize?: number | null,
                bold?: boolean | null,
            } | Object[] = {};
        
            let td = cell[j];

            if(td.children.length > 0) {
                let listP: Object[] = []; 
                Array.from(td.children).forEach((tdP : any) =>{
                    let objTextP: {
                        text?: string | null ,
                        fontSize?: number | null ,
                        bold?: boolean  | null ,
                    } = {};
                    objTextP.text = tdP.textContent;
                    objTextP.fontSize = fontSize;
                    objTextP.bold = false;
                    listP.push(objTextP);
                })
                objTextTR = listP;
            }else{
                objTextTR.text = td.textContent;
                objTextTR.fontSize = fontSize;
                objTextTR.bold = true;
            }
           // row.push(objTextTR);
        } 
        return row;
    }
    // FIM  

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
    console.log(body)
    // relatorioPDF({
    //     headers, 
    //     body, 
    //     descricao, 
    //     title, 
    //     columns: dividirColunas(arrTotais),
    //     fontSize,
    //     orientation
    // });
}
export default getTableDinamicDOM;

function dividirColunas(arr : Object[]){
    // DIVIDIR EM DUAS COLUNAS
    const numColumns = Math.ceil(arr.length / 2);

    const firstcolumn: any[] = [];
    for(let i = 0; i < numColumns; ++i){
        firstcolumn.push(arr[i]);
    }
    const secondcolumn: any[] = [];
    for(let i = numColumns; i < arr.length; ++i){
        secondcolumn.push(arr[i]);
    }
    // RENDERIZAÇÃO PERSONALIZADA DA LISTA
    var columns = [
        {
            ul : firstcolumn
        },
        {
            ul : secondcolumn
        }
    ];
    return columns
}