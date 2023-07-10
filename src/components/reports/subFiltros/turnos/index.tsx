import { getAllShiftsSemCalativos } from "../../../../services";
import SelectIDW from "../../filtros/customInput/select";
import { useEffect, useState } from "react";

const Turnos = (props : any) => {
   
    const [listaTurnos, setListaTurnos] = useState<any[]>([])
        
    const getAllShiftsSemCalA = () => {

        getAllShiftsSemCalativos()
        .then((response: any)=>{
            if(response?.data!=null){
                let tempList = response.data.map((i: any)=>{
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
        getAllShiftsSemCalA();
    }, []);

    return (
        <SelectIDW
            id="Turno"
            label="Turnos"
            name="Turno"
            options={listaTurnos}
            width="100%"
            value={props.turno}
            defaultValue={"todos"} 
            onChange={(value: any) => props.changeTurno(value?.target.value)}
            />  
    )
}

export default Turnos;