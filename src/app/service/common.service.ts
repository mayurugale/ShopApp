import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public http: HttpClient) { }
  private apiUrl = `${environment.apiUrl}/api/customers`

  private getUsers = 'http://localhost:3000/api/customers';


  /**
     * Call login API
     * @param email User email
     * @param password User password
     */
  /**
   * Call login API and store token in sessionStorage
   */
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    const apiUrl = `${environment.apiUrl}/auth/login`
    return this.http.post<any>(apiUrl, body).pipe(
      tap((response: any) => {
        if (response && response.token) {
          sessionStorage.setItem('authToken', response.token);
        }
      })
    );
  }

  /**
   * Get token from sessionStorage
   */
  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  /**
   * Clear token from sessionStorage (Logout)
   */
  logout(): void {
    sessionStorage.removeItem('authToken');
  }

    /**
  * Fetch the list of customers from the backend API. 
  */
  getCustomers(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/customers`);
  }


  DeleteUser(id: string) {

    return this.http.delete(`${this.apiUrl}/${id}`)

  }


  getUser(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
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
  addCust(data: any) {

    return this.http.post(this.apiUrl, data)
  }

  custData() {

    return this.http.get('https://jsonplaceholder.typicode.com/posts')

  }



}
