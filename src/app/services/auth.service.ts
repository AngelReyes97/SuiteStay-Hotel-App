import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { newUser } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl ='http://localhost:8080';

  constructor(private http: HttpClient) { }

  signUp(newAccount: newUser): Observable<newUser> {
    const headers = { headers: { 'Content-Type': 'application/json' } };
    return this.http.post<newUser>(`${this.apiUrl}/register`, newAccount, headers);
  }

  checkEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/register`, {params: {email}});
  }

}
