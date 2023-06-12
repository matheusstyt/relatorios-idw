export interface IConsolidadosResponse {
  postos?: IPosto[];
  ferramentas?: IFerramenta[];
  produtos?: IProduto[];

  horasTrabalhadasTotal: string;
  horasParadasTotal: string;
  tempoAtivoTotal: string;
  indiceParadasTotal: string;
  eficienciaRealizacaoTotal: string;
  pecasPrevistasTotal: string;
  pecasProduzidasTotal: string;
  pecasRefugadasTotal: string;
  pecasBoasTotal: string;
  indiceRefugosTotal: string;
  cicloPadraoTotal: string;
  cicloLidoTotal: string;
  eficienciaCicloTotal: string;
  eficienciaCicloPondTotal: string;
  indiceCavidadesAtivasTotal: string;
  oeeTotal: string;
  oeeCapTotal: string;
}

export interface IPosto {
  produtos?: IProduto[];
  ferramentas?: IFerramenta[];
  isPrimeiraLinha?: boolean | string;
  isLinhaTotal?: boolean | string;

  posto: string;
  ton: string;
  horasTrabalhadas: string;
  horasParadas: string;
  tempoAtivo: string;
  indiceParadas: string;
  oee: string;
  oeeCap: string;
  indPcsCiclo: string;
}

export interface IFerramenta {
  postos?: IPosto[];
  produtos?: IProduto[];
  isPrimeiraLinha?: boolean | string;
  isLinhaTotal?: boolean | string;

  ferramenta: string;
  cicloPadrao: string;
  cicloLido: string;
  eficienciaCiclo: string;
  cavidadesAtivas: string;
  cavidadesTotais: string;
  indiceCavidades: string;
}

export interface IProduto {
    ferramentas?: IFerramenta[];
    isPrimeiraLinha?: boolean | string;
    isLinhaTotal?: boolean | string;
    
    produto: string;
    pecasPrevistas: string;
    pecasProduzidas: string;
    pecasRefugadas: string;
    pecasBoas: string;
    indiceRefugo: string;
    eficienciaRealizacao: string;
  }
  