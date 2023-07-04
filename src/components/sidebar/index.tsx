import { APP_ROUTES } from "../../router/config";
import { CgFileDocument} from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";
import AccordionDinamic from "../accordion";
import { NavLink } from "react-router-dom";
import { IoIosPaper} from "react-icons/io";
import "./sidebar.scss"
import { Fragment } from "react";

export default function SideBar () {
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
                                    return route.category === "stops" ?(
                                    <NavLink key={index} to={`/${route.path}`} end>
                                        <CgFileDocument className="ico-nav" />
                                        <h4>{route.title}</h4>
                                    </NavLink>)  : <Fragment key={index} />
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
                                    </NavLink>  : <Fragment key={index} />
                                })
                            }
                        />
                        <AccordionDinamic 
                            title={"Planejamento"} 
                            img={<IoIosPaper size={20} />} 
                            component={
                                APP_ROUTES.REPORT.map( (route, index) => {
                                    return route.category === "planejamento" ?<NavLink key={index} to={`/${route.path}`} end>
                                        <CgFileDocument className="ico-nav" />
                                        <h4>{route.title}</h4>
                                    </NavLink>  : <Fragment key={index} />
                                })
                            }
                        />
                        <AccordionDinamic 
                            title={"Engenharia"} 
                            img={<IoIosPaper size={20} />} 
                            component={
                                APP_ROUTES.REPORT.map( (route, index) => {
                                    return route.category === "engineering" ?<NavLink key={index} to={`/${route.path}`} end>
                                        <CgFileDocument className="ico-nav" />
                                        <h4>{route.title}</h4>
                                    </NavLink>  : <Fragment key={index} />
                                })
                            }
                        />

                    </>
                    
                }
            />
         </nav>
     )
}