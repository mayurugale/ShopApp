import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public http:HttpClient) { }


  custData(){

    return this.http.get('https://jsonplaceholder.typicode.com/posts')

  }


}
