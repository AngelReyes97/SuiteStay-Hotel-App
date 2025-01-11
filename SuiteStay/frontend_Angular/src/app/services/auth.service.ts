import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/account.model';
import { userCredentials } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl ='http://localhost:8080';

  private userSubject= new BehaviorSubject<User | null>(null);
  readonly user$ = this.userSubject.asObservable();

  showSignIn = signal<boolean>(false);
  previousUrl = signal<string>('');

  constructor(private http: HttpClient) { }

  signUp(newAccount: User): Observable<User> {
    const headers = { headers: { 'Content-Type': 'application/json' } };
    return this.http.post<User>(`${this.apiUrl}/suitestay/register`, newAccount, headers);
  }

  checkEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/register`, {params: {email}});
  }

  login(user: userCredentials): Observable<User | null> {
    const headers = { headers: { 'Content-Type': 'application/json' } };
    return this.http.post<User | null>(`${this.apiUrl}/suitestay/home/login`, user, headers)
    .pipe(
      tap(user=> {
        this.userSubject.next(user);
      })
    );
  }

  getUser(): Observable<User | null> {
    return this.user$;
  }

  signOut(){
    this.userSubject.next(null);
  }

  Show(): void {
    this.showSignIn.set(true);
  }

  Hide(): void {
    this.showSignIn.set(false);
  }

  setPreviousUrl(url: string): void {
    this.previousUrl.set(url);
  }
}
