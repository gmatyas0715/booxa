import { inject } from "@angular/core";
import { UserAzonositasService } from "./user-azonositas.service";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
  ) => {
  return true;
};

export const vendegUserGuard  = () => {
  const userAzonositasService = inject(UserAzonositasService)
  const router = inject(Router);

  if (!userAzonositasService.getAuthToken()){
    return true
  }

  return router.parseUrl('/kezdooldal');
}

export const bejelentkezettUserGuard  = () => {
  const userAzonositasService = inject(UserAzonositasService)
  const router = inject(Router);

  if (userAzonositasService.getAuthToken()){
    return true
  }

  return router.parseUrl('/bejelentkezes');
};

export const adminGuard = () => {
  const userAzonositasService = inject(UserAzonositasService)
  const router = inject(Router);

  return userAzonositasService.authorizacioCheck(['admin']).pipe(
    map(authorizacio => {
      if (authorizacio) return true;
      else  return router.parseUrl('/kezdooldal'); 
    })
  )
}

export const esemenyszerkesztoGuard = () => {
  const userAzonositasService = inject(UserAzonositasService)
  const router = inject(Router);

  return userAzonositasService.authorizacioCheck(['esemenyszerkeszto']).pipe(
    map(authorizacio => {
      if (authorizacio) return true;
      else  return router.parseUrl('/kezdooldal'); 
    })
  )
}

export const esemenyszerkesztoVagyAdminGuard = () => {
  const userAzonositasService = inject(UserAzonositasService)
  const router = inject(Router);

  return userAzonositasService.authorizacioCheck(['esemenyszerkeszto','admin']).pipe(
    map(authorizacio => {
      if (authorizacio) return true;
      else  return router.parseUrl('/kezdooldal'); 
    })
  )
}
