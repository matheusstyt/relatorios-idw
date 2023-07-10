import { getAllToolsGroupActive } from "../../../../services";
import SelectIDW from "../../filtros/customInput/select";
import  { useEffect, useState } from "react";


const GrupoFerramentas = (props : any) => {

    const [listaGrupoFerramentas, setListaGrupoFerramentas] = useState<any[]>([]);
        
    const startGetAllWorkstation = () => {

        getAllToolsGroupActive("", 1, 10000).then((result : any) => {
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
            value={props.value}
            defaultValue={"todos"} 
            onChange={(value: any) => {
                props.changed(value?.target?.value);
            } }
        />  
    )
}
export default GrupoFerramentas;