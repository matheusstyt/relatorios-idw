
const tbodyAcompanhamentoProducao = (fontSize: number) => {
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
                arrRow = Array.from(tr?.children).map((th : any) => {
                    
                    if(th?.getAttribute("colspan") == "15"){
                        return
                        //return [{text: th?.textContent, colSpan: 15, fontSize: fontSize}]
                    }else{
                        return [{text: th?.textContent, fontSize: fontSize}]
                    }
                    
                })
                body.push(arrRow);
            })
        }else{
            // ROTINA PARA O TBODY
            Array.from(section).forEach(( tr: any) => {
                   let arrRow: any[] = [];
                   arrRow = Array.from(tr?.children).map((td : any) => {
                        if(td?.getAttribute("colspan") == "15"){
                            return [{text: td?.textContent, colSpan: 15, fontSize: fontSize}]
                        }else{
                            return [{text: td?.textContent, fontSize: fontSize}]
                        }
                   })
                   body.push(arrRow);
               })
        }
    })
    console.log(body)
  return body;
}
export default tbodyAcompanhamentoProducao;