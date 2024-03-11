import { inject } from "@angular/core";
import { UserAzonositasService } from "./user-azonositas.service";
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';



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

export const bejelentkezettUserGuard404  = () => {
  const userAzonositasService = inject(UserAzonositasService)
  const router = inject(Router);

  if (userAzonositasService.getAuthToken()){
    return true
  }

  return router.parseUrl('/404');
};

export const adminGuard = () => {
  const userAzonositasService = inject(UserAzonositasService)
  const router = inject(Router);

  return userAzonositasService.authorizacioCheck(['admin']).pipe(
    map(authorizacio => {
      if (authorizacio) return true;
      else  return router.parseUrl('/404'); 
    })
  )
}

export const esemenyszerkesztoGuard = () => {
  const userAzonositasService = inject(UserAzonositasService)
  const router = inject(Router);

  return userAzonositasService.authorizacioCheck(['esemenyszerkeszto']).pipe(
    map(authorizacio => {
      if (authorizacio) return true;
      else  return router.parseUrl('/404'); 
    })
  )
}

export const esemenyszerkesztoVagyAdminGuard = () => {
  const userAzonositasService = inject(UserAzonositasService)
  const router = inject(Router);

  return userAzonositasService.authorizacioCheck(['esemenyszerkeszto','admin']).pipe(
    map(authorizacio => {
      if (authorizacio) return true;
      else return router.parseUrl('/404'); 
    })
  )
}
