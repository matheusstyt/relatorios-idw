import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import "./agrupamentoContagem.scss";
import { useState } from "react";

const AgrupamentoContagem = (props : any) => {
    const [exibirProducaoSelecionado, setExibirProducaoSelecionado]= useState<any>("pecas")
    const [exibirPesoSelecionado, setExibirPesoSelecionado]= useState<any>("kilograma")
    const [exibirAgrupamentoSelecionado, setExibirAgrupamentoSelecionado]= useState<any>("agrupamentoPosto")

    return (
        <div className="container agrupamento-contagem">
            <h3>Agrup. e Contagem de Produção</h3>
            <div className="group-radio">
                <RadioGroup 
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={exibirProducaoSelecionado}
                    name="radio-buttons-setExibirProducaoSelecionado"
                    className="radio"

                    onChange={(e) => {
                        setExibirProducaoSelecionado(e.target.value);
                        props.producaoValorSelecionado(e.target.value);
                    } } >
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
                        name="radio-buttons-group"
                        className="radio" 

                        onChange={(e) => {
                            setExibirPesoSelecionado(e.target.value);
                            props.pesoValorSelecionado(e.target.value);
                        }} >
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
            <div className="group-radio">
                <RadioGroup 
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={exibirAgrupamentoSelecionado}
                    name="radio-buttons-group"
                    className="radio"

                    onChange={(e) => {
                        setExibirAgrupamentoSelecionado(e.target.value);
                        props.agrupamentoValorSelecionado(e.target.value);
                    }} >
                    <FormControlLabel
                        control={<h4>Agrupar dados por: </h4>}
                        label=""
                        className="form"
                    />
                    <FormControlLabel
                        value="agrupamentoPosto"
                        control={<Radio />}
                        label="Posto"
                        name="agrupamentoPosto"
                        className="form"
                    />
                    <FormControlLabel
                        value="agrupamentoFerramenta"
                        control={<Radio />}
                        label="Ferramenta"
                        name="agrupamentoFerramenta"
                        className="form"
                    />
                    <FormControlLabel
                        value="agrupamentoProduto"
                        control={<Radio />}
                        label="Produto"
                        name="agrupamentoProduto"
                        className="form"
                    />
                </RadioGroup>
            </div>
        </div>
    )
}
export default AgrupamentoContagem