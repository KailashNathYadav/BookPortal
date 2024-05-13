using BookPortal.Data;
using BookPortal.Models;
using BookPortal.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookPortal.Controllers
{
	[Route("/api/[controller]")]
	[ApiController]
	public class BooksController : ControllerBase
	{
		private readonly ApplicationDbContext dbContext;

		public BooksController(ApplicationDbContext dbContext)
		{
			this.dbContext = dbContext;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<Book>>> GetAllBooks()
		{
			return await dbContext.Books.ToListAsync();
		}

		[HttpPost]
		public async Task<ActionResult<Book>> AddBook(AddBookDTO addBookDTO)
		{
			var bookEntity = new Book()
			{
				Author = addBookDTO.Author,
				Title = addBookDTO.Title,
				ISBN = addBookDTO.ISBN,
				PublishedDate = addBookDTO.PublishedDate
			};

			dbContext.Books.Add(bookEntity);
			await dbContext.SaveChangesAsync();
			return CreatedAtAction(nameof(GetBookById), new { id = bookEntity.Id }, bookEntity);
		}

		[HttpGet("{id:guid}")]
		public async Task<ActionResult<Book>> GetBookById(Guid id)
		{
			var book = await dbContext.Books.FindAsync(id);
			if (book == null)
			{
				return NotFound();
			}
			return Ok(book);
		}

		[HttpPut("{id:guid}")]
		public async Task<IActionResult> UpdateBookById(Guid id, UpdateBookDTO updateBookDTO)
		{
			var book = await dbContext.Books.FindAsync(id);
			if (book == null)
			{
				return NotFound();
			}
			book.Author = updateBookDTO.Author;
			book.Title = updateBookDTO.Title;
			book.ISBN = updateBookDTO.ISBN;
			book.PublishedDate = updateBookDTO.PublishedDate;
			await dbContext.SaveChangesAsync();
			return NoContent();
		}

		[HttpDelete("{id:guid}")]
		public async Task<IActionResult> DeleteBookById(Guid id)
		{
			var book = await dbContext.Books.FindAsync(id);
			if (book == null)
			{
				return NotFound();
			}
			dbContext.Books.Remove(book);
			await dbContext.SaveChangesAsync();
			return NoContent();
		}

		[HttpGet("search")]
		public async Task<ActionResult<IEnumerable<Book>>> SearchBooks([FromQuery] string searchInput)
		{
			var books = dbContext.Books.AsQueryable();
			if (!String.IsNullOrEmpty(searchInput))
				books = books.Where(input => input.Title.Contains(searchInput) || input.Author.Contains(searchInput));
			return await books.ToListAsync();
		}
	}
}
