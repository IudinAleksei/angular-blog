import { Observable, throwError } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../admin/shared/services/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setParams: {
          auth: this.auth.token as string,
        },
      });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Http error: ', error);
        if (error.status === 401) {
          this.auth.logout();
          this.router.navigate(['admin', 'login'], {
            queryParams: {
              authFailed: true,
            },
          });
        }
        return throwError(() => error);
      }),
    );
  }
}
