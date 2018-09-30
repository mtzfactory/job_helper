import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AngularFire } from 'angularfire2';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
    return this.authService.auth$.map((auth) =>  {
      if(auth == null) {
        this.router.navigate(['login'], { fragment: 'top' });
        //this.router.navigate(['./'], { fragment: 'app' });
        return false;
      } else {
        if (this.authService.userVerified) return true;
        else {
          //this.router.navigate(['user'], { fragment: 'top' });
          return false;
        }
      }
    }).first()
  }
}