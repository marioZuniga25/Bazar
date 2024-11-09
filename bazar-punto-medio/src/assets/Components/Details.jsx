import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos del carrusel
import './Details.css';
import { useNavigate } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://www.bazarpm.somee.com/api/Productos/${id}`);
        if (!response.ok) {
          throw new Error("No se encontraron detalles del producto.");
        }
        const data = await response.json();
        console.log("Detalles del producto:", data); // Debug
        setProducto(data);
      } catch (error) {
        console.error("Error al obtener los detalles del producto:", error.message);
      }
    };

    const fetchProductImages = async () => {
      try {
        const response = await fetch(`https://www.bazarpm.somee.com/api/Productos/buscarImagenes/${id}`);
        if (!response.ok) {
          throw new Error("No se encontraron imágenes del producto.");
        }
        const imageData = await response.json();
        console.log("Imágenes del producto:", imageData); // Debug
        setImagenes(imageData);
      } catch (error) {
        console.error("Error al obtener las imágenes del producto:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
    fetchProductImages();
  }, [id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!producto) {
    return <p>Producto no encontrado</p>;
  }

  const buy = async () => {
    // Asegúrate de que la fecha esté en el formato correcto: 'YYYY-MM-DD'
    const fecha = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

    const total = producto.price * (1 - (producto.discountPercentage / 100)); // Total con descuento
    const idProducto = producto.id;  // ID del producto

    try {
        const response = await fetch('https://www.bazarpm.somee.com/api/Productos/registrarCompra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fechaCompra: fecha,  // Asegúrate de que esté en el formato correcto
                total: total,
                idProducto: idProducto,
            }),
          
        });
        if (!response.ok) {
            const errorData = await response.json();  // Obtener detalles del error
            console.error('Error:', errorData);
            throw new Error('Error al registrar la compra');
        }

        const data = await response.json();
        console.log('Compra registrada exitosamente:', data);
        alert('Compra realizada con éxito!');
        navigate(`/`);
    } catch (error) {
        console.error('Error al registrar la compra:', error.message);
        alert('Hubo un error al realizar la compra.');
    }
};




  return (
    <div className="product-detail-page">
      <h2>{producto.title}</h2>

      <Carousel 
        showThumbs={false} 
        autoPlay 
        infiniteLoop 
        dynamicHeight 
        className="product-carousel"
      >
        <div key={0}>
            <img src={producto.thumbnail} alt={`Imagen ${0}`} />
          </div>
        {imagenes.map((image, index) => (
          <div key={index}>
            <img src={image.url} alt={`Imagen ${index + 1}`} />
          </div>
        ))}
      </Carousel>

      <p className="price">Precio: ${producto.price}</p>
      {producto.discountPercentage && (
        <p className="discount">Descuento: {producto.discountPercentage}%</p>
      )}
      <p>{producto.description}</p>

      <div className="actions">
        <button onClick={buy}>Comprar Ahora</button>
      </div>
    </div>
  );
};

export default Details;
