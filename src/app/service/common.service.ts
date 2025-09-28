import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public http:HttpClient) { }
  private apiUrl = 'http://localhost:3000/api/customers';
  private getUsers='http://localhost:3000/api/customers';
  



    DeleteUser(id:string){

      return this.http.delete(`${this.apiUrl}/${id}`)

    }

    getUser(): Observable<any> {
      return this.http.get<any[]>(this.getUsers).pipe(
        map(users =>
          users
            .filter(user => user.isDeleted === false) // Only include users where isDeleted is false
            .map(user => ({
              _id: user._id,
              name: user.name,
              mobileNo: user.mobileNo,
              address: user.address.street,
              isDeleted: user.isDeleted
            }))
        )
      );
    }
  addCust(data:any){

    return this.http.post(this.apiUrl,data)
  }

  custData(){

    return this.http.get('https://jsonplaceholder.typicode.com/posts')

  }


}
