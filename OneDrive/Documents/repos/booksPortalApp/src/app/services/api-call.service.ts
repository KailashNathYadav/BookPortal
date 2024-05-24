import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  apiURL = 'http://localhost:5000/api/books';
  
  constructor(private http: HttpClient) { }

  getAllBooks(pageNumber:number){
    return this.http.get(`${this.apiURL}?pageNumber=${pageNumber}`);
  }

  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiURL}/${bookId}`);
  }

  createBook(book: Book): Observable<Object> {
    return this.http.post(`${this.apiURL}`, book);
  }

  updateBookById(bookId: number, book: Book): Observable<Object> {
    return this.http.put(`${this.apiURL}/${bookId}`, book);
  }

  deleteBookById(bookId: number): Observable<Object> {
    return this.http.delete(`${this.apiURL}/${bookId}`);
  }

  getBooksByTitleOrAuthor(searchInput:string,pageNumber:number){
    return this.http.get(`${this.apiURL}/search?searchInput=${searchInput}&pageNumber=${pageNumber}`);
  }
}
