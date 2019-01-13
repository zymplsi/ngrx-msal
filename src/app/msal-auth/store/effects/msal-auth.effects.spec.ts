import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, ReplaySubject } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';
import { MsalAuthEffects } from './msal-auth.effects';
import { MsalConfigProvider } from '../../config/auth-msal.config';
import * as fromMsalAuth from '../index';
import { MsalAuthService } from '../../services/msal-auth.service';
import { getEffectsMetadata, EffectsMetadata } from '@ngrx/effects';

describe('MsalAuthEffects', () => {
  let msalAuthServiceStub: Partial<MsalAuthService>;
  msalAuthServiceStub = {
    loginPopup: () => of(),
    logout: () => of(),
    acquireTokenSilent: () => of(),
    acquireTokenPopup: () => of()
  };

  let actions$: Observable<any>;
  let effects: MsalAuthEffects;
  let service: MsalAuthService;
  let metadata: EffectsMetadata<MsalAuthEffects>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MsalAuthService,
          useValue: msalAuthServiceStub
        },
        MsalConfigProvider,
        MsalAuthEffects,
        provideMockActions(() => actions$)
      ]
    });
    effects = TestBed.get(MsalAuthEffects);
    service = TestBed.get(MsalAuthService);
    metadata = getEffectsMetadata(effects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
    expect(service).toBeTruthy();
  });

  it('should expect AcquireTokenSilent action on login', () => {
    const action = new fromMsalAuth.Login();
    actions$ = hot('-a', { a: action });

    const response$ = cold('-a|', { a: of() });
    spyOn(service, 'loginPopup').and.returnValue(response$);

    const completed$ = new fromMsalAuth.AcquireTokenSilent();
    const expected$ = cold('--b', { b: completed$ });

    expect(effects.msalAuthLogin$).toBeObservable(expected$);
  });

  it('should expect LoginFail action on failed AcquireTokenSilent request ', () => {
    const action = new fromMsalAuth.Login();
    actions$ = hot('-a', { a: action });

    const response$ = cold('-#|', {}, 'Error');
    spyOn(service, 'loginPopup').and.returnValue(response$);

    const completed$ = new fromMsalAuth.LoginFail({ error: 'Error' });
    const expected$ = cold('--b', { b: completed$ });

    expect(effects.msalAuthLogin$).toBeObservable(expected$);
  });

  it('should expect LoginSuccessful action when AcquireTokenSilent request returns access_token', () => {
    const action = new fromMsalAuth.AcquireTokenSilent();
    actions$ = hot('-a', { a: action });

    const response$ = cold('-a|', { a: of('user') });
    spyOn(service, 'acquireTokenSilent').and.returnValue(response$);

    const completed$ = new fromMsalAuth.LoginSuccessful({ user: undefined });
    const expected$ = cold('--b', { b: completed$ });

    expect(effects.msalAuthAcquireTokenSilent$).toBeObservable(expected$);
  });

  it('should expect AcquireTokenPopup action on failed AcquireTokenSilent request ', () => {
    const action = new fromMsalAuth.AcquireTokenSilent();
    actions$ = hot('-a', { a: action });

    const response$ = cold('-#|', {}, 'Error');
    spyOn(service, 'acquireTokenSilent').and.returnValue(response$);

    const completed$ = new fromMsalAuth.AcquireTokenPopup();
    const expected$ = cold('--b', { b: completed$ });

    expect(effects.msalAuthAcquireTokenSilent$).toBeObservable(expected$);
  });

  it('should expect LoginFail action on failed AcquireTokenPopup request ', () => {
    const action = new fromMsalAuth.AcquireTokenPopup();
    actions$ = hot('-a', { a: action });

    const response$ = cold('-#|', {}, 'Error');
    spyOn(service, 'acquireTokenPopup').and.returnValue(response$);

    const completed$ = new fromMsalAuth.LoginFail({ error: 'Error' });
    const expected$ = cold('--b', { b: completed$ });

    expect(effects.msalAuthAcquireTokenPopup$).toBeObservable(expected$);
  });

  it('should register Logout effect that does not dispatch an action', () => {
    expect(metadata.msalAuthLogout$).toEqual({ dispatch: false });
  });

  it('should send Logout request ', () => {
    const action = new fromMsalAuth.Logout();
    effects.msalAuthLogout$.subscribe(() => {
      expect(service.logout).toHaveBeenCalledWith(action);
    });
  });
});
