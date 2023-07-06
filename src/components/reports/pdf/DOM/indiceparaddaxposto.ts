import { ColecaoHTMLParaArrayBodyPadrao, dividirColuna } from "./functions";

const tbodyIndiceParadaXPosto = (Tbody: HTMLTableSectionElement | undefined, fontSize: number) => {
    // COM UM LOOP, CONSEGUE TODAS AS TAG TD QUE REPRESENTA OS DADOS
    let listTd : HTMLCollectionOf<HTMLTableCellElement> | any = Tbody?.firstElementChild?.getElementsByTagName("td");
    const body: Object[] = [];
    body.push(Array.from(listTd).map((td: any) => {
        if(td.children.length > 0){
            // caso tenha tag P dentro da tag TD, irá criar uma lista com esses filhos
            return Array.from(td.children).map(( p : any) => { 
                return {text: p.textContent, fontSize}; 
            });
        }else{
            // criará um objeto da célula
            let margin: any[] = [10, 0, 5 , 0];
            return {
                margin,
                text: td.textContent, 
                width: ["*"], 
                _minWidth: 0, 
                fontSize, 
                _maxWidth: 0
            };
        }
    }))
    // COM UM LOOP, CONSEGUE TODAS AS TAG P QUE REPRESENTA OS TOTAIS DE UMA LINHA
    let totais: HTMLCollectionOf<HTMLParagraphElement> | any = Tbody?.lastElementChild?.firstElementChild?.firstElementChild?.getElementsByTagName("p");
    
    let arrSubTotais: Object[] = Array.from(totais).map((p : any) => {
        return {text: p?.textContent, fontSize: fontSize, maker: "", listType: "none", margin: [0, 0, 0, 5]};
    });
    // RENDERIZAÇÃO PERSONALIZADA DA LISTA
    let columns = dividirColuna(arrSubTotais);
    body.push([ {colSpan: 6, style: "subTotal", margin: [0, 0, 0, 15], columns} ]);   
    return body;
}
export default tbodyIndiceParadaXPosto;