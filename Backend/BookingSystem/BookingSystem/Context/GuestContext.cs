using Microsoft.EntityFrameworkCore;

using BookingSystem.Models;

namespace BookingSystem.Context
{
    public class GuestContext: DbContext
    {
        public GuestContext(DbContextOptions<GuestContext> options) 
            : base(options)
        { }

        public DbSet<Guest> Guests { get; set; }
    }
}
