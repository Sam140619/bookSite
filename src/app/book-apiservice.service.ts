import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookAPIServiceService {

  readonly APIUrl = 'http://localhost:5000';

  constructor(private http:HttpClient) { 

  }

  getBooks():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/book/');
  }

  addBook(val:any){
    return this.http.post(this.APIUrl + '/book',val);
  }

  updateBook(val:any){
    return this.http.put(this.APIUrl + '/book',val);
  }

  deleteBook(val:any){
    return this.http.delete(this.APIUrl + '/book/'+ val);
  }
}
