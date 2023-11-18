import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/models/auth-models/authentication-request';
import { AuthenticationResponse } from 'src/app/models/auth-models/authentication-respense';
import { RegisterRequest } from 'src/app/models/auth-models/register-request';
import { VerificationRequest } from 'src/app/models/auth-models/verification-request';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
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
    this.registerRequest.dateNaissance='2000-05-13'
    this.registerRequest.role='USER';
    //console.log(this.registerRequest);

    this.authService.register(this.registerRequest)
    .subscribe({
      next: (res) => {
        //console.log(res);

        if (res) {
          console.log(res);
          this.authResponse = res ;
          const wrapper = this.elRef.nativeElement.querySelector('.wrapper');
          wrapper.classList.add('animate-twoF');
        }else {
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
          console.log(res);
          this.authResponseLogin = res;
          const wrapper = this.elRef.nativeElement.querySelector('.wrapper');
          wrapper.classList.add('animate-twoF2');
          if(!this.authResponseLogin.mfaEnabled){
            console.log(res);
            localStorage.setItem('token',res.accessToken as string);
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
          console.log(res);
          localStorage.setItem('token',res.accessToken as string);
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
        //this.message = 'Account created successfully\nYou will be redirected to the home page in 3 seconds';
          console.log('verif code login:'+res);
          localStorage.setItem('token',res.accessToken as string);
          this.router.navigate(['home']);
      }
    });
  }

}
