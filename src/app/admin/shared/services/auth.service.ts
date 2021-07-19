import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { IFirebaseAuthResponse, IUser } from '../../../shared/interafaces';
import { environment } from '../../../../environments/environment';

const MS_IN_SEC = 1000;
const LS_TOKEN_KEY = 'fb-token';
const LS_EXPIRES_KEY = 'fb-token-exp';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: IUser): Observable<any> {
    user.returnSecureToken = true;
    return (
      this.http
        .post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
        // @ts-ignore
        .pipe(tap(this.setToken))
    );
  }

  logout() {
    this.setToken(null);
  }
  isAuthenticated(): boolean {
    return !!this.token;
  }

  private get token(): string | null {
    const expDate = new Date(localStorage.getItem(LS_EXPIRES_KEY) as string);
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem(LS_TOKEN_KEY) as string;
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
