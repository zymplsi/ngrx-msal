import { TestBed, async, inject } from '@angular/core/testing';

import { MsalAuthGuard } from './msal-auth.guard';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route,
  UrlSegment
} from '@angular/router';
import * as fromMsalAuth from '../store';
import { User } from 'msal';

import * as fromRoot from '../../reducers';

describe('MsalAuthGuard', () => {
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  let msalAuthStore: Store<fromMsalAuth.State>;
  let msalAuthGuard: MsalAuthGuard;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          feature: combineReducers(fromMsalAuth.reducer)
        })
      ],
      providers: [
        MsalAuthGuard,
        Store,
        { provide: Router, useValue: routerSpy }
      ]
    });
    msalAuthStore = TestBed.get(Store);
    router =  TestBed.get(Router);
  }));

  it('should expect true if user exist', inject(
    [],
    (
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
      route: Route,
      segments: UrlSegment[]
    ) => {
      const user = new User(null, null, null, null, null, null);
      const action = new fromMsalAuth.LoginSuccessful({ user });

      msalAuthStore.dispatch(action);
      msalAuthGuard = TestBed.get(MsalAuthGuard);
      const canActivateGuardResult = msalAuthGuard.canActivate(next, state);
      const canLoadGuardResult = msalAuthGuard.canLoad(route, segments);

      console.log(canActivateGuardResult);

      expect(canActivateGuardResult).toBe(true);
      expect(canLoadGuardResult).toBe(true);
    }
  ));

  it('should expect navigate to About page if user is null', inject(
    [],
    (
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
      route: Route,
      segments: UrlSegment[]
    ) => {
      let action;
      action = new fromMsalAuth.LoginSuccessful({ user: null });

      msalAuthStore.dispatch(action);
      msalAuthGuard = TestBed.get(MsalAuthGuard);
      msalAuthGuard.canActivate(next, state);
      msalAuthGuard.canLoad(route, segments);

      const spy = router.navigateByUrl as jasmine.Spy;
      const navArgs = spy.calls.first().args[0];

      expect(navArgs).toBe('about');
    }
  ));
});
