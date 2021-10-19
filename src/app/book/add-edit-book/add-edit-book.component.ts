import { Component, OnInit, Input } from '@angular/core';
import { BookAPIServiceService } from 'src/app/book-apiservice.service';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.css']
})
export class AddEditBookComponent implements OnInit {
  @Input() book:any;
  bookID:number = 0;
  bookName:string = '';
  bookAuthorName:string = '';

  constructor(private service:BookAPIServiceService) { }

  ngOnInit(): void {
    this.bookID = this.book.bookID;
    this.bookName = this.book.bookName;
    this.bookAuthorName = this.book.bookAuthor;
  }

  addBook(){
    var val = { 
        BookID : 0,
        BookName : this.bookName,
        BookAuthor : this.bookAuthorName
      };
  
    //this.service.addBook(val).subscribe(res=> alert(res.toString()));
    this.service.addBook(val).subscribe(
      res=> {console.log(res);},
    (error:Response) => 
    {
      console.log(error.status);

      if(error.status == 404)
        alert('this book has already been deleted');
      else if(error.status == 204)
          alert('Book Deleted Successfully!');
      else
      {
        alert('an unexpected error occured.');
      }

      return;
    });

    alert('Book Added Sucessfully');
  }

  updateBook(){
    var val = { 
      BookID : this.bookID,
      BookName : this.bookName,
      BookAuthor : this.bookAuthorName
    };

    this.service.updateBook(val).subscribe( res=> {console.log(res);},
    (error:Response) => 
    {
      console.log(error.status);

      if(error.status == 404)
        alert('this book has already been deleted');
      else if(error.status == 204)
          alert('Book Deleted Successfully!');
      else
      {
        alert('an unexpected error occured.');
      }

      return;
    });

    alert('Book Updated Sucessfully');
  }
}
