import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { FiFilter } from "react-icons/fi";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../../../pages.scss";
import Filtros from "./filtros";
import { useState } from "react";
export default function IndiceParadasXAreResponsavel () {
    const [expanded, setExpanded] = useState<boolean>(true);

    const [cargaUtil, setCargaUtil] = useState<any>({});
    const [descricao, setDescricao] = useState<any>({});


    return (
        <div className="container-page">
            <h3 className="title-relatorio">Índices de Paradas Por Área Responsável (R028)</h3>
            <Accordion 
                    sx={{width: "100%", margin: 0}}
                    expanded={expanded}
                    onChange={()=>{
                        setExpanded(!expanded);
                    }
            }>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography style={{
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                justifyItems: 'center',
                                gap: 16,
                                }}> <FiFilter size={25}/> Filtro</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    <Filtros 
                        getPayload={(value: any ) => setCargaUtil(value)}
                        getDescricao={(value: any ) => setDescricao(value)}
                    />
                </Typography>
                </AccordionDetails>
            </Accordion>
            
        </div>
    )   
}