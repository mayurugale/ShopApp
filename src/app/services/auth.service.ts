import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public http: HttpClient) { }
  
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
}
