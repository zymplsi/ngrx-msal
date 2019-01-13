import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMenuComponent } from './nav-menu.component';
import { RouterModule } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import * as fromMsalAuth from '../../../msal-auth/store';
import { User } from 'msal';
import { StoreModule, combineReducers, Store } from '@ngrx/store';

import * as fromRoot from '../../../reducers';
import { tick } from '@angular/core/src/render3';
import { of } from 'rxjs';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;
  let debugEl: DebugElement;
  let el: HTMLElement;
  let msalAuthStore: Store<fromMsalAuth.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        StoreModule.forRoot({
          ...fromRoot.reducers,
          feature: combineReducers(fromMsalAuth.reducer)
        })
      ],
      declarations: [NavMenuComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuComponent);
    msalAuthStore = TestBed.get(Store);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    el = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit "login" message event when login is clicked', () => {
    let message: string;
    const loginDebugEl = debugEl.query(By.css('#login'));

    component.authEvent.subscribe(eventMessage => (message = eventMessage));
    loginDebugEl.triggerEventHandler('click', null);
    expect(message).toBe('login');
  });

  it('should emit "logout" message event when logout is clicked', async () => {
    let message: string;

    const user = new User(null, null, null, null, null, null);
    component.user$ = of(user);
    fixture.detectChanges();
    const logoutDebugEl = debugEl.query(By.css('#logout'));

    component.authEvent.subscribe(eventMessage => (message = eventMessage));
    logoutDebugEl.triggerEventHandler('click', null);
    expect(message).toBe('logout');
  });
});
