import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import types from "pdfmake/interfaces";
const relatorioPDF = (props : any) => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  // Configurações extras
  const pageOrientation : types.PageOrientation = "portrait"; // ou "landscape"

  const reportTitle = [{ text: props.title, style: "headerStyle", fontSize: 12, bold: true }];
  props?.body?.forEach((row: any) => {
  })
  const reportBody = [
    {
      ul: props.descricao?.map((i: any) => ({ text: `${i.propery}: ${i.description}`, fontSize: 9 })),
    },
    {
      table: {
        body: [
          props?.headers,
          ...props?.body.map((row: any) => row),
        ],
      },
      layout: 'lightHorizontalLines',
      style: 'tableCell',
      
    },
  ];
  
  
  const reportFooter = [{ text: "Rodapé do Relatório", fontSize: 12, bold: true }];

  const reportStyle = {
    headerStyle: {
      fontSize: 16,
      bold: true,
      alignment: 'center'
    },
    anotherStyle: {
      italics: true,
      alignment: 'center'
    },
    tableCell: {
      border: [false, true, false, true], // [left, top, right, bottom]
    },
  };
  const pageConfig = {
    pageSize: "A4" as types.PredefinedPageSize, // Escolha o tamanho de página desejado
    pageMargins: [15, 15, 15, 15] as types.Margins, // left, top, right, bottom

    header: reportTitle,
    content: reportBody,
    footer: reportFooter,
    
    styles: reportStyle as types.StyleDictionary
  };

  pdfMake.createPdf(pageConfig).download();
};

export default relatorioPDF;
