import { ColecaoHTMLParaArrayBodyPadrao, dividirColuna } from "./functions";

const tbodyIndiceParadaXPosto = (Tbody: HTMLTableSectionElement | undefined, fontSize: number) => {
    // COM UM LOOP, CONSEGUE TODAS AS TAG TD QUE REPRESENTA OS DADOS
    let listTr : HTMLCollectionOf<HTMLTableCellElement> | any = Tbody?.firstElementChild?.getElementsByTagName("td");
    const body: Object[] = [];

    body.push(ColecaoHTMLParaArrayBodyPadrao(listTr, fontSize));
    // COM UM LOOP, CONSEGUE TODAS AS TAG P QUE REPRESENTA OS TOTAIS DE UMA LINHA
    let totais: HTMLCollectionOf<HTMLParagraphElement> | any = Tbody?.lastElementChild?.firstElementChild?.firstElementChild?.getElementsByTagName("p");

    let arrSubTotais: Object[] = Array.from(totais).map((p : any) => {
        return {text: p?.textContent, fontSize: fontSize, maker: "", listType: "none", margin: [0, 0, 0, 5]};
    });
    // RENDERIZAÇÃO PERSONALIZADA DA LISTA
    let columns = dividirColuna(arrSubTotais);
    body.push([
    {colSpan: 6, style: "subTotal", margin: [0, 0, 0, 15], columns}
    ]);   
    return body;
}
export default tbodyIndiceParadaXPosto;