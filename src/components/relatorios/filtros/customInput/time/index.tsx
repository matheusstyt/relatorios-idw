import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

export default function SelectTime(props : any) {

    // lógica pro intervalo de horas
    const [intervalTime, setIntervalTime] = useState<any[]>([]);

    useEffect(() => {
        const horasDoDia = [];
      
        for (let hora = 0; hora < 24; hora++) {
          const inicio = `${hora.toString().padStart(2, '0')}:00:00`;
          const fim = `${(hora + 1).toString().padStart(2, '0')}:00:00`;
      
          const intervalo = `${inicio} - ${fim}`;
          horasDoDia.push(intervalo);
        }
      
        horasDoDia.push("24:00:00 - 01:00:00");
        setIntervalTime(horasDoDia);
      }, []);
    // fim da lógica

    const [intervaloHora, setIntervaloHora] = useState("00:00:00 - 01:00:00");

    return (
         
      <FormControl fullWidth>
          <Select
              value={intervaloHora}
              id="select-interval-time" 
              onChange={ (e) => {
                props.changed(e.target.value);
                setIntervaloHora(e.target.value);
              }}>
              { intervalTime.map( intevalo => <MenuItem value={intevalo}>{intevalo}</MenuItem> ) }
          
          </Select>
      </FormControl>
        
    )
}