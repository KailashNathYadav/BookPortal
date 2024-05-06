using BookPortal.Data;
using BookPortal.Models;
using BookPortal.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
		[ActionName("AddBook")]
		public IActionResult AddBook(AddBookDTO addBookDTO)
		{
			var bookEntity = new Book()
			{
				Author = addBookDTO.Author,
				Title = addBookDTO.Title,
				ISBN = addBookDTO.ISBN,
				PublishedDate = addBookDTO.PublishedDate
			};

			dbContext.Books.Add(bookEntity);
			dbContext.SaveChanges();
			return Ok(bookEntity);
		}

		[HttpGet]
		[Route("{id:guid}")]
		public async Task<ActionResult<Book>> GetBookById(Guid id)
		{
			var book = await dbContext.Books.FindAsync(id);
			if (book == null)
			{
				return NotFound();
			}
			return Ok(book);
		}

		[HttpPut]
		[Route("{id:guid}")]
		public async Task<IActionResult> UpdateBookById(Guid id, UpdateBookDTO updateBookDTO)
		{
			var book = await dbContext.Books.FindAsync(id);
			if (book is null)
			{
				return NotFound();
			}
			book.Author = updateBookDTO.Author;
			book.Title = updateBookDTO.Title;
			book.ISBN = updateBookDTO.ISBN;
			book.PublishedDate = updateBookDTO.PublishedDate;
			await dbContext.SaveChangesAsync();
			return Ok(book);
		}

		[HttpDelete]
		[Route("{id:guid}")]
		public async Task<IActionResult> DeleteBookById(Guid id)
		{
			var book = await dbContext.Books.FindAsync(id);
			if (book is null)
			{
				return NotFound();
			}
			dbContext.Books.Remove(book);
			await dbContext.SaveChangesAsync();
			return Ok();
		}
	}
}
