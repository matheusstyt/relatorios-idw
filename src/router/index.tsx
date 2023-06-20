import { Routes, Route } from 'react-router-dom';
import Inicio from "../pages/outros";
import { APP_ROUTES } from "./config";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={ <Inicio />} />
      {
        APP_ROUTES.REPORT.map( (route, index) => <Route key={index} path={`/${route.path}`} element={ route.element } />)
      }
    </Routes>
  );
}
