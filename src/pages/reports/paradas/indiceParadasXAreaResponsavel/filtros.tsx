import PeriodoTurno from "../../../../components/relatorios/filtros/view/periodoTurno";
import PostosFerramentas from "../../../../components/relatorios/filtros/view/postosFerramentas";
import Paradas from "../../../../components/relatorios/filtros/view/paradas";
import AreaResponsavel from "../../../../components/relatorios/filtros/view/areaResponsavel";
import { Button } from "@mui/material";
import { useState } from "react";

const Filtros = () => {

    const [dataInicio, setDataInicio] = useState<any>(new Date());
    const [dataTermino, setDataTermino] = useState<any>(new Date());
    
    const [turnoSelecionado, setTurnoSelecionado] = useState<any>("");
    const verFiltros = () => {
        console.log(dataInicio);
        console.log(dataTermino);
        console.log(turnoSelecionado);
    }
    return (
        <div>
            <h4>Filtros:</h4>

            <PeriodoTurno 
                turno={(value : any) => setTurnoSelecionado(value)}
                dataInicio={(value : any) => setDataInicio(value)}
                dataTermino={(value : any) => setDataTermino(value)}
            />
            <PostosFerramentas/>
            <Paradas/>
            <AreaResponsavel />
            <Button onClick={verFiltros} variant="contained">APLICAR FILTRO</Button>
        </div>
    )
}

export default Filtros;