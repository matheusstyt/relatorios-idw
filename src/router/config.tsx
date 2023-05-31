import IndiceParadas from "../pages/reports/paradas/indiceParadas";
import IndiceParadasXAreResponsavel from "../pages/reports/paradas/indiceParadasXAreaResponsavel";
import IndiceParadasXPosto from "../pages/reports/paradas/indiceParadasXPosto";
import OcorrenciaParada from "../pages/reports/paradas/ocorrenciaParada";
import QuantidadeParadas from "../pages/reports/paradas/quantidadeParada";
import AcompanhamentoProducao from "../pages/reports/producao/acompanhamentoProducao";
import AnaliseProducao from "../pages/reports/producao/analiseProducao";
import Consolidados from "../pages/reports/producao/consolidados";

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
        title : "Índice de Parada por Posto (R029)",
        path : "indiceparadaxposto",
        element: <IndiceParadasXPosto />
      },
      {
        title : "Ocorrências de Paradas (R031)",
        path : "ocorrenciaparada",
        element: <OcorrenciaParada />
      },
      {
        title : "Quantidade de Paradas (R033)",
        path : "quantidadeparada",
        element: <QuantidadeParadas />
      },
      {
        title : " Consolidados (R013)",
        path : "consolidados",
        element: <Consolidados />
      },
      {
        title : "Análise de Produção e Eficiência Hora/Hora (R014)",
        path : "analiseproducaoeficiencia",
        element: <AnaliseProducao />
      },
      {
        title : "Acompanhamento de Produção (R015)",
        path : "acompanhamentoproducao",
        element: <AcompanhamentoProducao />
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