
import { Link } from "react-router-dom";
import { APP_ROUTES } from "./config";
export default function SideBar () {
    return (
        <nav>
            <ul>
                <li> <Link to={APP_ROUTES.REPORT.path.indiceparadaxposto}>Índice de Paradas por Posto</Link> </li>
            </ul>
        </nav>
    )
}