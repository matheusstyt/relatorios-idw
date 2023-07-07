import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import GrupoTrabalho from "../../subFiltros/grupoTrabalho";
import Postos from "../../subFiltros/postos";

const PostosTrabalho = (props : any) => {
    const SelectPostoFerramenta = ()=>{
        if(props.postoTrabalhoSelecionado === "Postos"){
            return <Postos
                value={props.postoTrabalhoValorSelecionado}
                changed={(value : any) => props.changePostoTrabalhoValorSelecionado(value) 
            }/>
        }
        else if(props.postoTrabalhoSelecionado === "grupoTrabalho"){
            return <GrupoTrabalho 
                value={props.postoTrabalhoValorSelecionado}
                changed={(value : any) => props.changePostoTrabalhoValorSelecionado(value) }
            />
        }
    } 
    return (
        <div className="container postos">
            <h3>Postos</h3>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={props.postoTrabalhoSelecionado}
                name="radio-buttons-group"
                className="radio"
                onChange={(e) => props.changePostoTrabalhoSelecionado( e.target.value ) }
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