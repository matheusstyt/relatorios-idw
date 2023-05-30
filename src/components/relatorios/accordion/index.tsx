import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";

type AccordionnDinamic = {
    title : string;
    component : React.ReactNode;
}
export default function AccordionDinamic (props : AccordionnDinamic) {

    const [expanded, setExpanded] = useState<boolean>(true);
    
    return (
        <>
            <h3 className="title-relatorio">{props.title}</h3>
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
                        {props.component}
                    </Typography>
                    </AccordionDetails>
                </Accordion>
        </>
    )
}