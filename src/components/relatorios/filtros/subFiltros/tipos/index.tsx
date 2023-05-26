import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import "./tipos.scss";
import { useState } from "react";

const Tipos = (props : any) => {

    const [exibirTipoSelecionado, setExibirTipoSelecionado]= useState<any>("kilograma")

    const handleChangeExibirTipo = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.changed(event.target.value);
        setExibirTipoSelecionado((event.target as HTMLInputElement).value);
    };

    return (
        <div className="group-radio">
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={exibirTipoSelecionado}
                onChange={handleChangeExibirTipo}
                name="radio-buttons-group"
                className="radio" >
                <FormControlLabel   
                    control={<h4>Mostrar tipo como: </h4>}
                    label=""
                    className="form"
                />
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