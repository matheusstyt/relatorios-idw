import { useState } from "react";
import SelectTime from "../../customInput/time";
import "./dataTurnoPosto.scss";
import DateInput from "../../customInput/date";
import { FormLabel } from "@mui/material";
import SelectIDW from "../../customInput/select";

const DataTurnoPosto = () => {
    const [dataInicio, setDataInicio] = useState<any>(new Date());
    const [dataTermino, setDataTermino] = useState<any>(new Date());
    const [horaInicio, setHoraInicio] = useState<string>("");
    const [horaFim, setHoraFim] = useState<string>("");
    const [postoSelecionado, setPostoSelecionado] = useState<string>("");
    function intervalInicio (value : string) {
        console.log(value);
    } 
    function intervalFim (value : string) {
        console.log(value);
    } 
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
                                } }
                                label = "Dia de Início"
                                helperText={"Campo obrigatório"}
                            />
                        </td>
                        <td>
                            <DateInput
                                value={dataInicio}
                                onChangeValue={ ( value : any) => {
                                    setDataInicio(value);
                                } }
                                label = "Dia de Fim"
                                helperText={"Campo obrigatório"}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <SelectTime changed={ (value : string) => setHoraInicio(value)} />
                        </td>
                        <td>
                            <SelectTime changed={ (value : string) => { setHoraFim(value) }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <FormLabel>Postos</FormLabel>
                        </td>
                        <td>
                        <SelectIDW
                            id="Posto"
                            label="Posto"
                            name="Posto"
                            options={[]}
                            width="100%"
                            value={postoSelecionado}
                            onChange={(value: any) => {
                                setPostoSelecionado(value?.target?.value);
                            } }
                            defaultValue={"todos"} />  
          
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default DataTurnoPosto;