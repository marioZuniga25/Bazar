// ResultsPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResultsPage.css';
import { FaShoppingCart } from 'react-icons/fa';

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/resultados?query=${searchTerm}`);
    }
  };

  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://www.bazarpm.somee.com/api/Productos/buscar?name=${query}`);
        if (!response.ok) {
          throw new Error("No se encontraron productos.");
        }
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error(error.message);
        setResults([]);
      }
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  const handleCompras = () => {
    
      navigate(`/compras`);
    
  };

  const handleProductClick = (id) => {
    navigate(`/producto/${id}`);
  };

  return (
    <div className="results-page">
      <div className="search-bar">
        <input type="text" placeholder="Buscar productos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={handleSearch} className="search-button">Buscar</button>
        <FaShoppingCart className="cart-icon" onClick={handleCompras}/>
      </div>

      <h2>Resultados para: "{query}"</h2>

      {loading ? (
        <p className="loading">Cargando...</p>
      ) : results.length > 0 ? (
        <div className="results-list">
          {results.map((producto) => (
            <div className="product-card" key={producto.id} onClick={() => handleProductClick(producto.id)}>
              <div className="product-image">
                <img src={producto.thumbnail} alt={producto.title} />
              </div>
              <div className="product-details">
                <h3>{producto.title}</h3>
                <p className="price">Precio: ${producto.price}</p>
                {producto.discountPercentage && (
                  <p className="discount">Descuento: {producto.discountPercentage}%</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron productos.</p>
      )}
    </div>
  );
};

export default ResultsPage;
