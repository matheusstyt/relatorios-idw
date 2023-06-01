import "./sidebar.scss"
import { NavLink } from "react-router-dom";
import { IoIosPaper} from "react-icons/io";
import { BsTable} from "react-icons/bs";
import { CgFileDocument} from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";
import { APP_ROUTES } from "../../router/config";
import { Accordion, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import AccordionDinamic from '../relatorios/accordion/index';
export default function SideBar () {
    const [expanded, setExpanded] = useState<boolean>(true);
    return (
        <nav>
            <NavLink to="/" end>
                <AiOutlineHome size={25}/>
                <h4>Início</h4>
            </NavLink>
            <AccordionDinamic
                title="Relatórios"
                img={<IoIosPaper size={20} />} 
                component={
                    <>
                        <AccordionDinamic 
                            title={"Paradas"} 
                            img={<IoIosPaper size={20} />} 
                            component={
                                APP_ROUTES.REPORT.map( (route, index) => {
                                    return route.category === "stops" ?<NavLink key={index} to={`/${route.path}`} end>
                                        <CgFileDocument className="ico-nav" />
                                        <h4>{route.title}</h4>
                                    </NavLink>  : <></>
                                })
                            }
                        />
                        <AccordionDinamic 
                            title={"Produção"} 
                            img={<IoIosPaper size={20} />} 
                            component={
                                APP_ROUTES.REPORT.map( (route, index) => {
                                    return route.category === "product" ?<NavLink key={index} to={`/${route.path}`} end>
                                        <CgFileDocument className="ico-nav" />
                                        <h4>{route.title}</h4>
                                    </NavLink>  : <></>
                                })
                            }
                        />
                    </>
                    
                }
            />
 
        </nav>
     )
}