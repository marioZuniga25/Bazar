import React, { useEffect, useState } from 'react';
import './Compras.css';
import { useNavigate } from 'react-router-dom';

export const Compras = () => {
    const [loading, setLoading] = useState(true);
    const [compras, setCompras] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://www.bazarpm.somee.com/api/Productos/ListadoCompras`);
                if (!response.ok) {
                    throw new Error("No se encontraron productos.");
                }
                const data = await response.json();
                console.log(data); // Verificar aquí la estructura de los datos
                setCompras(data);
            } catch (error) {
                console.error(error.message);
                setCompras([]);
            }
            setLoading(false);
        };
        fetchResults();
    }, []);
    const volver = () =>{
        navigate(`/`);
    }

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <>
            <div><button className='back-button' onClick={volver}>Volver</button>    <p className='title'>Compras</p></div>
            <div className="container">
                {compras.map((item, index) => (
                    <div key={index} className="card">
                        <img 
                            src={item.detalleCompra?.producto?.thumbnail || "placeholder.png"} 
                            alt={item.detalleCompra?.producto?.title || "Producto sin imagen"} 
                            className="product-image" 
                        />
                        <p>Fecha de Compra: {item.compra?.fechaCompra || "No disponible"}</p>
                        <p>Total: ${item.compra?.total || "No disponible"}</p>

                        
                        <h4>Detalles del Producto</h4>
                        <p>Producto: {item.detalleCompra?.producto?.title || "No disponible"}</p>
                        <p>Descripción: {item.detalleCompra?.producto?.description || "No disponible"}</p>
                        <p>Precio Unitario: ${item.detalleCompra?.precioUnitario || "No disponible"}</p>
                        <p>Marca: {item.detalleCompra?.producto?.brand || "No disponible"}</p>
                        <p>Categoría: {item.detalleCompra?.producto?.category || "No disponible"}</p>
                        <p>Descuento: {item.detalleCompra?.producto?.discountPercentage || 0}%</p>
                        
                    </div>
                ))}
            </div>
        </>
    );
};
