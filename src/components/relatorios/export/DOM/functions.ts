// VARRER CÉLULAS DE LINHA
export function CollectionToArray(cell : HTMLCollectionOf<HTMLTableCellElement>, fontSize: number){
    let row : Object[] = [];

    for ( let j = 0; j < cell.length; j++) {
        let objTextTR: {
            list?: Object[],
            text?: string | Object | null,
            fontSize?: number | null,
            bold?: boolean | null,
            width?: any,
            margin?: any[],
        } | Object[] = {};
    
        let td: HTMLTableCellElement = cell[j];

        if(td.children.length > 0) {
            let listP: Object[] = []; 
            Array.from(td.children).forEach((tdP : any) =>{
                listP.push({text: tdP.textContent, fontSize: fontSize});
            })
            objTextTR = listP;
        }else{
            if(td.classList.contains("td-indiceparada")){
                objTextTR.margin = [0, 0, 100, 5]
            }
            objTextTR.text = td.textContent;
            objTextTR.fontSize = fontSize;
            objTextTR.bold = true;
            objTextTR.width = 100
            
        }   
        row.push(objTextTR);
    } 
    return row;
}
// FIM  

// DIVIDI COLUNA DE TOTAL EM DUAS PARTES 

export function dividirColuna(arr : Object[]){
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