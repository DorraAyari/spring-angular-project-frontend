import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {

  const router : Router = inject(Router) ;
  if (!localStorage.getItem('token')) {
    router.navigate(['auth']);
    return false;
  }
  return true;
};
