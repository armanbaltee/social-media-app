import { CanActivateFn, Router } from '@angular/router';
import { PagesService } from '../service/pages.service';
import { inject } from '@angular/core';

export const pageGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const authToken = inject(PagesService)

  if(!authToken.getToken() || authToken.getToken()===null){
    return router.navigate(['/'])
  }else{
    return true
  }
};
