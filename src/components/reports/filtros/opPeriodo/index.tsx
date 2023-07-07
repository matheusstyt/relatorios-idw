import { Checkbox, FormControlLabel, FormLabel, TextField } from "@mui/material"
import Periodo from "../../subFiltros/periodo";
import Turnos from "../../subFiltros/turnos";
import "../../styles/index.scss";
const OpPeriodo = (props : any) => {
    return (
        <div className="container op-periodo">
            <h3>OP e Período</h3>       
            <table className="table-filtro">
                <tbody>
                    <tr>
                        <td>
                            <FormControlLabel
                            value="OP"
                            label="OP"
                            name="OP"
                            className="form"
                            control={
                                <Checkbox 
                                    checked={props.OPChecked}
                                    onChange={() => {
                                        props.changeOPChecked(!props.OPChecked);
                                    }}
                                />
                            }
                            />
                        </td>
                        <td>
                            <TextField 
                                disabled={!props.OPChecked} 
                                style={{ width : "100%" }} 
                                value={props.OPNumber} 
                                onChange={e => {
                                    props.changeOPNumber(e.target.value);
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
                                        checked={props.periodoChecked}
                                        onChange={() => {
                                            props.changePeriodoChecked(!props.periodoChecked);
                                        }}
                                    />
                                }
                            />
                        </td>
                        <td>
                            <Periodo 
                                dataInicio={props.dataInicio}
                                changeDataInicio={(value: any) => props.changeDataInicio(value)}
                                dataTermino={props.dataTermino}
                                changeDataTermino={(value: any) => props.changeDataTermino(value)}
                                disabled={props.periodoChecked}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="td-first">
                            <FormLabel>Turno</FormLabel>
                        </td>
                        <td>
                            <Turnos 
                                turno={props.turno}
                                changeTurno={(value: any) => props.changeTurno(value)} 
                            />
                        </td>
                    </tr>
                </tbody>
                
            </table>
        </div>

    )
}
export default OpPeriodo;