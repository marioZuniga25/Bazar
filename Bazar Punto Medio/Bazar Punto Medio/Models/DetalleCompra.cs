namespace Bazar_Punto_Medio.Models
{
    public class DetalleCompra
    {
        public int id { get; set; }
        public int idCompra { get; set; }
        public int idProducto { get; set; }
        public double precioUnitario { get; set; }
    }
}
