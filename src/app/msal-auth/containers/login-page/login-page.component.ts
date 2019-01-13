import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromMsalAuth from '../../store';
import { User } from 'msal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  user$: Observable<User>;
  error$: Observable<string>;
  constructor(public msalAuthStore: Store<fromMsalAuth.State>) {}

  ngOnInit() {
    this.user$ = this.msalAuthStore.pipe(select(fromMsalAuth.getUser));
    this.error$ = this.msalAuthStore.pipe(select(fromMsalAuth.getError));
  }

  login() {
    this.msalAuthStore.dispatch(new fromMsalAuth.Login());
  }

  logout() {
    this.msalAuthStore.dispatch(new fromMsalAuth.Logout());
  }
}
