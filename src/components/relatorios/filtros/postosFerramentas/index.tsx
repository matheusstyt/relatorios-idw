import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import "./postosFerramentas.scss";
import { useState } from "react";
import jobPostServices from "../../../../services/jobPostServices";
import SelectIDW from "../../customInput/select";
const PostosFerramentas = () => {

    const [postoFerramentaValorSelecionado, setPostoFerramentaValorSelecionado]= useState<any>(" ")
    const [postoFerramentaSelecionado, setPostoFerramentaSelecionado] = useState("Postos");

    const obterListaPostos = () => {
        // jobPostServices.getAllWorkStation("", 1, 10000).then(res => {

        // })
    }
    const SelectPostoFerramenta = ()=>{
        let lista : [] = [];
        let label : string = "";
        if(postoFerramentaSelecionado=="Postos"){
           lista = [];
           label = "Posto"
        }
        else if(postoFerramentaSelecionado=="grupoTrabalho"){
            lista = [];
            label = "Grupo de Trabalho"
        }
        else if(postoFerramentaSelecionado=="ferramentas"){
            lista = [];
            label = "Ferramenta"
        }
        else if(postoFerramentaSelecionado=="grupoFerramenta"){
            lista = [];
            label = "Grupo de Ferramenta"
        }
        
            return (
                <SelectIDW
                  id="Posto"
                  label={label}
                  name="Posto"
                  options={lista}
                  width="100%"
                  value={postoFerramentaValorSelecionado}
                  onChange={(value: any) => {
                      setPostoFerramentaValorSelecionado(value?.target?.value);
                  } }
                  defaultValue={"todos"} />  
            )
        
    }

    const handleChangePostoFerramenta = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostoFerramentaValorSelecionado(" ");
        setPostoFerramentaSelecionado((event.target as HTMLInputElement).value);
      };
    return (
        <div className="container postos-ferramentas">
            <h3>Postos e Ferramentas</h3>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={postoFerramentaSelecionado}
                name="radio-buttons-group"
                className="radio"
                onChange={(e) => { 
                    handleChangePostoFerramenta
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