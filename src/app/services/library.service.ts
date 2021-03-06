import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface CBook{
  insertId: number;
}

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  uri = 'http://localhost:4001/library';
  cBookObj: CBook[] = [];

  constructor(private http: HttpClient) {
    
  }

  getBooks(){
    return this.http.get(`${this.uri}/getBooks`);
  }

  addBook(obj){
    this.http.post(`${this.uri}/addBook`, obj).subscribe(result => {
      console.log(result);
    });
  }

  updateBooks(obj){
    return this.http.post(`${this.uri}/updateBook`, obj);
    
  }

  deleteBook(id){
    console.log(id);
    this.http.get(`${this.uri}/deleteBook/${id}`).subscribe(result => {
      console.log(result);
    });
  }

  getBorrowRecords(){
    console.log("called");

    return this.http.get(`${this.uri}/getBorrowRecrods`);

  }

  addBorrowRecord(obj){
    console.log(obj);

    this.http.post(`${this.uri}/addTocopybook`, obj).subscribe(result => {

      for(let i in result){
        this.cBookObj.push(result[i]);
      }
      console.log(this.cBookObj[2]);

      let tempobj = {
        studentId: obj.studentId,
        bookId: obj.bookId,
        borrowDate: obj.borrowDate,
        returnDate: obj.returnDate,
        cBookId: this.cBookObj[2]
      };

      this.http.post(`${this.uri}/addToBorrow`, tempobj).subscribe(result => {
        console.log(result);
      });
    });

    

  }

  deleteBorrowRecord(id){
    console.log(id);

    this.http.get(`${this.uri}/deleteBorrowRecord/${id}`).subscribe(result => {
      console.log(result);
    });
  }


}
