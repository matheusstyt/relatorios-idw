import "./sidebar.scss"
import { NavLink } from "react-router-dom";
import { BsTable} from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { APP_ROUTES } from "../../router/config";
export default function SideBar () {
    return (
        <nav>
            <NavLink to="/" end>
                <AiOutlineHome size={25}/>
                <h4>Início</h4>
            </NavLink>
            {
                APP_ROUTES.REPORT.map( (route, index) => {
                    return <NavLink key={index} to={`/${route.path}`} end>
                        <BsTable className="ico-nav" />
                        <h4>{route.title}</h4>
                    </NavLink> 
                })
            }
        </nav>
     )
}