import React, { useEffect, useState } from "react";
import SelectIDW from "../../../customInput/select"
import { getAllToolsGroupActive } from "../../../services";

const GrupoFerramentas = (props : any) => {

    const [grupoFerramentasValorSelecionado, setGrupoFerramentasValorSelecionado] = useState("");
    
    const [listaGrupoFerramentas, setListaGrupoFerramentas] = useState<any[]>([]);
        
    const startGetAllWorkstation = () => {

        getAllToolsGroupActive("", 1, 10000).then((result) => {
            if(result?.data!=null){
                let listTemp = result.data.map((i: any)=>{
                 return {
                     value: i?.cdGrpRAP,
                     name: `${i?.cdGrpRAP} - ${i?.dsGrpRAP}`
                 }
                });
                setListaGrupoFerramentas(listTemp);
                
            }
        });
    }

    useEffect(() => {
        startGetAllWorkstation();
    }, []);

    return (
        <SelectIDW
            id="grupoFerramentas"
            label="Grupos de Ferramentas"
            name="grupoFerramentas"
            options={listaGrupoFerramentas}
            width="100%"
            value={grupoFerramentasValorSelecionado}
            defaultValue={"todos"} 
            onChange={(value: any) => {
                setGrupoFerramentasValorSelecionado(value?.target?.value);
                props.changed(value?.target?.value);
            } }
        />  
    )
}
export default GrupoFerramentas;