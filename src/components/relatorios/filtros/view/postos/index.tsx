import { useState } from "react";
import "./postos.scss";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import SelectIDW from "../../customInput/select";
import React from "react";

const Postos = () => {
    const [postoValorSelecionado, setPostoValorSelecionado] = useState<any>(" ")
    const [postoSelecionado, setPostoSelecionado] = useState("Postos");
    
    const handleChangePosto = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostoValorSelecionado(" ");
        setPostoSelecionado((event.target as HTMLInputElement).value);
    };

    const SelectPostoFerramenta = ()=>{
        let lista : [] = [];
        let label : string = "";
        if(postoSelecionado=="Postos"){
           lista = [];
           label = "Posto"
        }
        else if(postoSelecionado=="grupoTrabalho"){
            lista = [];
            label = "Grupo de Trabalho"
        }
            return (
                <SelectIDW
                  id="Posto"
                  label={label}
                  name="Posto"
                  options={lista}
                  width="100%"
                  value={postoValorSelecionado}
                  onChange={(value: any) => {
                      setPostoValorSelecionado(value?.target?.value);
                  } }
                  defaultValue={"todos"} />  
            )
        
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
                    handleChangePosto
                    setPostoSelecionado(e.target.value);

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
export default Postos;