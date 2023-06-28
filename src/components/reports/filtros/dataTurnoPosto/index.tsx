import SelectTime from "../customInput/time";
import Postos from "../../subFiltros/postos";
import DateInput from "../customInput/date";
import { FormLabel } from "@mui/material";
import { useState } from "react";

const DataTurnoPosto = (props : any) => {
    const [dataInicio, setDataInicio] = useState<any>(new Date());
    const [dataTermino, setDataTermino] = useState<any>(new Date());

    return (
        <div className="container data-turno-posto">
            <h3>Data, Turnos e Posto</h3>
            <table>
                <thead>
                    <th>Início</th>
                    <th>Fim</th>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <DateInput
                                value={dataInicio}
                                onChangeValue={ ( value : any) => {
                                    setDataInicio(value);
                                    props.dataInicio(value);
                                } }
                                label = "Dia de Início"
                                helperText={"Campo obrigatório"}
                            />
                        </td>
                        <td>
                            <DateInput
                                value={dataTermino}
                                onChangeValue={ ( value : any) => {
                                    setDataTermino(value);
                                    props.dataTermino(value);
                                } }
                                label = "Dia de Fim"
                                helperText={"Campo obrigatório"}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <SelectTime 
                                changed={ (value : string) => {
                                    props.horaInicio(value);
                                }} />
                        </td>
                        <td>
                            <SelectTime 
                            changed={ (value : string) => { 
                                props.horaTermino(value);
                                }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <FormLabel>Postos</FormLabel>
                        </td>
                        <td>
                        <Postos changed={(value : any) => props.posto(value)} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default DataTurnoPosto;