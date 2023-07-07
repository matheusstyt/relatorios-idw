import { useState } from "react";
import DateInput from "../customInput/date";
import SelectTime from "../customInput/time";

const IntervaloContagem = (props : any) => {
    return (
        <div className="container intervalo-contagem">
            <h3>Intervalo e Contagem de Produção</h3>
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
                </tbody>
            </table>
        </div>
    )
}

export default IntervaloContagem;