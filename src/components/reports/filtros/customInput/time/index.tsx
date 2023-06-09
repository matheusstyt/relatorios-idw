import { useState } from "react";
import times from "./times.json";
import SelectIDW from "../select";

export default function SelectTime(props : any) {

    const [intervalListTime, setIntervalListTime] = useState<any[]>(times.intervals);
    const [intervalSelecionado, setIntervalSelecionado] = useState("");

    return (
         
      <SelectIDW
        id="Hora"
        label="Hora"
        name="Hora"
        options={intervalListTime}
        width="100%"
        value={intervalSelecionado}
        defaultValue={"todos"} 
        onChange={(value: any) => {
          setIntervalSelecionado(value?.target?.value);
            props.changed(value?.target?.value);
        } }
      />  
        
    )
}