import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/auth-models/token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();

    if(myToken){
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${myToken}`}
      })
    }






    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          console.log('err: ',err);
          if(err.status === 403 || err.status === 0){
           // this.auth.signOut();
            //console.log('err: ',err);
            //return this.handleUnAuthorizedError(request,next);
          }
        }
        return throwError(()=>err);
      })
    );;
  }

  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler){
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken = this.auth.getToken()!;
    tokenApiModel.refreshToken = this.auth.getRefreshToken()!;
    //console.log('req: ',req);
    //console.log('accessT: ',tokenApiModel.accessToken);
    //console.log('refreshT: ',tokenApiModel.refreshToken);

     return this.auth.renewToken(this.auth.getRefreshToken())
    .pipe(
      switchMap((data:any)=>{
        console.log('data refresh :',data);
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);

        req = req.clone({
          setHeaders: {Authorization: `Bearer ${data.accessToken}`}
        });
        return next.handle(req);
      }),
      catchError((err)=>{
        return throwError(()=>{
          //this.toast.warning({detail:"WARNING", summary:"Token is expired, Please login again !", duration:3000});
          //this.router.navigate(['auth']);
          this.auth.signOut();
        })
      })
    );

  }

}
