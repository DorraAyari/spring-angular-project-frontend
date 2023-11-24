import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from 'src/app/models/auth-models/authentication-request';
import { AuthenticationResponse } from 'src/app/models/auth-models/authentication-respense';
import { RegisterRequest } from 'src/app/models/auth-models/register-request';
import { VerificationRequest } from 'src/app/models/auth-models/verification-request';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from 'src/app/models/auth-models/token-api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseApiUrl:string = environment.baseApiUrl;
  private userPayload:any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userPayload = this.decodeToken();
   }



    register(
      registerRequest: RegisterRequest
    ):Observable<AuthenticationResponse> {
      return this.http.post<AuthenticationResponse>
      (this.baseApiUrl + "/etudiant/register", registerRequest);
    }

    login(
      authRequest: AuthenticationRequest
    ):Observable<AuthenticationResponse> {
      return this.http.post<AuthenticationResponse>
      (this.baseApiUrl + "/etudiant/authenticate", authRequest);
    }

    verifyCode(
        verificationRequest: VerificationRequest
      ):Observable<any> {
      return this.http.post<any>
      (this.baseApiUrl + "/etudiant/verify", verificationRequest);
    }

    signOut(){
      localStorage.clear();
      this.router.navigateByUrl('auth');
      //localStorage.removeItem('token');
    }


    storeToken(tokenValue: string){
      localStorage.removeItem('token');
      localStorage.setItem('token',tokenValue);
    }

    getToken(){
      return localStorage.getItem('token');
    }

    storeRefreshToken(tokenValue: string){
      localStorage.setItem('refreshToken',tokenValue);
    }

    getRefreshToken(){
      return localStorage.getItem('refreshToken');
    }

    isLoggedIn():boolean{
      return !!localStorage.getItem('token')
    }

    decodeToken(){
      const jwtHelper = new JwtHelperService();
      const token = this.getToken()!;
      //console.log(jwtHelper.decodeToken(token));
      return jwtHelper.decodeToken(token);
    }

    getEmailFromToken(){
      if(this.userPayload)
        return this.userPayload.sub;
    }

    renewToken(refreshToken: any){
      const headers = new HttpHeaders({
        Authorization: `Bearer ${refreshToken}`
      });
      return this.http.post(this.baseApiUrl + "/etudiant/refresh-token",{headers});
    }


    getBlocs(): Observable<any>{
      return this.http.get<any>(this.baseApiUrl + '/bloc/findAll');
    }
}
