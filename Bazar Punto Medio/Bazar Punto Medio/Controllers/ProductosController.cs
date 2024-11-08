using Bazar_Punto_Medio.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bazar_Punto_Medio.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly BazarContext _context;
        public ProductosController(BazarContext context)
        {
            _context = context;
        }

        [HttpGet("ListadoProductos")]
        public async Task<ActionResult<IEnumerable<Producto>>> GetListadoProductos()
        {
            var productos = await _context.Producto.ToListAsync();

            return Ok(productos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Producto>> GetProducto(int id)
        {
            var producto = await _context.Producto.FindAsync(id);

            if (producto == null)
            {
                return NotFound();
            }

            return producto;
        }

        
        [HttpGet("buscar")]
        public async Task<ActionResult<IEnumerable<Producto>>> BuscarProductosPorNombre(string name)
        {
            var productos = await _context.Producto
                .Where(p => p.title.Contains(name))
                .ToListAsync();

            if (productos.Count == 0)
            {
                return NotFound("No se encontraron productos con ese nombre.");
            }

            return productos;
        }


        [HttpGet("buscarImagenes/{id}")]
        public async Task<ActionResult<IEnumerable<Imagen>>> BuscarImagenesProducto(int id)
        {
            var imagenes = await _context.Imagen
                .Where(p => p.productoId.Equals(id))
                .ToListAsync();

            if (imagenes.Count == 0)
            {
                return NotFound("No se encontraron productos con ese nombre.");
            }

            return imagenes;
        }


        [HttpPost("registrarCompra")]
        public async Task<ActionResult<IEnumerable<Imagen>>> RegistrarCompra(DateOnly fechaCompra)
        {
           

            

            return Ok();
        }


    }
}
