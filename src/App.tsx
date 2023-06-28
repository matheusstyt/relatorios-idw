import logo from './logo.svg';
import './App.css';

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
