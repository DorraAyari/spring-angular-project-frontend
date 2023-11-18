import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from 'src/app/models/auth-models/authentication-request';
import { AuthenticationResponse } from 'src/app/models/auth-models/authentication-respense';
import { RegisterRequest } from 'src/app/models/auth-models/register-request';
import { VerificationRequest } from 'src/app/models/auth-models/verification-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseApiUrl:string = environment.baseApiUrl;

  constructor(
    private http: HttpClient
  ) { }

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
      ):Observable<AuthenticationResponse> {
      return this.http.post<AuthenticationResponse>
      (this.baseApiUrl + "/etudiant/verify", verificationRequest);
    }
}
