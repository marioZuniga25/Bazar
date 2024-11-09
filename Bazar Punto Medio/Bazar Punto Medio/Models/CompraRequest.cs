namespace Bazar_Punto_Medio.Models
{
    public class CompraRequest
    {
        public string FechaCompra { get; set; }
        public double Total { get; set; }
        public int IdProducto { get; set; }
    }
}
