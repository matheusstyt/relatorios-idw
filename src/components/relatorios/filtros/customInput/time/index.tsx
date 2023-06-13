import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import times from "./times.json";

export default function SelectTime(props : any) {

    const [intervalListTime, setIntervalListTime] = useState<any[]>(times.intervals);
    const [intervalSelecionado, setIntervalSelecionado] = useState("00:00:00 - 01:00:00");

    return (
         
      <FormControl fullWidth>
          <Select
              value={intervalSelecionado}
              id="select-interval-time" 
              
              onChange={ (e) => {
                props.changed(e.target.value);
                setIntervalSelecionado(e.target.value);
              }}>
              { intervalListTime.map( (intevalo, index) => <MenuItem key={index} value={intevalo.hrIni}>{`${intevalo.hrIni} - ${intevalo.hrFim}`}</MenuItem> ) }
          </Select>
      </FormControl>
        
    )
}