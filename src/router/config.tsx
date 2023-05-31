import IndiceParadas from "../pages/reports/paradas/indiceParadas";
import IndiceParadasXAreResponsavel from "../pages/reports/paradas/indiceParadasXAreaResponsavel";

export const APP_ROUTES = {
    REPORT: [
      {
        title : "Índice de Paradas (R027)",
        path : "indiceparada",
        element: <IndiceParadas />
      },
      {
        title : "Índices de Paradas Por Área Responsável (R028)",
        path : "indiceparadaxarea",
        element: <IndiceParadasXAreResponsavel />
      },
      {
        title : "Índice de Parada por Máquinas (R029)",
        path : "indiceparadaxmaquina",
        element: <IndiceParadasXAreResponsavel />
      },
      {
        title : "Ocorrências de Paradas (R031)",
        path : "ocorrenciaparada",
        element: <IndiceParadasXAreResponsavel />
      },
      {
        title : "Quantidade de Paradas (R033)",
        path : "quantidadeparada",
        element: <IndiceParadasXAreResponsavel />
      },
      {
        title : " Consolidados (R013)",
        path : "consolidados",
        element: <IndiceParadasXAreResponsavel />
      },
      {
        title : "Análise de Produção e Eficiência Hora/Hora (R014)",
        path : "analiseproducaoeficiencia",
        element: <IndiceParadasXAreResponsavel />
      },
      {
        title : "Acompanhamento de Produção (R015)",
        path : "acompanhamentoproducao",
        element: <IndiceParadasXAreResponsavel />
      },
      {
        title : "Refugos (R020)",
        path : "refugo",
        element: <IndiceParadasXAreResponsavel />
      },
      {
        title : "Produção em Regulagem (R025)",
        path : "producaoregulagem",
        element: <IndiceParadasXAreResponsavel />
      },
      {
        title : "OPs Processadas (R039)",
        path : "opprocessada",
        element: <IndiceParadasXAreResponsavel />
      },
      {
        title : "Período de Maquina sem OP (R091)",
        path : "periodomaquinasemop",
        element: <IndiceParadasXAreResponsavel />
      },
      {
        title : "Indicadores ABS (R042)",
        path : "indicadoresabs",
        element: <IndiceParadasXAreResponsavel />
      },
      {
        title : "Relatório de Produção (R043)",
        path : "relatorioproducao",
        element: <IndiceParadasXAreResponsavel />
      },
    
    ]

}