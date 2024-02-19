import { inject } from "@angular/core";
import { UserAzonositasService } from "../_szervizek/user-azonositas.service";
import { Router } from "@angular/router";

export const regisztraltUserGuard  = () => {
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

  if (userAzonositasService){
    return true
  }

  return true
}
