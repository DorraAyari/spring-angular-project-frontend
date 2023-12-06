import { Component, ElementRef, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MessageService } from 'primeng/api';
import { AuthenticationRequest } from 'src/app/models/auth-models/authentication-request';
import { AuthenticationResponse } from 'src/app/models/auth-models/authentication-respense';
import { RegisterRequest } from 'src/app/models/auth-models/register-request';
import { VerificationRequest } from 'src/app/models/auth-models/verification-request';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserStoreService } from 'src/app/services/user-store/user-store.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
  providers: [MessageService] // Add MessageService as a provider
})
export class LoginRegisterComponent implements OnInit {

  //register
  registerRequest: RegisterRequest = {};
  authResponse: AuthenticationResponse = {};
  otpCode: string = '';

  //login
  authRequestLogin: AuthenticationRequest = {};
  authResponseLogin: AuthenticationResponse = {};

  constructor(private elRef: ElementRef,
    private authService: AuthService,
    private userStore: UserStoreService,
    private messageService: MessageService,
    private router: Router) {}

  ngOnInit() {
    const wrapper = this.elRef.nativeElement.querySelector('.wrapper');
    const signUpLink = this.elRef.nativeElement.querySelector('.signup-link');
    const signInLink = this.elRef.nativeElement.querySelector('.signin-link');

    signUpLink.addEventListener('click', () => {
      wrapper.classList.add('animate-signIn');
      wrapper.classList.remove('animate-signUp');
    });

    signInLink.addEventListener('click', () => {
      wrapper.classList.add('animate-signUp');
      wrapper.classList.remove('animate-signIn');
    })
  }

  registerUser() {
    this.registerRequest.cin='134919191';
    this.registerRequest.ecole='ESPRIT';
    this.registerRequest.dateNaissance='2000-05-13'
    this.registerRequest.role='ADMIN';
    //console.log(this.registerRequest);

    this.authService.register(this.registerRequest)
    .subscribe({
      next: (res) => {
        if (res) {
          //console.log(res);
          //console.log('res accessToken : '+res.accessToken);
          //console.log('res refreshToken : '+res.refreshToken);
          //console.log('res mfaEnabled : '+res.mfaEnabled);
          //console.log('res secretImageUri : '+res.secretImageUri);
          this.messageService.add({ severity: 'success', summary: 'SUCCESS', detail: 'Set Up Two-Factor Authentication first !' });
          this.authResponse = res ;
          const wrapper = this.elRef.nativeElement.querySelector('.wrapper');
          wrapper.classList.add('animate-twoF');
        }else {
            this.messageService.add({ severity: 'success', summary: 'SUCCESS', detail: 'Account created successfully !' });
            this.registerRequest = {};
            const wrapper = this.elRef.nativeElement.querySelector('.wrapper');
            wrapper.classList.add('animate-signUp');
            wrapper.classList.remove('animate-signIn');
          //informe that account is created
          //this.message = 'Account created successfully\nYou will be redirected to the Login page in 3 seconds';
          //setTimeout(() => {
          //},1000)
        }
      }
    }
    );
  }

  authenticate() {
    this.authService.login(this.authRequestLogin)
      .subscribe({
        next: (res) => {
          //console.log(res);
          this.messageService.add({ severity: 'success', summary: 'SUCCESS', detail: 'Set Up Two-Factor Authentication first !' });
          this.authResponseLogin = res;
          const wrapper = this.elRef.nativeElement.querySelector('.wrapper');
          wrapper.classList.add('animate-twoF2');
          if(!this.authResponseLogin.mfaEnabled){
            //console.log(res);
            //this.messageService.add({ severity: 'success', summary: 'SUCCESS', detail: 'Login successfully !' });
            this.authService.storeToken(res.accessToken!);
            this.authService.storeRefreshToken(res.refreshToken!);
            const tokenPayloadAuth = this.authService.decodeToken();
            //console.log(tokenPayloadAuth);
            this.userStore.setEmailFromStore(tokenPayloadAuth.sub);
            this.router.navigate(['home']);
          }
        }
      })
  }


  verifyTfaRogister() {
    const verifyRequest : VerificationRequest = {
      email: this.registerRequest.email,
      code: this.otpCode
    };
    this.authService.verifyCode(verifyRequest)
    .subscribe({
      next: (res) => {
        //this.message = 'Account created successfully\nYou will be redirected to the home page in 3 seconds';
        //  console.log(res);
          //localStorage.setItem('token',res.accessToken as string);

          // this.messageService.add({ severity: 'success', summary: 'SUCCESS', detail: 'Account created successfully !' });
           this.authService.storeToken(res.accessToken);
           this.authService.storeRefreshToken(res.refreshToken);
           const tokenPayload = this.authService.decodeToken();
           this.userStore.setEmailFromStore(tokenPayload.sub);
          this.router.navigate(['home']);
      }
    });
  }

  verifyTfaLogin() {
    const verifyRequest : VerificationRequest = {
      email: this.authRequestLogin.email,
      code: this.otpCode
    };
    this.authService.verifyCode(verifyRequest)
    .subscribe({
      next: (res) => {
          //this.messageService.add({ severity: 'success', summary: 'SUCCESS', detail: 'Login successfully !' });
          this.authService.storeToken(res.accessToken);
          this.authService.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.authService.decodeToken();
          this.userStore.setEmailFromStore(tokenPayload.sub);
          this.router.navigate(['home']);
      }
    });
  }

}
