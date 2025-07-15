import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const authService = inject(AuthService)
  if(authService.getToken()){
    return router.navigate(['/homepage']);
    
  }else{
    return true
  }
  return true;
};
