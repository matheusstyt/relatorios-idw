import { getAllToolsActive } from "../../../../services";
import SelectIDW from "../../filtros/customInput/select";
import { useEffect, useState } from "react";


const Ferramentas = (props : any) => {
    
    const [listaFerramentas, setListaFerramentas] = useState<any[]>([]);
        
    const startGetAllJobGroupActive = () => {

        getAllToolsActive("", 1, 10000).then((result: any) => {
            if(result?.data!=null){
                let lista = result.data.map((i: any)=>{
                    return {
                        value: i?.cdRap,
                        name: `${i?.cdRap} - ${i?.dsRap}`
                    }
                });
                setListaFerramentas(lista);
            }
        });
    }
    useEffect(() => {
        startGetAllJobGroupActive();
    }, []);

    return (
        <SelectIDW
            id="Ferramentas"
            label="Ferramentas"
            name="Ferramentas"
            options={listaFerramentas}
            width="100%"
            value={props.value}
            defaultValue={"todos"} 
            onChange={(value: any) => {
                props.changed(value?.target?.value);
            } }
        />  
    )
}
export default Ferramentas;