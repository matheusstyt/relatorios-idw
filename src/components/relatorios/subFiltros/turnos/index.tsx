import React, { useEffect, useState } from "react";
import { getAllShifts } from "../../filtros/services";
import SelectIDW from "../../filtros/customInput/select";

const Turnos = (props : any) => {

    const [turnoValorSelecionado, setTurnoValorSelecionado] = useState("");
    
    const [listaTurnos, setListaTurnos] = useState<any[]>([])
        
    const startGetAllShifts = () => {

        getAllShifts()
        .then((response: any)=>{
            if(response?.data!=null){
                let tempList = response.data.items.map((i: any)=>{
                 return {
                     value: i?.cdTurno,
                     name: i?.dsTurno
                 }
                });
                tempList.unshift({
                 value: "todos",
                 name: "TODOS"
                })
                setListaTurnos(tempList);  
            }
         })
    }

    useEffect(() => {
        startGetAllShifts();
    }, []);

    return (
        <SelectIDW
            id="Turno"
            label="Turnos"
            name="Turno"
            options={listaTurnos}
            width="100%"
            value={turnoValorSelecionado}
            defaultValue={"todos"} 
            onChange={(value: any) => {
                setTurnoValorSelecionado(value?.target?.value);
                props.changed(value?.target.value);
            } }
            />  
    )
}

export default Turnos;