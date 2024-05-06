using System.Data.SqlTypes;

namespace BookPortal.Models
{
    public class Book
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public required string Author { get; set; }
        public required string ISBN { get; set; }
        public required DateTime PublishedDate { get; set; }

    }
}
