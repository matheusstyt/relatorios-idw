import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import "./tipos.scss";

const Tipos = (props : any) => {
    return (
        <div className="container tipo">
            <h3>Agrupamento</h3>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={props.value}
                
                value={props.value}
                   onChange={e => props.changed(e.target.value)}
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