import { dividirColuna } from "./functions";

const tbodyAnaliseProducao = (Tbody: HTMLTableSectionElement | undefined, fontSize: number) => {
    // COM UM LOOP, CONSEGUE TODAS AS TAG TD QUE REPRESENTA OS DADOS
    let listTr: HTMLCollectionOf<HTMLTableRowElement> | any = Tbody?.children;
    const body: Object[] = [];
        
    const arrayListTr = Array.from(listTr) as HTMLTableRowElement[];

    for (const row of arrayListTr) {
        let obj:{colSpan?: number, 
            columns?: Object[], 
            fontSize?: number,
            text?: Object | undefined | null | string} = {};
            
        if (row.classList.contains("tr-title")) {
            obj.colSpan = 15;
            obj.text = row?.firstElementChild?.textContent;
            obj.fontSize = fontSize + 2;
            body.push([obj]);
        }else if (row?.classList?.contains("tr-data")){
            let arr = Array.from(row?.children).map((td :any) => {
                return {fontSize: fontSize, text: td.textContent}
            })
            body.push(arr);

        }else if (row?.classList?.contains("tr-total")){
            let arrP: HTMLCollectionOf<HTMLParagraphElement> | any = row?.firstElementChild?.firstElementChild?.children;
            obj.colSpan = 15;
            obj.columns = dividirColuna(Array.from(arrP).map((p :any) => {
                return {fontSize: fontSize, text: p.textContent, marker: "", listType: "none", margin: [0, 0, 0, 5]}
            }));
            body.push([obj]);
        }else if (row?.classList?.contains("tr-operador-th")){
            
            let arr = Array.from(row?.children).map((th :any) => {
                return {fontSize: fontSize + 1, text: th.textContent}
            })
            obj.columns = arr;
            obj.colSpan = 15;
            body.push([obj]);
        }else if (row?.classList?.contains("tr-operador-td")){
            
            let arr = Array.from(row?.children).map((td :any) => {
                return {fontSize: fontSize + 1, text: td.textContent}
            })
            obj.columns = arr;
            obj.colSpan = 15;
            body.push([obj]);
        }
    }
    return body;
}
export default tbodyAnaliseProducao;