import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import GrupoFerramentas from "../../subFiltros/grupoFerramentas";
import GrupoTrabalho from "../../subFiltros/grupoTrabalho";
import Ferramentas from "../../subFiltros/ferramentas";
import Postos from "../../subFiltros/postos";

const PostosFerramentas = (props : any) => {

    const SelectPostoFerramenta = ()=>{

        if(props.postoFerramentaSelecionado === "Postos"){
           return <Postos
                value={props.value}
                changed={(value : any) => props.changed(value) } 
            />
        }
        else if(props.postoFerramentaSelecionado === "grupoTrabalho"){
            return <GrupoTrabalho 
                value={props.value}
                changed={(value : any) => props.changed(value) } 
                />
        }
        else if(props.postoFerramentaSelecionado === "ferramentas"){
            return <Ferramentas 
                value={props.value}
                changed={(value : any) => props.changed(value) } 
            />
        }
        else if(props.postoFerramentaSelecionado === "grupoFerramenta"){
            return <GrupoFerramentas 
                value={props.value}
                changed={(value : any) => props.changed(value) } 
            />
        }
    }

    return (
        <div className="container postos-ferramentas">
            <h3>Postos e Ferramentas</h3>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={props.postoFerramentaSelecionado}
                value={props.postoFerramentaSelecionado}
                name="radio-buttons-group"
                className="radio"
                onChange={(e) => props.changePostoFerramentaSelecionado(e.target.value) } >

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