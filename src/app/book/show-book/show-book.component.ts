import { Component, OnInit } from '@angular/core';

import { BookAPIServiceService } from 'src/app/book-apiservice.service';

@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.css']
})
export class ShowBookComponent implements OnInit {

  constructor(private service:BookAPIServiceService) { }
  BookList:any=[];
  ModalTitle:string = "";
  ActivateAddEditBookComp:boolean = false;
  book:any;

  ngOnInit(): void {
    this.refreshBooks();
  }

addClick(){
  this.book = {
    bookID: 0,
    bookName: "",
    bookAuthor: ""
  }

this.ModalTitle = "Add Book";
this.ActivateAddEditBookComp = true;
}

editClick(item:any){
  this.book = item;
  this.ModalTitle="Edit Book";
  this.ActivateAddEditBookComp = true;
}

deleteClick(item:any){
  if(confirm('Are you sure?')){
    
   this.service.deleteBook(item.bookID).subscribe(res=> {console.log(res);  this.refreshBooks();},
    (error:Response) => 
    {
      console.log(error.status);

      if(error.status == 404)
        alert('this book has already been deleted');
      else if(error.status == 204)
        {
          alert('Book Deleted Successfully!');
        }
      else
      {
        alert('an unexpected error occured.') 
      }
    });
  }

 

}

closeClick(){
  this.ActivateAddEditBookComp = false;
  this.refreshBooks();
}

refreshBooks(){
  this.service.getBooks().subscribe(response =>{ 
    this.BookList = response;
  },
   error=>{
     if(error.status == 404)
      alert('Not found');
    else if (error.status == 400)
      alert('Bad Request');
    else
    alert('unexpcted error');
     }
   );
  }
}