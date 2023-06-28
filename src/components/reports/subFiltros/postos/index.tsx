import SelectIDW from "../../filtros/customInput/select";
import { getAllWorkStation } from "../../services";
import { useEffect, useState } from "react";

const Postos = (props : any) => {

    const [postoValorSelecionado, setPostoValorSelecionado] = useState("");
    
    const [listaPostos, setListaPostos] = useState<any[]>([])
        
    const startGetAllWorkstation = () => {

        getAllWorkStation("", 1, 10000)
        .then((result : any) => {
            
            let lista = result.data.map((i: any)=>{
                return {
                    value: i?.cdPt,
                    name: `${i?.cdPt} - ${i?.dsPt}`
                }
            });
            setListaPostos(lista);
        })
    }

    useEffect(() => {
        startGetAllWorkstation();
    }, []);

    return (
        <SelectIDW
            id="Posto"
            label="Posto"
            name="Posto"
            options={listaPostos}
            width="100%"
            value={postoValorSelecionado}
            defaultValue={"todos"} 
            onChange={(value: any) => {
                setPostoValorSelecionado(value?.target?.value);
                props.changed(value?.target?.value);
            } }
            />  
    )
}

export default Postos;