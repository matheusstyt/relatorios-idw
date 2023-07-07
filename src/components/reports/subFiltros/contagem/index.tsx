import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
const Contagem = (props : any) => {
    return (
        <>
            <div className="group-radio">
                <RadioGroup 
                    className="radio"
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={props.exibirProducaoSelecionado}
                    value={props.exibirProducaoSelecionado}
                    name="radio-buttons-setExibirProducaoSelecionado"
                    onChange={(e) =>  props.changeProducaoValorSelecionado(e.target.value) } >
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
                        value="peso"
                        label="Peso"
                        name="peso"
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
                        value={props.exibirPesoSelecionado}
                        defaultValue={props.exibirPesoSelecionado}
                        aria-labelledby="demo-radio-buttons-group-label"
                        onChange={(e) =>  props.changePesoValorSelecionado(e.target.value) } >
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
export default Contagem;