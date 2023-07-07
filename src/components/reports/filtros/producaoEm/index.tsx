import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
const ProducaoEm = (props : any) => {
    return (
        <div className="container producao-em">
            <h3>Produção em</h3>
            <div className="group-radio">
                <RadioGroup 
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={props.producaoValorSelecionado}
                    onChange={(e) => props.changeProducaoValorSelecionado(e.target.value) }
                    name="radio-buttons-group"
                    className="radio"
                >
                    <FormControlLabel           
                        control={<h4>Mostrar peso em: </h4>}
                        label=""
                        className="form"
                    />

                    <FormControlLabel 
                        value="pecas"
                        label="Peças"
                        name="pecas"
                        className="form"
                        control={ <Radio />}
                    />
                    <FormControlLabel 
                        value="peso"
                        label="Peso"
                        name="peso"
                        className="form"
                        control={ <Radio />}
                    />

                </RadioGroup>
            </div>

            {
                props.producaoValorSelecionado !== "pecas" 
                ? <div className="group-radio">
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={props.pesoValorSelecionado}
                        onChange={(e) => props.changePesoValorSelecionado(e.target.value) }
                        name="radio-buttons-group"
                        className="radio" >
                        <FormControlLabel   
                            control={<h4>Mostrar produção em: </h4>}
                            label=""
                            className="form"
                        />
                        <FormControlLabel
                            value="kilograma"
                            control={<Radio />}
                            label="kilograma"
                            name="kilograma"
                            className="form"
                        />
                        <FormControlLabel
                            value="tonelada"
                            control={<Radio />}
                            label="Tonelada"
                            name="tonelada"
                            className="form"
                        />
                    </RadioGroup>
                </div>
                : <></>
            }
        </div>
    )
}
export default ProducaoEm;