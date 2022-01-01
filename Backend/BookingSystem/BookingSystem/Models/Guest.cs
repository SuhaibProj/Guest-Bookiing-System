using System.ComponentModel.DataAnnotations;

namespace BookingSystem.Models
{
    public class Guest
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string StreetAddress { get; set; }
        [DataType(DataType.PostalCode)]
        public string PostCode { get; set; }   
        [DataType(DataType.PhoneNumber)]
        [MaxLength(11)]
        public string PhoneNumber { get; set; }
        public string? Comments { get; set; }
        public int? Rating { get; set; }
    }
}
