import { Checkbox, FormControlLabel} from "@mui/material";
import { useState } from "react";
import Mult from "./multi";
const AreaResponsavel = (props: any) => {

    const [todasSelecionado, setTodasSelecionado] = useState<boolean>(true);
    
    return(
        <div className="container area-responsavel">
            <h3>Área Responsável</h3>
            <FormControlLabel 
                checked={todasSelecionado}
                label="Todas as Áreas Responsáveis"
                value={todasSelecionado}
                control={ <Checkbox onChange={(e) => { 
                    setTodasSelecionado(!todasSelecionado); 
                    props.todasSelecionado(!todasSelecionado);
                }} />}
            />

            <Mult disabled={todasSelecionado} changed={(novaLista : any) => { 
                props.changed(novaLista);
                } }/>

        </div>
    )
}
export default AreaResponsavel;