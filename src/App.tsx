import React from 'react';
import logo from './logo.svg';
import './App.css';
import Relatorios from './components/relatorios';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Relatorios />
    </div>
  );
}

export default App;
