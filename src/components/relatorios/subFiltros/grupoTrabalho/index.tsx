import React, { useEffect, useState } from "react";
import { getAllJobGroupActive } from "../../filtros/services";
import SelectIDW from "../../filtros/customInput/select";

const GrupoTrabalho = (props : any) => {

    const [grupoTrabalhoValorSelecionado, setGrupoTrabalhoValorSelecionado] = useState("");
    
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
            value={grupoTrabalhoValorSelecionado}
            defaultValue={"todos"} 
            onChange={(value: any) => {
                setGrupoTrabalhoValorSelecionado(value?.target?.value);
                props.changed(value?.target?.value);
            } }
        />  
    )
}

export default GrupoTrabalho;