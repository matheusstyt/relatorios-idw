import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import types from "pdfmake/interfaces";
import { DateTimeFormat } from "./datetime";

const relatorioPDF = (props: any) => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  // Configurações extras
  const pageOrientation: types.PageOrientation = props.orientation; // ou "landscape"
  const fontPrimary: number = props.fontSize;
  console.log(props.descricao)
  function titleReport(atual: any, total: any){
    const reportTitle = [
      { text: props.title, style: "headerStyle",},
      {
        columns: [
          {
            ul: props.descricao?.map((i: any) => ({
              text: `${i.propery}: ${i.description}`,
              fontSize: fontPrimary,
              marker: "",
              margin: [10, 5, 0, 0],
              listType: "none",
            })),
          },
          {
            ul: [
              {
                text: DateTimeFormat(new Date()),
                fontSize: fontPrimary,
                bold: true,
                alignment: "right",
                listType: "none",
                margin: [0, 5, 5, 0] as types.Margins,
              },
              {
                text: "v0.131.10",
                fontSize: fontPrimary,
                bold: true,
                alignment: "right",
                listType: "none",
                margin: [0, 5, 5, 0] as types.Margins,
              },
              {
                text: ` Pag. ${atual} de ${total}`,
                fontSize: fontPrimary,
                bold: true,
                alignment: "right",
                listType: "none",
                margin: [0, 5, 5, 0] as types.Margins,
              },
            ],
          },
        ],
        height: 150
      },
    ];
    return reportTitle;
  }
  
  const reportBody = [
    {
      table: {
        body: [
          props?.headers,
          ...props?.body.map((row: any) => row),
        ],
        width:['auto','*','*'],
        alignment: "center",

      },
      
      layout: "lightHorizontalLines",
      style: "tableCell",
    },
    {text: "Totais:", style: "totaisTitle"},
    {
      marginTop: 15,
      stack: [
        
        {columns: props.columns}
      ],
      style: "totalGeral"
    }
  ];

  const reportStyle = {
    tableStyle: {
      widths: ["100%"],
    },
    headerStyle: {
      fontSize: fontPrimary + 3,
      bold: true,
      margin: [0, 10, 0, 5] as types.Margins,
      alignment: "center",
      marginBottom: 15,
    },
    totaisTitle: {
      alignment: "left",
      fontSize: fontPrimary + 3,
      bold: true,
      margin: [0, 10, 0, 0] as types.Margins,
    },
    tableCell: {
      margin: [0, 15, 0, 0] as types.Margins,
      border: [false, true, false, true], // [left, top, right, bottom]
    },
    tableHeaderCell: {
      fillColor: "#dddddd", //  azul #ebebeb
      color: "#585858", // Cor do texto no cabeçalho da tabela
      border: [false, false, false, [false, false, false, true]], // [left, top, right, bottom]
      borderBottomColor: "#414141", // Cor da borda inferior do cabeçalho da tabela
      borderBottomWidth: 1, // Largura da borda inferior do cabeçalho da tabela
      bold: true, // Texto em negrito no cabeçalho da tabela
      alignment: "left", // Alinhamento do texto no cabeçalho da tabela
      margin: [0, 5, 0, 5] as types.Margins, // Margem superior e inferior do cabeçalho da tabela
    },
    subTotal: {
      fillColor: "#EAEAEA", // Cor de fundo do cabeçalho da tabela
      color: "#101010", // Cor do texto no cabeçalho da tabela
    },
    totalGeral: {
     // background: "#1d6bc4",
    //  fillColor: "#1d6bc4",
      color:"#303030",
      border: [false, true, false, false], // [left, top, right, bottom]
      borderColor: "#414141", // Cor da borda
      borderWidth: [0, 2, 0, 0], // Espessura da borda
    }
  };

  const pageConfig = {
    pageSize: "A4" as types.PredefinedPageSize, // Escolha o tamanho de página desejado
    pageMargins: [ 10, 100, 10, 10 ] as types.Margins, // left, top, right, bottom (aumente o valor da margem superior)
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
                  text: DateTimeFormat(new Date()),
                  fontSize: fontPrimary,
                  bold: true,
                  alignment: "right",
                  listType: "none",
                  margin: [0, 5, 10, 0] as types.Margins,
                },
              ],
            },
          ],
          height: 150
        },
      ];
     
      return reportTitle;
    },
    content: reportBody,
    styles: reportStyle as types.StyleDictionary,
  };
  pdfMake.createPdf(pageConfig).download(`${props.title} - ${DateTimeFormat(new Date())}`);
};

export default relatorioPDF;
