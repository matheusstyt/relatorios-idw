import React from "react";

import IndiceParadasXAreResponsavel from "../pages/reports/paradas/indiceParadasXAreaResponsavel";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="indiceparadaxposto" element={<IndiceParadasXAreResponsavel />} />
      </Routes>
    </Router>
  );
}
