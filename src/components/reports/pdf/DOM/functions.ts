export function ColecaoHTMLParaArrayBodyPadrao(Tbody: HTMLTableSectionElement | undefined, fontSize: number){
    
    const listTr: HTMLCollectionOf<HTMLTableRowElement> | any = Tbody?.children;
    const body: Object[] = [];
    console.log(Tbody)  
    Array.from(listTr).forEach((tr : any ) => {
                
        let arrRow: any[] = [];
        Array.from(tr.children).forEach((td: any) => {
            let cell: any[] | Object = [];
            
            if(td.children.length > 0){
                
                // caso tenha tag P dentro da tag TD, irá criar uma lista com esses filhos
                cell = Array.from(td.children).map(( p : any) => { 
                    console.log(p)
                    return {text: p.textContent, fontSize}; 
                });
            }else{
                // criará um objeto da célula
                let margin: any[] = [0, 0, 0 , 0];
                if(td.classList.contains("td-indiceparada")) margin = [10, 5, 100, 5];

                cell = {
                    margin,
                    text: td.textContent, 
                    width: ["*"], 
                    _minWidth: 0, 
                    fontSize, 
                    _maxWidth: 0
                };
            }
            arrRow.push(cell);
        });
        body.push(arrRow);

    });
    return body;
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
// FUNÇÃO CONVERTE NUMERO DECIMAL PARA REAL
export function DecimalParaReal(numero : number) {
    // Verifica se o número possui casas decimais
    if (numero % 1 === 0) {
      // Se não possui casas decimais, retorna o número sem formatação
      return numero.toString();
    } else {
      // Formata o número com separadores de milhares e casas decimais
      if(numero > 0) {
        return numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 10 });
      }
      return 0
    }
  }
  