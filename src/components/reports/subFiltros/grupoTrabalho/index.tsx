import SelectIDW from "../../filtros/customInput/select";
import { getAllJobGroupActive } from "../../services";
import { useEffect, useState } from "react";

const GrupoTrabalho = (props : any) => {
    
    const [listaGrupoTrabalho, setListaGrupoTrabalho] = useState<any[]>([]);
        
    const startGetAllJobGroupActive = () => {

        getAllJobGroupActive("", 1, 10000)
        .then(((res: any)=>{
          
            let tempList = res.data.map((i: any)=>{
                return {
                    value: i?.cdGt,
                    name: `${i?.cdGt} - ${i?.dsGt}`
                }
               });
               setListaGrupoTrabalho(tempList);
        }));
    }

    useEffect(() => {
        startGetAllJobGroupActive();
    }, []);

    return (
        <SelectIDW
            id="grupoTrabalho"
            label="Grupos de Trabalho"
            name="grupoTrabalho"
            options={listaGrupoTrabalho}
            width="100%"
            value={props.value}
            defaultValue={"todos"} 
            onChange={(value: any) => {
                props.changed(value?.target?.value);
            } }
        />  
    )
}

export default GrupoTrabalho;