import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterService } from '../register.service';
import { LoginStat } from '../Classes/Login/login-stat';

@Injectable({
  providedIn: 'root'
})
export class PatientGuard implements CanActivate {
  
  private loginStat:LoginStat
  constructor(private registerSerice:RegisterService,private router:Router)
  {
    this.registerSerice.loginStatCaster.subscribe(info => this.loginStat=info)
  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.loginStat.isLogged && this.loginStat.userType.toLowerCase()=="patient")
      return true
    else{
      this.router.navigate(["/Login"])
    }
  }
  
}
