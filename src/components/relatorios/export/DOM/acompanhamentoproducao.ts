import relatorioPDF from "../pdmake";

export function getTableAcompanhamentoDOM (descricao : Object, title: string, orientation: string, fontSize: number, marginTop: number) {
    const tabela: HTMLElement | null = document.getElementById("table-acompanhamento");
    const children: HTMLCollectionOf<HTMLTableSectionElement> | any = tabela?.children;

    const arrTableSection = Array.from(children).map((filho: any) => filho.children );
    const body: any[] = []
    // ARRAY COM OS THEAD E TBODY
    Array.from(arrTableSection).forEach((section: HTMLCollection) => {
      //  VERIFICA SE É THEAD, POIS SEMPRE TEM DUAS TR
        if(section.length === 2 ){
            Array.from(section).forEach(( tr: any) => {
                // array para as colunas da linha
                let arrRow: any[] = [];
                Array.from(tr?.children).forEach((th : any) => {
                    // verifica através do colspan se é o header do périodo de intervalo, adiciona-se a mesma propriedade.
                    // aproveitando o else, verifica a class para alterar a cor de fundo.
                    const colspan = parseInt(th.getAttribute("colspan") || "1");
                    if(colspan == 9){
                        arrRow.push({text: th?.textContent, fontSize: fontSize, colSpan: 9})
                     }else{
                        arrRow.push({text: th?.textContent, fontSize: fontSize,fillColor: '#C9E1F2', border: [true, true, true, true]})
                    }
                });
                body.push(arrRow);
            });
        }else{
            // ROTINA PARA O TBODY
            Array.from(section).forEach(( tr: any) => {
                // array para as colunas da linha
                let arrRow: any[] = [];

                Array.from(tr?.children).forEach((td : any) => {
                    // verifica através do colspan se é o header do périodo de intervalo, adiciona-se a mesma propriedade.
                    // aproveitando o else, verifica a class para alterar a cor de fundo.
                    const colspan = parseInt(td.getAttribute("colspan") || "1");
                    if(colspan == 9){
                        arrRow.push({text: td?.textContent, fontSize: fontSize, colSpan: 9, marginBottom: 10, border: [false, false, false, false]})
                    }else{
                        if(td.classList.contains("cor-personalizada")){
                            arrRow.push({text: td?.textContent, fontSize: fontSize, fillColor: '#C9E1F2', border: [true, true, true, true]})
                        }else{
                            arrRow.push({text: td?.textContent, fontSize: fontSize, border: [true, true, true, true]})
                        }
                    }
                })
                body.push(arrRow);
            })
        }
    });
    // é obrigatório o header da tabela, adicionei espaços vazios e desativei as bordas
    const headers : any[] = [];
    for (let i = 0; i < 9; i++) {
        headers.push(
            {
                _span: true, 
                _minWidth: 0,
                _maxWidth: 0, 
                rowSpan: undefined, 
                border: [false, false, false, false]
            }
        );
    }

    // total geral

    // linha de espaçamento
    body.push([{text: "", fontSize: fontSize, colSpan: 9, marginBottom: 10, border: [false, false, false, false]}]);
    // dados de total geral
    // table > tbody > tr > all td's
    const total: HTMLCollection | any = document.getElementById("table-total-acompanhamento")?.firstElementChild?.firstElementChild?.children
    // map das td's para criar o array de objetos
    let rowTotalGeral = Array.from(total).map((td : any) => {
        return {text: td.textContent, fontSize: fontSize, fillColor: "#0d427e", color: "#FFFFFF", margin: [0, 0, 35, 0] }
    })
    body.push(rowTotalGeral);

    // chamada do gerador de relatório
    relatorioPDF({
        headers, 
        body, 
        descricao, 
        title, 
        columns: [],
        fontSize,
        marginTop,
        orientation,
        layout: {
        hLineWidth: (i: number, node: any) => (i === 1 ? 1 : 1),
        vLineWidth: () => 1,
        hLineColor: (i: number, node: { table: { body: string | any[]; }; }) => (i === 0 || i === node.table.body.length) ? 'black' : 'gray',
        vLineColor: (i: number, node: { table: { widths: string | any[]; }; }) => (i === 0 || i === node.table.widths.length) ? 'black' : 'gray'
      }
    });
}
