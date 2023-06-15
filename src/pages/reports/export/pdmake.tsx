import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import types from "pdfmake/interfaces";
const relatorioPDF = (table : any) => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  // Configurações extras
  const pageOrientation : types.PageOrientation = "portrait"; // ou "landscape"

  const reportTitle = [{ text: "Título do Relatório", fontSize: 18, bold: true }];

  const reportBody = [
    { text: "Exemplo de conteúdo do relatório", fontSize: 14 },
    {
      table: {
        body: [
          ["Coluna 1", "Coluna 2", "Coluna 3"],
          ["Dado 1", "Dado 2", "Dado 3"],
          ["Dado 4", "Dado 5", "Dado 6"],
        ],
      },
    },
  ];

  const reportFooter = [{ text: "Rodapé do Relatório", fontSize: 12, bold: true }];

  const pageConfig = {
    pageSize: "A4" as types.PredefinedPageSize, // Escolha o tamanho de página desejado
    pageMargins: [15, 50, 15, 40] as types.Margins, // left, top, right, bottom

    header: reportTitle,
    content: reportBody,
    footer: reportFooter,
  };

  pdfMake.createPdf(pageConfig).download();
};

export default relatorioPDF;
