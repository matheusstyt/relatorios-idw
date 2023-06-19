import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import types from "pdfmake/interfaces";
import { DateFormat } from "./datetime";

const relatorioPDF = (props: any) => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  // Configurações extras
  const pageOrientation: types.PageOrientation = "portrait"; // ou "landscape"

  const reportTitle = [
    {
      text: props.title,
      style: "headerStyle",
      fontSize: 12,
      bold: true,
      margin: [0, 10, 0, 15] as types.Margins, // Margem superior de 10 e margem inferior de 15
    },
  ];

  const reportBody = [
    {
      stack: [
        {
          columns: [
            {
              ul: props.descricao?.map((i: any) => ({
                text: `${i.propery}: ${i.description}`,
                fontSize: 9,
                marker: '', // Define o marcador como vazio para remover o ponto preto
                margin: [0, 0, 0, 5], // Margem inferior de 5
                listType: 'none'
              })),
            },
            {
              ul: [
                { text: DateFormat(new Date()), fontSize: 9, bold: true, alignment: "right", listType: 'none', margin: [0, 0, 0, 5] as types.Margins},
                { text: "v0.131.10", fontSize: 9, bold: true, alignment: "right", listType: 'none', margin: [0, 0, 0, 5] as types.Margins},
              ],
            }
          ],
        }
      ],
      marginBottom: 5 // Margem inferior de 5 para o contêiner do stack
    },
    
    
    {
      table: {
        body: [
          props?.headers,
          ...props?.body.map((row: any) => row),
        ],
      },
      layout: "lightHorizontalLines",
      style: "tableCell",
    },
  ];

  const reportStyle = {
    headerStyle: {
      fontSize: 16,
      bold: true,
      alignment: "center",
      marginBottom: 15,
    },
    anotherStyle: {
      italics: true,
      alignment: "center",
    },
    tableCell: {
      margin: [0, 15, 0, 0] as types.Margins,
      border: [false, true, false, true], // [left, top, right, bottom]
    },
    tableHeaderCell: {
      fillColor: "#ebebeb", // Cor de fundo do cabeçalho da tabela
      color: "#585858", // Cor do texto no cabeçalho da tabela
      border: [false, false, false, [false, false, false, true]], // [left, top, right, bottom]
      borderBottomColor: "#414141", // Cor da borda inferior do cabeçalho da tabela
      borderBottomWidth: 1, // Largura da borda inferior do cabeçalho da tabela
      bold: true, // Texto em negrito no cabeçalho da tabela
      alignment: "left", // Alinhamento do texto no cabeçalho da tabela
      margin: [0, 5, 0, 5] as types.Margins, // Margem superior e inferior do cabeçalho da tabela
    },
  };

  const pageConfig = {
    pageSize: "A4" as types.PredefinedPageSize, // Escolha o tamanho de página desejado
    pageMargins: [15, 30, 15, 15] as types.Margins, // left, top, right, bottom (aumente o valor da margem superior)

    header: reportTitle,
    content: reportBody,
    footer: (currentPage: any, pageCount: any) => {
      var t = {
        layout: "noBorders",
        fontSize: 8,
        width : 100,
        margin: [25, 0, 25, 0] as types.Margins,
        table: {
          body: [
            [
              { width : 100, text: `Pag. ${currentPage.toString()} de ${pageCount}`, alignment: "left", fontSize: 9, bold: true },
            ]
          ]
        }
      };
      
      return t;
    },
    

    styles: reportStyle as types.StyleDictionary,
  };
  pdfMake.createPdf(pageConfig).download(`${props.title} - ${DateFormat(new Date())}`);
};

export default relatorioPDF;
