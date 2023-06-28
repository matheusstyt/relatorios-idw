import ContagemConsolidados from "../../subFiltros/contagemConsolidados";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import "./agrupamentoContagem.scss";
import { useState } from "react";

const AgrupamentoContagemConsolidados = (props : any) => {
    
    const [exibirAgrupamentoSelecionado, setExibirAgrupamentoSelecionado]= useState<any>("agrupamentoPosto")

    return (
        <div className="container agrupamento-contagem">
            <h3>Agrup. e Contagem de Produção</h3>
            <ContagemConsolidados
                producaoValorSelecionado={(value: string) => props.producaoValorSelecionado(value)}
                pesoValorSelecionado={(value: string) => props.pesoValorSelecionado(value)}
            />

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
export default AgrupamentoContagemConsolidados