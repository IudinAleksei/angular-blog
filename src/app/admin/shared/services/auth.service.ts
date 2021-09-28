import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IFirebaseAuthResponse, IUser } from '../../../shared/interafaces';
import { environment } from '../../../../environments/environment';
import { catchError, tap } from 'rxjs/operators';

const MS_IN_SEC = 1000;
const LS_TOKEN_KEY = 'fb-token';
const LS_EXPIRES_KEY = 'fb-token-exp';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  login(user: IUser): Observable<any> {
    user.returnSecureToken = true;
    return (
      this.http
        .post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
        // @ts-ignore
        .pipe(tap(this.setToken), catchError(this.handleError.bind(this)))
    );
  }

  logout() {
    this.setToken(null);
  }
  isAuthenticated(): boolean {
    return !!this.token;
  }

  get token(): string | null {
    const expDate = new Date(localStorage.getItem(LS_EXPIRES_KEY) as string);
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem(LS_TOKEN_KEY) as string;
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;

    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такого email нет');
        break;
      case 'INVALID_MAIL':
        this.error$.next('Неверный email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль');
        break;
    }
  }

  private setToken(response: IFirebaseAuthResponse | null) {
    if (response) {
      const currentTime = new Date().getTime();
      const expDate = new Date(currentTime + +response.expiresIn * MS_IN_SEC);
      localStorage.setItem(LS_TOKEN_KEY, response.idToken);
      localStorage.setItem(LS_EXPIRES_KEY, expDate.toString());
      return;
    }
    localStorage.clear();
  }
}
