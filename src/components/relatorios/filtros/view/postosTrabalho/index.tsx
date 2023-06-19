import { useState } from "react";
import "./postos.scss";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import Postos from "../../../subFiltros/postos";
import GrupoTrabalho from "../../../subFiltros/grupoTrabalho";
const PostosTrabalho = (props : any) => {
    const [postoSelecionado, setPostoSelecionado] = useState("Postos");

    const SelectPostoFerramenta = ()=>{
        if(postoSelecionado === "Postos"){
            return <Postos changed={(value : any) => props.postoTrabalhoValorSelecionado(value) }/>
        }
        else if(postoSelecionado === "grupoTrabalho"){
            return <GrupoTrabalho changed={(value : any) => props.postoTrabalhoValorSelecionado(value) }/>
        }
    } 
    return (
        <div className="container postos">
            <h3>Postos</h3>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={postoSelecionado}
                name="radio-buttons-group"
                className="radio"
                onChange={(e) => { 
                    setPostoSelecionado(e.target.value);
                    props.postoTrabalhoSelecionado( e.target.value )

                }}
            >
                <FormControlLabel
                    value="Postos"
                    label="Postos"
                    data-label="Postos"
                    name="Postos"
                    className="form"
                    control={ <Radio />}
                />
            
                <FormControlLabel
                    value="grupoTrabalho"
                    data-label="Grupo de Trabalho"
                    label="Grupos de Trabalho"
                    name="grupoTrabalho"
                    className="form"
                    control={ <Radio />}
                />      
            </RadioGroup>
            {SelectPostoFerramenta()}
        </div>
    )
}
export default PostosTrabalho;