import FichaTecnica from "../pages/reports/engenharia/ficharTecnica";
import IndiceParadas from "../pages/reports/paradas/indiceParadas";
import IndiceParadasXAreResponsavel from "../pages/reports/paradas/indiceParadasXAreaResponsavel";
import IndiceParadasXPosto from "../pages/reports/paradas/indiceParadasXPosto";
import OcorrenciaParada from "../pages/reports/paradas/ocorrenciaParada";
import QuantidadeParadas from "../pages/reports/paradas/quantidadeParada";
import PlanejadoRealizado from "../pages/reports/planejamento/planejadoRealizado";
import AcompanhamentoProducao from "../pages/reports/producao/acompanhamentoProducao";
import AnaliseProducao from "../pages/reports/producao/analiseProducao";
import Consolidados from "../pages/reports/producao/consolidados";
import IndiceRefugos from "../pages/reports/producao/indiceRefugos";
import ProducaoRegulagem from "../pages/reports/producao/producaoRegulagem";

export const APP_ROUTES = {
    REPORT: [
      {
        category : "stops",
        title : "Índice de Paradas (R027)",
        path : "indiceparada",
        element: <IndiceParadas title="Índice de Paradas (R027)" />
      },
      {
        category : "any",
        title : "Índices de Paradas Por Área Responsável (R028)",
        path : "indiceparadaxarea",
        element: <IndiceParadasXAreResponsavel title="Índices de Paradas Por Área Responsável (R028)"/>
      },
      {
        category : "stops",
        title : "Índice de Parada por Posto (R029)",
        path : "indiceparadaxposto",
        element: <IndiceParadasXPosto title="Índice de Parada por Posto (R029)" />
      },
      {
        category : "any",
        title : "Ocorrências de Paradas (R031)",
        path : "ocorrenciaparada",
        element: <OcorrenciaParada title="Ocorrências de Paradas (R031)" />
      },
      {
        category : "any",
        title : "Quantidade de Paradas (R033)",
        path : "quantidadeparada",
        element: <QuantidadeParadas title="Quantidade de Paradas (R033)" />
      },
      {
        category : "product",
        title : "Consolidados (R013)",
        path : "consolidados",
        element: <Consolidados title="Consolidados (R013)" />
      },
      {
        category : "product",
        title : "Análise de Produção e Eficiência Hora/Hora (R014)",
        path : "analiseproducaoeficiencia",
        element: <AnaliseProducao title="Análise de Produção e Eficiência Hora/Hora (R014)" />
      },
      {
        category : "product",
        title : "Acompanhamento de Produção (R015)",
        path : "acompanhamentoproducao",
        element: <AcompanhamentoProducao title="Acompanhamento de Produção (R015)" />
      },
      {
        category : "product",
        title : "Índice de Refugos (R020)",
        path : "refugo",
        element: <IndiceRefugos title="Índice de Refugos (R020)" />
      },
      {
        category : "product",
        title : "Produção em Regulagem (R025)",
        path : "producaoregulagem",
        element: <ProducaoRegulagem title="Produção em Regulagem (R025)" />
      },
      {
        category : "planejamento",
        title : "Planejado x Realizado (R036)",
        path : "planejadoxrealizado",
        element: <PlanejadoRealizado title="Planejado x Realizado (R036)" />
      },
      {
        category : "any",
        title : "Produção em Regulagem (R025)",
        path : "producaoregulagem",
        element: <IndiceParadasXAreResponsavel title="Produção em Regulagem (R025)" />
      },
      {
        category : "any",
        title : "OPs Processadas (R039)",
        path : "opprocessada",
        element: <IndiceParadasXAreResponsavel title="OPs Processadas (R039)" />
      },
      {
        category : "any",
        title : "Período de Maquina sem OP (R091)",
        path : "periodomaquinasemop",
        element: <IndiceParadasXAreResponsavel title="Período de Maquina sem OP (R091)" />
      },
      {
        category : "any",
        title : "Indicadores ABS (R042)",
        path : "indicadoresabs",
        element: <IndiceParadasXAreResponsavel title="Indicadores ABS (R042)" />
      },
      {
        category : "any",
        title : "Relatório de Produção (R043)",
        path : "relatorioproducao",
        element: <IndiceParadasXAreResponsavel title="Relatório de Produção (R043)" />
      },
      {
        category : "engineering",
        title : "Ficha Técnica - Produto (R001)",
        path : "fichatecnica",
        element: <FichaTecnica title="Ficha Técnica - Produto (R001)" />
      },
    ]

}