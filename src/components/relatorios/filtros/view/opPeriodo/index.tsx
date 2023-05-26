import { Checkbox, FormControlLabel, FormLabel, RadioGroup, TextField } from "@mui/material"
import React, { useState } from "react";
import "./opPeriodo.scss";
import DateInput from "../../customInput/date";
import SelectIDW from "../../customInput/select";
import Tipos from "../subFiltros/tipos";
const OpPeriodo = () => {
    


    const [opChecked, setOpChecked] = useState<boolean>(false);
    const [opNumber, setOpNumber] = useState<string>("");

    const [periodoChecked, setPeriodoChecked] = useState<boolean>(false);

    const [dataInicio, setDataInicio] = useState<any>(new Date());
    const [dataTermino, setDataTermino] = useState<any>(new Date());

    const [turnoSelecionado, setTurnoSelecionado] = useState<any>("");

    const handleOp = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOpNumber((event.target as HTMLInputElement).value);
    };

    return (
        <div className="container op-periodo">
            <h3>OP e Período</h3>       
            <table>
                <tbody>
                    <tr>
                        <td className="td-first">
                            <FormControlLabel
                            value="OP"
                            label="OP"
                            name="OP"
                            className="form"
                            control={
                                <Checkbox 
                                    value={opChecked}
                                    onChange={() => {
                                        setOpChecked(!opChecked);
                                    }}
                                />
                            }
                            />
                        </td>
                        <td>
                            <TextField disabled={!opChecked} style={{ width : "100%" }} value={opNumber} onChange={handleOp} />
                        </td>
                    </tr>
                    <tr>
                        <td className="td-first"> 
                            <FormControlLabel 
                                value="Periodo"
                                label="Periodo"
                                name="Periodo"
                                className="form"
                                control={
                                    <Checkbox 
                                        value={periodoChecked}
                                        onChange={() => {
                                            setPeriodoChecked(!periodoChecked);
                                        }}
                                    />
                                }
                            />
                        </td>
                        <td>
                            <div className="calendar">
                                <DateInput 
                                    disabled={!periodoChecked}
                                    value={dataInicio}
                                    onChangeValue={ ( value : any) => {
                                        setDataInicio(value);
                                    } }
                                    label = "Dia de Início"
                                    helperText={"Campo obrigatório"}
                                />
                                <DateInput 
                                    disabled={!periodoChecked}
                                    value={dataTermino}
                                    onChangeValue={ ( value : any) => {
                                        setDataTermino(value);
                                    } }
                                    label = "Dia de Fim"
                                    helperText={"Campo obrigatório"}
                                />
                            </div>

                        </td>
                    </tr>
                    <tr>
                        <td className="td-first">
                            <FormLabel>Turno</FormLabel>
                        </td>
                        <td>
                            <SelectIDW
                                id="Turno"
                                label="Turno"
                                name="Turno"
                                options={[]}
                                width="100%"
                                value={turnoSelecionado}
                                onChange={(value: any) => {
                                    setTurnoSelecionado(value?.target?.value);
                                } }
                                defaultValue={"todos"} />
                        </td>
                    </tr>
                </tbody>
                
            </table>
            <Tipos changed={(value : any) => { alert(value) }}/>
        </div>

    )
}
export default OpPeriodo;