import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import Contagem from "../../subFiltros/contagem";
import "./agrupamentoContagem.scss";
const AgrupamentoContagem = (props : any) => {
    return (
        <div className="container agrupamento-contagem">
            <h3>Agrup. e Contagem de Produção</h3>
            <Contagem 
                exibirProducaoSelecionado={props.exibirProducaoSelecionado}
                changeProducaoValorSelecionado={(value: string) => props.changeProducaoValorSelecionado(value)}

                exibirPesoSelecionado={props.exibirPesoSelecionado}
                changePesoValorSelecionado={(value: string) => props.changePesoValorSelecionado(value)}
            />

            <div className="group-radio">
                <RadioGroup 
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={props.exibirAgrupamentoSelecionado}
                    value={props.exibirAgrupamentoSelecionado}
                    name="radio-buttons-group"
                    className="radio"

                    onChange={(e) => props.changeAgrupamentoValorSelecionado(e.target.value) } >
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