import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import types from "pdfmake/interfaces";
import { Formatar } from "./datetime";

const relatorioPDF = (props: any) => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  let total: any[] = props.columns;
  // Configurações extras
  const pageOrientation: types.PageOrientation = props.orientation; // ou "landscape"
  const fontPrimary: number = props.fontSize;
  const marginTop: number = props.marginTop;
  // fim 
  const reportBody = [
    {
      table: {
        body: [
          props?.headers,
          ...props?.body.map((row: any) => row),
        ],
        width: ["auto"],
        alignment: "center",

      },
      
      layout: props.layout || "lightHorizontalLines",
    //  width: ["500"],
      style: "tableCell",
    },
    // VERIFICA SE HÁ TOTAL
    {
      stack : props.columns.length >0 ? [{text: "Totais:", style: "totaisTitle"},] : []
    }
    ,
    {
      stack: [
        {columns: props.columns}
      ],
      style: "totalGeral",
      marginTop: 20
    }
  ];

  const reportStyle = {
    headerStyle: {
      fontSize: fontPrimary + 3,
      bold: true,
      margin: [0, 10, 0, 5] as types.Margins,
      alignment: "center",
      marginBottom: 15,
    },
    totaisTitle: {
      color: "#414141",
      alignment: "left",
      fontSize: fontPrimary + 2,
      bold: true,
      margin: [0, 10, 0, 0] as types.Margins,
    },
    tableCell: {
      margin: [0, 0, 0, 0] as types.Margins,
      borderColor: "#414141",
      border: [false, true, false, true], // [left, top, right, bottom]
    },
    tableHeaderCell: {
      fillColor: "#dddddd", //  azul #ebebeb
      color: "#585858", // Cor do texto no cabeçalho da tabela
      border: [false, false, false, [false, false, false, true]], // [left, top, right, bottom]
      borderBottomColor: "#414141", // Cor da borda inferior do cabeçalho da tabela
      borderBottomWidth: 1, // Largura da borda inferior do cabeçalho da tabela
      bold: true, // Texto em negrito no cabeçalho da tabela
     // alignment: "left", // Alinhamento do texto no cabeçalho da tabela
      margin: [0, 5, 0, 5] as types.Margins, // Margem superior e inferior do cabeçalho da tabela
    },
    subTotal: {
      fillColor: "#EAEAEA", // Cor de fundo do cabeçalho da tabela
      color: "#101010", // Cor do texto no cabeçalho da tabela
    },
  };

  const pageConfig = {
    pageSize: "A4" as types.PredefinedPageSize, // Escolha o tamanho de página desejado
    pageMargins: [ 10, marginTop, 10, 20 ] as types.Margins, // left, top, right, bottom (aumente o valor da margem superior)
    pageOrientation: pageOrientation,
    header: (currentpage: any, pageCount: any) => {
      const reportTitle = [
        { text: props.title, style: "headerStyle",},
        {
          columns: [
            {
              ul: props.descricao?.map((i: any) => ({
                text: `${i.propery}: ${i.description}`,
                fontSize: fontPrimary,
                marker: "",
                margin: [5, 5, 0, 0],
                listType: "none",
              })),
            },
            {
              ul: [
                {
                  text: ` Pag. ${currentpage} de ${pageCount}`,
                  fontSize: fontPrimary,
                  bold: true,
                  alignment: "right",
                  listType: "none",
                  margin: [0, 5, 10, 0] as types.Margins,
                },
                {
                  text: "v0.131.10",
                  fontSize: fontPrimary,
                  bold: true,
                  alignment: "right",
                  listType: "none",
                  margin: [0, 5, 10, 0] as types.Margins,
                },
                {
                  text: new Formatar(new Date()).dataGeralPT(),
                  fontSize: fontPrimary,
                  bold: true,
                  alignment: "right",
                  listType: "none",
                  margin: [0, 5, 10, 0] as types.Margins,
                },
              ],
            },
          ],
        },
      ];
     
      return reportTitle;
    },
    content: reportBody,
    styles: reportStyle as types.StyleDictionary,
  };

  // se isDownload for true baixar
  if(props.isDownload){
    pdfMake.createPdf(pageConfig).download(`${props.title} - ${new Formatar(new Date()).dataGeral()}.pdf`);
  }else{
    // se não, abrir no navegador
    pdfMake.createPdf(pageConfig).open();
  }

};

export default relatorioPDF;
