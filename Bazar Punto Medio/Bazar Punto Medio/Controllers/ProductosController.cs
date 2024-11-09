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
        public async Task<ActionResult<Compra>> RegistrarCompra([FromBody] CompraRequest compraRequest)
        {
            if (compraRequest == null)
            {
                return BadRequest("Los datos de la compra son inválidos.");
            }

            // Crear la compra
            var compra = new Compra
            {
                fechaCompra = compraRequest.FechaCompra,
                total = compraRequest.Total
            };

            await _context.Compra.AddAsync(compra);
            await _context.SaveChangesAsync();

            // Crear el detalle de la compra
            var detalleCompra = new DetalleCompra
            {
                precioUnitario = compraRequest.Total,
                idProducto = compraRequest.IdProducto,
                idCompra = compra.id
            };

            await _context.DetalleCompra.AddAsync(detalleCompra);
            await _context.SaveChangesAsync();

            return Ok(compra);
        }


        [HttpGet("ListadoCompras")]
        public async Task<ActionResult<IEnumerable<Producto>>> GetListadoCompras()
        {
            var comprasConDetalles = _context.Compra
        .Join(_context.DetalleCompra,
          compra => compra.id,
          detalle => detalle.idCompra,
          (compra, detalle) => new { compra, detalle }) 
        .Join(_context.Producto,
          temp => temp.detalle.idProducto,
          producto => producto.id,
          (temp, producto) => new
          {
              Compra = new
              {
                  temp.compra.id,
                  temp.compra.fechaCompra,
                  temp.compra.total
              },
              DetalleCompra = new
              {
                  temp.detalle.idProducto,
                  temp.detalle.precioUnitario,
                  Producto = new
                  {
                      producto.title,
                      producto.description,
                      producto.price,
                      producto.discountPercentage,
                      producto.rating,
                      producto.stock,
                      producto.brand,
                      producto.category,
                      producto.thumbnail
                  }
              }
          })
    .ToList();


            return Ok(comprasConDetalles);
        }


    }
}
