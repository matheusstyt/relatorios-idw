import React, { useEffect, useState } from "react";
import SelectIDW from "../../../customInput/select"
import {  getAllToolsActive } from "../../../services";

const Ferramentas = (props : any) => {

    const [FerramentasValorSelecionado, setFerramentasValorSelecionado] = useState("");
    
    const [listaFerramentas, setListaFerramentas] = useState<any[]>([]);
        
    const startGetAllJobGroupActive = () => {

        getAllToolsActive("", 1, 10000).then((result) => {
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
            value={FerramentasValorSelecionado}
            defaultValue={"todos"} 
            onChange={(value: any) => {
                setFerramentasValorSelecionado(value?.target?.value);
                props.changed(value?.target?.value);
            } }
        />  
    )
}
export default Ferramentas;