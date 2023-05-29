import React from 'react';
import logo from './logo.svg';
import './App.css';
import AgrupamentoContagem from './components/relatorios/filtros/view/agrupamentoContagem';
import AreaResponsavel from './components/relatorios/filtros/view/areaResponsavel';
import DataTurnoPosto from './components/relatorios/filtros/view/dataTurnoPosto';
import IntervaloContagem from './components/relatorios/filtros/view/intervaloContagem';
import OpPeriodo from './components/relatorios/filtros/view/opPeriodo';
import Paradas from './components/relatorios/filtros/view/paradas';
import PostosFerramentas from './components/relatorios/filtros/view/postosFerramentas';
import PeriodoTurno from './components/relatorios/filtros/view/periodoTurno';
import PostosTrabalho from './components/relatorios/filtros/view/postosTrabalho';
import ProducaoEm from './components/relatorios/filtros/view/producaoEm';
import AppRoutes from './router';
import { BrowserRouter as Router } from 'react-router-dom';
import SideBar from './components/sidebar';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>RELATÓRIOS IDW</h1>
      </header>
      
      <Router>
        <div className='container-geral'>
          <SideBar />
          <AppRoutes />
        </div>

      </Router>
    </div>
  );
}

export default App;
