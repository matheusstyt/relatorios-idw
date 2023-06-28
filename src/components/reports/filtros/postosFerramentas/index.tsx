import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import GrupoFerramentas from "../../subFiltros/grupoFerramentas";
import GrupoTrabalho from "../../subFiltros/grupoTrabalho";
import Ferramentas from "../../subFiltros/ferramentas";
import Postos from "../../subFiltros/postos";
import { useState } from "react";


const PostosFerramentas = (props : any) => {

    const [postoFerramentaSelecionado, setPostoFerramentaSelecionado] = useState("Postos");

    const SelectPostoFerramenta = ()=>{

        if(postoFerramentaSelecionado === "Postos"){
           return <Postos changed={(value : any) => grupoSelecioando(value) } />
        }
        else if(postoFerramentaSelecionado === "grupoTrabalho"){
            return <GrupoTrabalho changed={(value : any) => grupoSelecioando(value) } />
        }
        else if(postoFerramentaSelecionado === "ferramentas"){
            return <Ferramentas changed={(value : any) => grupoSelecioando(value) } />
        }
        else if(postoFerramentaSelecionado === "grupoFerramenta"){
            return <GrupoFerramentas changed={(value : any) => grupoSelecioando(value) } />
        }
    }
    function grupoSelecioando(value : any){
        props.changed(value);
        props.postoFerramentaSelecionado(postoFerramentaSelecionado);
    }

    return (
        <div className="container postos-ferramentas">
            <h3>Postos e Ferramentas</h3>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={postoFerramentaSelecionado}
                name="radio-buttons-group"
                className="radio"
                onChange={(e) => { 
                    setPostoFerramentaSelecionado(e.target.value);
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
                <FormControlLabel
                    value="ferramentas"
                    label="Ferramentas"
                    data-label="Ferramentas"
                    name="ferramentas"
                    className="form"
                    control={ <Radio />}
                />
                <FormControlLabel
                    value="grupoFerramenta"
                    label="Grupo de Ferramenta"
                    data-label="Grupo de Ferramentas"
                    name="grupoFerramenta"
                    className="form"
                    control={ <Radio />}
                />
         

            
            </RadioGroup>
            {SelectPostoFerramenta()}
        </div>
        
    )
}
export default PostosFerramentas;