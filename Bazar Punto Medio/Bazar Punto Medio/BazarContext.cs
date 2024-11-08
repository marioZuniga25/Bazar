using Bazar_Punto_Medio.Models;
using Microsoft.EntityFrameworkCore;

namespace Bazar_Punto_Medio
{
    public class BazarContext: DbContext
    {
        public BazarContext(DbContextOptions<BazarContext> options) : base(options)
        { }

        public DbSet<Producto> Producto{ get; set; }
        public DbSet<Imagen> Imagen{ get; set; }
        public DbSet<Compra> Compra{ get; set; }
        public DbSet<DetalleCompra> DetalleCompra{ get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Producto>(producto =>
            {
                producto.ToTable("Producto");
                producto.HasKey(p => p.id);
                producto.Property(p => p.id).ValueGeneratedOnAdd().UseIdentityColumn();
                producto.Property(p => p.title).IsRequired();
                producto.Property(p => p.description).IsRequired();
                producto.Property(p => p.price).IsRequired();
                producto.Property(p => p.discountPercentage).IsRequired();
                producto.Property(p => p.rating).IsRequired();
                producto.Property(p => p.stock).IsRequired();
                producto.Property(p => p.brand).IsRequired();
                producto.Property(p => p.category).IsRequired();
                producto.Property(p => p.thumbnail).IsRequired();

            });

            modelBuilder.Entity<Imagen>(imagen =>
            {
                imagen.ToTable("Imagen");
                imagen.HasKey(i => i.id);
                imagen.Property(i => i.id).ValueGeneratedOnAdd().UseIdentityColumn();
                imagen.Property(i => i.productoId).IsRequired();
                imagen.Property(i => i.url).IsRequired();
            });

            modelBuilder.Entity<Compra>( compra =>
            {
                compra.ToTable("Compra");
                compra.HasKey(c => c.id);
                compra.Property(c => c.id).ValueGeneratedOnAdd().UseIdentityColumn();
                compra.Property(c => c.fechaCompra).IsRequired();
                compra.Property(c => c.total).IsRequired();
            });

            modelBuilder.Entity<DetalleCompra>(dcompra =>
            {
                dcompra.ToTable("DetalleCompra");
                dcompra.HasKey(d => d.id);
                dcompra.Property(d => d.id).ValueGeneratedOnAdd().UseIdentityColumn();
                dcompra.Property(d => d.idProducto).IsRequired();
                dcompra.Property(d => d.idCompra).IsRequired();
                dcompra.Property(d => d.precioUnitario).IsRequired();
            });

        }
    }
}
