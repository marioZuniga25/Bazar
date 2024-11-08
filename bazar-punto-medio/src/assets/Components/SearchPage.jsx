import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchPage.css';
import logo from '../images/Punto_Medio-removebg-preview.png';
import { FaShoppingCart } from 'react-icons/fa';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Redirigir a la página de resultados con el término de búsqueda
      navigate(`/resultados?query=${searchTerm}`);
    }
  };

  return (
    <><div className="search-page">
      <img
        src={logo}
        alt="Logo"
        className="logo"
      />
        <div className='barra-busqueda'>
            <input
                type="text"
                className="search-bar"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaShoppingCart className="cart-icon" />
        </div>
      
      <button onClick={handleSearch} className="search-button">Buscar</button>
      
    </div>
    </>
  );
};

export default SearchPage;
