import { Accordion, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";

type AccordionnDinamic = {
    title : string
    img : React.ReactNode;
    component : React.ReactNode;
}
export default function AccordionDinamic (props : AccordionnDinamic) {

    const [expanded, setExpanded] = useState<boolean>(true);
    
    return (
        <section>
            
            <Accordion 
                sx={{width: "100%", margin: 0, paddingLeft : "1em", boxShadow : "none"}}
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
                                }}> {props.img} {props.title}</Typography>
                </AccordionSummary>
           
                {props.component}
                
              
            </Accordion>
        </section>
    )
}