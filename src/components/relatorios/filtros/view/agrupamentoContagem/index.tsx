import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import "./agrupamentoContagem.scss";
import { useState } from "react";

const AgrupamentoContagem = () => {
    const [exibirProducaoSelecionado, setExibirProducaoSelecionado]= useState<any>("pecas")

    const handleChangeExibirProducao = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExibirProducaoSelecionado((event.target as HTMLInputElement).value);
      };

    const [exibirPesoSelecionado, setExibirPesoSelecionado]= useState<any>("kilograma")

    const handleChangeExibirPeso = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExibirPesoSelecionado((event.target as HTMLInputElement).value);
    };

    const [exibirAgrupamentoSelecionado, setExibirAgrupamentoSelecionado]= useState<any>("agrupamentoPosto")

    const handleChangeExibirAgrupamento = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExibirAgrupamentoSelecionado((event.target as HTMLInputElement).value);
    };

    return (
        <div className="container agrupamento-contagem">
            <h3>Agrup. e Contagem de Produção</h3>
            <div className="group-radio">
                <RadioGroup 
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={exibirProducaoSelecionado}
                    onChange={handleChangeExibirProducao}
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
                        onChange={handleChangeExibirPeso}
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
            <div className="group-radio">
                <RadioGroup 
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={exibirAgrupamentoSelecionado}
                    onChange={handleChangeExibirAgrupamento}
                    name="radio-buttons-group"
                    className="radio"
                >
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