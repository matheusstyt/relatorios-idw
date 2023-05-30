import { Checkbox, FormControl, FormControlLabel, MenuItem, Select } from "@mui/material";
import "./areaResponsavel.scss";
import { useState } from "react";
import Mult from "./multi";
import React from "react";
const AreaResponsavel = (props: any) => {

    const [todasSelecionado, setTodasSelecionado] = useState<boolean>(false);
    
    return(
        <div className="container area-responsavel">
            <h3>Área Responsável</h3>
            <FormControlLabel 
                label="Todas as Áreas Responsáveis"
                value={todasSelecionado}
                control={ <Checkbox onChange={(e) => { 
                    setTodasSelecionado(!todasSelecionado); 
                    props.todasSelecionado(!todasSelecionado);
                }} />}
            />

            <Mult disabled={todasSelecionado} changed={(novaLista : any) => { 
                props.changed(novaLista);
                } }/>

        </div>
    )
}
export default AreaResponsavel;