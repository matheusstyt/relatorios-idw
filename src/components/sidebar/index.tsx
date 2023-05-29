import "./sidebar.scss"
import { NavLink } from "react-router-dom";
import { BsTable} from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
export default function SideBar () {
    return (
        <nav>
            <NavLink to="/" end>
                <AiOutlineHome size={25}/>
                <h4>Início</h4>
                 
            </NavLink>

            <NavLink to="/indiceparadaxarea" end>
                <BsTable size={25}/>
                <h4>Índices de Paradas Por Área Responsável (R028)</h4>
            </NavLink>


        </nav>
     )
}