import SelectTime from "../customInput/time";
import Postos from "../../subFiltros/postos";
import DateInput from "../customInput/date";
import { FormLabel } from "@mui/material";

const DataTurnoPosto = (props : any) => {
    return (
        <div className="container data-turno-posto">
            <h3>Data, Turnos e Posto</h3>
            <table>
                <thead>
                    <tr>
                        <th>Início</th>
                        <th>Fim</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <DateInput
                                value={props.dataInicio}
                                onChangeValue={ ( value : any) => props.changeDataInicio(value) }
                                label = "Dia de Início"
                                helperText={"Campo obrigatório"}
                            />
                        </td>
                        <td>
                            <DateInput
                                value={props.dataTermino}
                                onChangeValue={ ( value : any) => props.changeDataTermino(value) }
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
                        <Postos 
                            value={props.postoValor}
                            changed={(value : any) => props.changePostoValor(value)}
                        />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default DataTurnoPosto;