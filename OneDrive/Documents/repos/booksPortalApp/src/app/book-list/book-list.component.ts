import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { Book } from '../models/book.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit{
  book:any = new Book();
  edit_book:any = new Book();
  books:any = [];
  pageNumber: number = 1;
  searchInput:string = ''
  pages: any = [1,2,3,4,5];
  show_create:boolean = false;
  show_edit:boolean = false;

  constructor(private api: ApiCallService){}

  switchShowCreate(){
    this.show_create=!this.show_create;
  }

  switchShowEdit(){
    this.show_edit = !this.show_edit;
    this.editBook(this.edit_book.id);
  }

  saveBook() {
    this.api.createBook(this.book).subscribe({
      next: () => this.refresh(),
      error: (error) => console.log(error),
    });
  }

  handleSubmit() {
    this.saveBook();
    this.switchShowCreate();
  }

  editBook(id: any){
    this.api.updateBookById(id,this.edit_book).subscribe({
      next:()=>{
        this.refresh();
      },
      error:(error)=>console.log(error)
    });
  }

  handleUpdate(id:any){
    this.switchShowEdit();
    this.edit_book.id = id;
  }

  refresh(){
    if(this.searchInput){
      this.api.getBooksByTitleOrAuthor(this.searchInput,this.pageNumber).subscribe({
        next:(data)=>{
          this.books = data;
        },
        error:(error)=>{
          console.log(error);
        }
      });
    }
    else{
      this.api.getAllBooks(this.pageNumber).subscribe({
        next:data=>{
          this.books = data;
        },
        error:error=>{
          console.log(error);
        }
      })
    }
  }
  


  ngOnInit(): void {
    this.refresh();
  }

  getBooksViaTitleOrAuthor(searchInput:string){
    this.refresh();
  }

  deleteBook(id: any){
    this.api.deleteBookById(id).subscribe({
      next:()=>{
        console.log("deleted")
        this.refresh();
      },
      error:(error)=>console.log(error)
    });
  }


  setPage(pageClicked: number){
    this.pageNumber = pageClicked;
    this.refresh();
  }

  prevPage(){
    this.setPage(Math.max(1,this.pageNumber - 1));
  }

  nextPage(){
    this.setPage(Math.min(5,this.pageNumber + 1));
  }

}
