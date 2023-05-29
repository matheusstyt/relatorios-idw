import React from "react";

import IndiceParadasXAreResponsavel from "../pages/reports/paradas/indiceParadasXAreaResponsavel";

import { Routes, Route } from 'react-router-dom';
import Inicio from "../pages/outros";
import { APP_ROUTES } from "../components/sidebar/config";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={ <Inicio />} />
      <Route path={APP_ROUTES.REPORT.path.indiceparadaxarea} element={<IndiceParadasXAreResponsavel />} />
    </Routes>
  );
}
