import { Checkbox, FormControlLabel, FormLabel, TextField } from "@mui/material"
import { useState } from "react";
import "./opPeriodo.scss";
import Periodo from "../../../subFiltros/periodo";
import Turnos from "../../../subFiltros/turnos";

const OpPeriodo = (props : any) => {
    


    const [opChecked, setOpChecked] = useState<boolean>(false);
    const [opNumber, setOpNumber] = useState<string>("");

    const [periodoChecked, setPeriodoChecked] = useState<boolean>(false);

    const [dataInicio, setDataInicio] = useState<any>(new Date());
    const [dataTermino, setDataTermino] = useState<any>(new Date());

    const [turnoSelecionado, setTurnoSelecionado] = useState<any>("");

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
                                        props.OPChecked(!opChecked);
                                    }}
                                />
                            }
                            />
                        </td>
                        <td>
                            <TextField 
                                disabled={!opChecked} 
                                style={{ width : "100%" }} 
                                value={opNumber} 
                                onChange={e => {
                                    setOpNumber(e.target.value);
                                    props.OpNumber(e.target.value);
                                }} 
                            />
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
                                            props.periodoChecked(!periodoChecked);
                                        }}
                                    />
                                }
                            />
                        </td>
                        <td>
                            <Periodo 
                                changeDataInicio={(value: any) => {
                                    props.dataInicio(value);
                                    setDataInicio(value);
                                }}
                                changeDataTermino={(value: any) => {
                                    props.dataTermino(value);
                                    setDataTermino(value);
                                }}
                                dataInicio={dataInicio}
                                dataTermino={dataTermino}
                                disabled={periodoChecked}
                            />
                           
                        </td>
                    </tr>
                    <tr>
                        <td className="td-first">
                            <FormLabel>Turno</FormLabel>
                        </td>
                        <td>
                            <Turnos changed={(value: any) => { 
                                setTurnoSelecionado(value);
                                props.turno(value);
                            }} />
                        </td>
                    </tr>
                </tbody>
                
            </table>
        </div>

    )
}
export default OpPeriodo;