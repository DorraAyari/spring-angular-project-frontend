import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = () => {

  const router : Router = inject(Router) ;
  const auth : AuthService = inject(AuthService);

  if(auth.isLoggedIn()){
    //this.router.navigateByUrl('Students');
    return true;
  }else{
    //this.toast.error({detail:"ERROR", summary:"Please login in first !", duration:3000});
    router.navigate(['auth']);
    return false;
  }
};
