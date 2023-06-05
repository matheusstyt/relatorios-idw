import { IItemRelatorio, ISubRelatorioIndiceParada } from "../../../components/relatorios/filtros/interface/indiceParadasXPosto";
import "./export.scss";
import headers from "./headers.json"
import { useEffect } from 'react';
export function Header(props : any) {
    return (
        <div className="export-header">
            <h2>{props.title}</h2>
            { props.components}
        </div>
    )
}

export function MainTable (props : any) {

    const tableHeader = headers.paradas.indiceParadasPosto;
    const  generateTable = () => {
        return ( 
            props.dados?.subRelatorioIndiceParadas?.map((row : ISubRelatorioIndiceParada, index : number) => {
                return <>
                    <table id="table-main">
                        <thead>
                            {
                                tableHeader.map( item => {
                                    return <th>{item}</th>
                                })
                            }
                        </thead>
                        <tbody>
                            <tr>
                                <td>{row?.maquina}</td>
                                <td>{ convertSecondsToTime( row?.tempoAtivo ) }</td>
                                <td>{row?.listaParadasRelatorio?.map((i, index) => <p key={index}>{i.parada}</p>)}</td>
                                <td>{row?.listaParadasRelatorio?.map((i, index) => <p key={index}>{i.quantidade}</p>)}</td>
                                <td>{row?.listaParadasRelatorio?.map((i, index) => <p key={index}>{convertSecondsToTime(i.tempoParada)}</p>)}</td>
                                <td>{row?.listaParadasRelatorio?.map((i, index) => <p key={index}>{i.indiceBA}</p>)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="container-totais">
                        <p>TEMPO DE PARADAS DO POSTO (C): { convertSecondsToTime( props.dados?.subRelatorioIndiceParadas?.find((i: any) => true)?.tempoParadas) }</p>
                        <p>HORAS PRODUTIVAS: {convertSecondsToTime(props.dados?.subRelatorioIndiceParadas?.find((i: any) => true)?.horasProdutivas)}</p>
                        <p>% DISP.: {props.dados?.subRelatorioIndiceParadas?.find((i: any) => true)?.disponibilidade?.toFixed(2)}</p>
                        <p>ÍNDICE (C)/(A): {props.dados?.subRelatorioIndiceParadas?.find((i: any) => true)?.indiceCA}</p>
                        <p>ÍNDICE (C)/(D): {props.dados?.subRelatorioIndiceParadas?.find((i: any) => true)?.indiceCD}</p>
                        <p>QTDE OCORR. PPE: {props.dados?.subRelatorioIndiceParadas?.find((i: any) => true)?.qtdOcorrenciasPPE}</p>
                        <p>QTDE OCORR. MTBF/MTTR: {props.dados?.subRelatorioIndiceParadas?.find((i: any) => true)?.qtdMTTR_MTBF}</p>
                        <p>TEMPO PARADAS MTBF/MTTR: {props.dados?.subRelatorioIndiceParadas?.find((i: any) => true)?.tempoMTTR_MTBF}</p>
                        <p>MTTR (min): {props.dados?.segMTTR}</p>
                        <p>MTBF (min): {props.dados?.segMTBF?.toFixed(2)}</p>
                    </div>
                </>
            })     
        )
    }
    useEffect(() => {
        generateTable()
    }, [props.dados]);

    return (
        <>
            {generateTable()}
        </>
    )
}
export function TotalGeralIndiceParadaXPosto (props : any) {
    return (
        <div className="container-totais" id="totais-totais">
            <p>TEMPO ATIVO TOTAL (D): { convertSecondsToTime(props.dados?.tempoAtivo)}</p>
            <p>TEMPO PARADAS SEM PESO NA EFICIENCIA: { convertSecondsToTime(props.dados?.tempoParadasSP) }</p>
            <p>TEMPO PARADAS COM PESO NA EFICIENCIA (E): { convertSecondsToTime(props.dados?.tempoParadasCP) }</p>
            <p>HORAS PRODUTIVAS: { convertSecondsToTime(props.dados?.horasProdutivas)}</p>
            <p>ÍNDICE (E)/(D): {props.dados?.indiceED}</p>
            <p>QTDE OCORR. PPE: {props.dados?.qtdOcorrenciasPPE}</p>
            <p>QTDE OCORR. MTBF/MTTR: {props.dados?.qtdMTTR_MTBF}</p>
            <p>TEMPO PARADAS MTBF/MTTR: { convertSecondsToTime(props.dados?.tempoMTTR_MTBF) }</p>
            <p>% DISP.: {props.dados?.disponibilidade?.toFixed(2)}</p>
            <p>MTTR (min): {props.dados?.segMTTR}</p>
            <p>MTBF (min): {props.dados?.segMTBF?.toFixed(2)}</p>
        </div>
    )
}

export function DateFormat(date : any){
    let year, month, day;
    if (date instanceof Date) {

        year = date.getFullYear();
        month = (date.getMonth() + 1).toString().padStart(2, '0');
        day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;

    } else if (typeof date === 'object' && date.$d instanceof Date) {
        year = date.$d.getFullYear();
        month = (date.$d.getMonth() + 1).toString().padStart(2, '0');
        day = date.$d.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;

    } else if (typeof date === 'string') {

        const dateFormat = new Date(date);
        year = dateFormat.getFullYear();
        month = (dateFormat.getMonth() + 1).toString().padStart(2, '0');
        day = dateFormat.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return null;

}
export function convertSecondsToTime(seconds: any) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor((seconds % 3600) % 60);
    const milliseconds = Math.floor((seconds % 1) * 1000);

    const zeroEsquerda = (value: number) => {
        return value.toString().padStart(2, '0');
      };
  
    return `${zeroEsquerda(hours)}:${zeroEsquerda(minutes)}:${zeroEsquerda(remainingSeconds)}:${zeroEsquerda(milliseconds)}`;
  }


    // const dinamicBody = (row : any) => {
    //     return  (<table id="table-main">
    //                 <thead>
    //                 {
    //                     tableHeader.map( item => {
    //                         return <th>{item}</th>
    //                     })
    //                 }
    //                 </thead>
    //                 <tbody>
    //                     <tr>
    //                         <td>{row?.maquina}</td>
    //                         <td>{ convertSecondsToTime( row?.tempoAtivo ) }</td>
    //                         <td>{row?.listaParadasRelatorio?.map((i, index) => <p key={index}>{i.parada}</p>)}</td>
    //                         <td>{row?.listaParadasRelatorio?.map((i, index) => <p key={index}>{i.quantidade}</p>)}</td>
    //                         <td>{row?.listaParadasRelatorio?.map((i, index) => <p key={index}>{convertSecondsToTime(i.tempoParada)}</p>)}</td>
    //                         <td>{row?.listaParadasRelatorio?.map((i, index) => <p key={index}>{i.indiceBA}</p>)}</td>
    //                     </tr>
    //                 </tbody>
    //             </table>)
    // }

                            {/* {
                            indicesPercorrido2.map((i) => (
                                <td key={i}>{
                                    Object.values(row)[i]
                                }</td>
                            ))
                        } */}
