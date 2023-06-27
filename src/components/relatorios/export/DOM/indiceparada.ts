const tbodyIndiceParada = (Tbody: HTMLTableSectionElement | undefined, fontSize: number) => {
    const listTr: HTMLCollectionOf<HTMLTableRowElement> | any = Tbody?.getElementsByTagName("tr");
    const body: Object[] = [];
    
    Array.from(listTr).forEach((row: any) => {
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
        });
        body.push(newRow);
    });
    return body;
}
export default tbodyIndiceParada;