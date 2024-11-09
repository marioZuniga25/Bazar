import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './assets/Components/SearchPage';
import ResultsPage from './assets/Components/ResultsPage';
import Details from './assets/Components/Details';
import { Compras } from './assets/Components/Compras';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/resultados" element={<ResultsPage />} />
          <Route path="/producto/:id" element={<Details />} />
          <Route path='/compras' element={<Compras/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
