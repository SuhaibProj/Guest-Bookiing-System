#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookingSystem.Context;
using BookingSystem.Models;

namespace BookingSystem.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class GuestsController : ControllerBase
    {
        private readonly GuestContext _context;

        public GuestsController(GuestContext context) {
            _context = context;
        }

        // POST: api/Guests/create
        [HttpPost("create")]
        public async Task<ActionResult<Guest>> PostGuest(Guest guest) {
            _context.Guests.Add(guest);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetGuest), new { id = guest.Id }, guest);
        }

        // GET: api/Guests/all
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Guest>>> GetGuests() {
            return await _context.Guests.ToListAsync();
        }

        // GET: api/Guests/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Guest>> GetGuest(int id) {
            var guest = await _context.Guests.FindAsync(id);
            if (guest == null){ return NotFound("Guest does not exist within Database."); }
            return guest;
        }

        // PUT: api/Guests/update/{id}
        [HttpPut("update/{id}")]
        public async Task<IActionResult> PutGuest(int id, Guest guest) {
            if (id != guest.Id) { return BadRequest("Identifier does not match."); }
            _context.Entry(guest).State = EntityState.Modified;
            try { await _context.SaveChangesAsync(); }
            catch (DbUpdateConcurrencyException) {
                if (!GuestExists(id)) { return NotFound("Guest does not exist within Database."); }
                else { throw; }
            }
            return NoContent();
        }

        // DELETE: api/Guests/remove/{id}
        [HttpDelete("remove/{id}")]
        public async Task<IActionResult> DeleteGuest(int id) {
            var guest = await _context.Guests.FindAsync(id);
            if (guest == null) { return NotFound("Guest does not exist within Database."); }
            _context.Guests.Remove(guest);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool GuestExists(int id){
            return _context.Guests.Any(e => e.Id == id);
        }
    }
}
