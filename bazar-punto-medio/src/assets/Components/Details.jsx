import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos del carrusel
import './Details.css';

const Details = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <button>Comprar Ahora</button>
      </div>
    </div>
  );
};

export default Details;
