export interface IItem {
    op: string;
    pedido: string;
    cliente: string;
    situacao: string;
    dataPrevFim: string;
    molde: string;
    produto: string;
    plano: string;
    planoDouble: number;
    producao: string;
    producaoDouble: number;
    produzir: string;
    produzirDouble: number;
    maquina: string;
    prodMaq: string;
    prodMaqDouble: number;
  }
  
export interface IPlanejadoXRealizadoResponse {
itens: IItem[];
}
