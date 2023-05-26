import { Checkbox, FormControl, FormControlLabel, MenuItem, Select } from "@mui/material";
import "./areaResponsavel.scss";
import teste  from "./areas.json";
import { useEffect, useState } from "react";
import Mult from "./multi";
const AreaResponsavel = () => {

    const [areasSelecionadas, setAreasSelecionadas] = useState<any[]>([]);
    const [todasSelecionado, setTodasSelecionado] = useState<boolean>(false);
    useEffect(() => {
        
    })
    return(
        <div className="container area-responsavel">
            <h3>Área Responsável</h3>
            <FormControlLabel 
                label="Todas as Áreas Responsáveis"
                value={todasSelecionado}
                control={ <Checkbox onChange={() => { setTodasSelecionado(!todasSelecionado) }} />}
            />

            <Mult disabled={todasSelecionado} changed={(novaLista : any) => { setAreasSelecionadas(novaLista) } }/>

        </div>
    )
}
export default AreaResponsavel;