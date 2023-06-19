import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import "./tipos.scss";
import { useState } from "react";

const Tipos = (props : any) => {

    const [exibirTipoSelecionado, setExibirTipoSelecionado]= useState<any>("padrao")

    const handleChangeExibirTipo = (value: string) => {
        props.changed(value);
        setExibirTipoSelecionado(value);
    };

    return (
        <div className="container tipo">
            <h3>Tipo</h3>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={exibirTipoSelecionado}
                   onChange={e => handleChangeExibirTipo(e.target.value)}
                name="radio-buttons-group"
                className="radio" >
                <FormControlLabel
                    value="padrao"
                    control={<Radio />}
                    label="Padrão"
                    name="padrao"
                    className="form"
                />
                <FormControlLabel
                    value="porFerramenta"
                    control={<Radio />}
                    label="Por Ferramenta"
                    name="porFerramenta"
                    className="form"
                />
                <FormControlLabel
                    value="porProduto"
                    control={<Radio />}
                    label="Por Produto"
                    name="porProduto"
                    className="form"
                />
            </RadioGroup>
        </div>
    )
}
export default Tipos;