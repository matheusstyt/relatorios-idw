import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
const ContagemConsolidados = (props : any) => {
    return (
        <>
            <div className="group-radio">
                <RadioGroup 
                    className="radio"
                    defaultValue={props.exibirProducaoSelecionado}
                    value={props.exibirProducaoSelecionado}
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-setExibirProducaoSelecionado"
                    onChange={(e) => props.changeProducaoValorSelecionado(e.target.value) } >
                    <FormControlLabel           
                        control={<h4>Mostrar produção em: </h4>}
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
                props.exibirProducaoSelecionado !== "pecas" 
                ? <div className="group-radio">
                    <RadioGroup
                        className="radio" 
                        name="radio-buttons-group"
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={props.exibirPesoSelecionado}
                        value={props.exibirPesoSelecionado}
                        onChange={(e) => props.changePesoValorSelecionado(e.target.value) } >
                        <FormControlLabel   
                            control={<h4>Mostrar peso em: </h4>}
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
        </>
    )
}
export default ContagemConsolidados;