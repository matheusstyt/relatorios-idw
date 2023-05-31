import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import "./producaoEm.scss";
import { useState } from "react";
const ProducaoEm = (props : any) => {
    
    const [exibirProducaoSelecionado, setExibirProducaoSelecionado]= useState<any>("pecas")
    const [exibirPesoSelecionado, setExibirPesoSelecionado]= useState<any>("kilograma")

    return (
        <div className="container producao-em">
            <h3>Produção em</h3>
            <div className="group-radio">
                <RadioGroup 
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={exibirProducaoSelecionado}
                    onChange={(e) => {
                        setExibirProducaoSelecionado(e.target.value);
                        props.producaoValorSelecionado(e.target.value);
                    }}
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
                        value="pesoLiquido"
                        label="Peso Líquido"
                        name="pesoLiquido"
                        className="form"
                        control={ <Radio />}
                    />
                    <FormControlLabel 
                        value="pesoBruto"
                        label="Peso Bruto"
                        name="pesoBruto"
                        className="form"
                        control={ <Radio />}
                    />
                </RadioGroup>
            </div>

            {
                exibirProducaoSelecionado !== "pecas" 
                ? <div className="group-radio">
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={exibirPesoSelecionado}
                        onChange={(e) => {
                            setExibirProducaoSelecionado(e.target.value);
                            props.pesoValorSelecionado(e.target.value);
                        }}
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