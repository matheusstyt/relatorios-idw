import { useState } from "react";
import "../../styles/index.scss";
import { Checkbox, FormControlLabel, FormLabel } from "@mui/material";
import Turnos from "../../subFiltros/turnos";
import DateInput from "../customInput/date";

const PeriodoTurno = (props : any) => {

    const [periodoChecked, setPeriodoChecked] = useState<boolean>(false);
    
    const [dataInicio, setDataInicio] = useState<any>(new Date());
    const [dataTermino, setDataTermino] = useState<any>(new Date());
    
    const [turnoSelecionado, setTurnoSelecionado] = useState<any>("");

    return (
        <div className="container periodo-turno">
            <h3>Períodos e Turnos</h3>
            <table className="table-filtro">
                <tbody>
                    <tr>
                        <td>
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
                                            props.periodoChecked(!periodoChecked);
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
                                        props.dataInicio(value);
                                    }}
                                    label = "Dia de Início"
                                    helperText={"Campo obrigatório"}
                                />
                                <DateInput 
                                    disabled={!periodoChecked}
                                    value={dataTermino}
                                    onChangeValue={ ( value : any) => {
                                        setDataTermino(value);
                                        props.dataTermino(value);
                                    }}     
                                    label = "Dia de Fim"
                                    helperText={"Campo obrigatório"}
                                />
                            </div>

                        </td>
                    </tr>
                    <tr>
                        <td>
                            <FormLabel>Turno</FormLabel>
                        </td>
                        <td>
                            <Turnos changed={(value: any) => { props.turno(value) }} />
                        </td>
                    </tr>
                </tbody>
                
            </table>
        </div>
    )
}
export default PeriodoTurno;