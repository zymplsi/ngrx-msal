import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
  UrlSegment
} from '@angular/router';
import { Observable } from 'rxjs';
import * as fromMsalAuth from '../store';
import { Store, select } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class MsalAuthGuard implements CanActivate, CanLoad {
  private isAuthenticated: boolean;
  constructor(
    private msalAuthStore: Store<fromMsalAuth.State>,
    private router: Router
  ) {
    this.msalAuthStore.select(fromMsalAuth.getUser).subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    return this.authGuardResult();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {

    return this.authGuardResult();
  }

  private authGuardResult() {
    if (this.isAuthenticated) {
      return true;
    } else {
      this.router.navigateByUrl('about');
    }
  }
}
