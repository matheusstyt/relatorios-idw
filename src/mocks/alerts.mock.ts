interface IListColumns {
  field: string;
  name: string;
  width: string;
  justifyLastColumn?: boolean;
}

export interface IAlerts {
  cdPT: string;
  cdAlerta: string;
  dsAlerta: string;
  dthrIniAlerta: string;
  dthrFimAlerta: string;
  nmUsrResp?: string;
  observacao?: string;
}

export const COLUMNS_ALERTS: IListColumns[] = [
  {
    field: 'cdPt',
    name: 'Posto',
    width: '10%',
  },
  {
    field: 'dthrIniAlerta',
    name: 'Data/Hora Início Alerta',
    width: '10%',
  },
  {
    field: 'tpAlerta',
    name: 'Tipo de Alerta',
    width: '10%',
  },
  {
    field: 'dthrFimAlerta',
    name: 'Data/Hora Fim Alerta',
    width: '10%',
  },
  {
    field: 'nmUsrResp',
    name: 'Responsável',
    width: '10%',
  },
  {
    field: 'observacao',
    name: 'Observação',
    width: '10%',
  },
  {
    field: 'actions',
    name: 'Ajustar',
    width: '10%',
  },
];
export const COLUMNS_ALERTS_ACUMULADO: IListColumns[] = [
  {
    field: 'dthrIniAlerta',
    name: 'Data/Hora Início Alerta',
    width: '10%',
  },
  {
    field: 'tpAlerta',
    name: 'Tipo de Alerta',
    width: '10%',
  },
  {
    field: 'dthrFimAlerta',
    name: 'Data/Hora Fim Alerta',
    width: '10%',
  },
  {
    field: 'nmUsrResp',
    name: 'Responsável',
    width: '10%',
  },
  {
    field: 'observacao',
    name: 'Observação',
    width: '10%',
  },
  {
    field: 'actions',
    name: 'Ajustes',
    width: '10%',
  },
];

export const COLUMNS_ALERTS_MANUAIS: IListColumns[] = [
  {
    field: 'cdPt',
    name: 'Posto',
    width: '10%',
  },
  {
    field: 'dthrIniAlerta',
    name: 'Data/Hora Alerta',
    width: '25%',
  },
  {
    field: 'cdAlerta',
    name: 'Alerta',
    width: '25%',
  },
  {
    field: 'dsAlerta',
    name: 'Descrição',
    width: '25%',
  },
  {
    field: 'dthrFimAlerta',
    name: 'Data/Hora Fim',
    width: '25%',
  },
];
export const COLUMNS_ALERTS_MANUAIS_ACUMULADO = [
  {
    field: 'dthrIniAlerta',
    name: 'Data/Hora Alerta',
    width: '25%',
  },
  {
    field: 'cdAlerta',
    name: 'Alerta',
    width: '25%',
  },
  {
    field: 'dsAlerta',
    name: 'Descrição',
    width: '25%',
  },
  {
    field: 'dthrFimAlerta',
    name: 'Data/Hora Fim',
    width: '25%',
  },
];
