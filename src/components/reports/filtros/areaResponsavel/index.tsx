import { Checkbox, FormControlLabel} from "@mui/material";
import Mult from "./multi";
const AreaResponsavel = (props: any) => {    
    return(
        <div className="container area-responsavel">
            <h3>Área Responsável</h3>
            <FormControlLabel 
                checked={props.todasAreaSelecioando}
                label="Todas as Áreas Responsáveis"
                control={ <Checkbox onChange={(e) => { 
                    props.changeTodasSelecionado(!props.todasAreaSelecioando);
                }} />}
            />

            <Mult disabled={props.todasAreaSelecioando} 
            value={props.value}
            changed={(novaLista : any) => props.changed(novaLista) }/>
        </div>
    )
}
export default AreaResponsavel;