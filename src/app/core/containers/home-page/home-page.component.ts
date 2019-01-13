import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromMsalAuth from '../../../msal-auth/store';
import { User } from 'msal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  user$: Observable<User>;
  error$: Observable<string>;
  constructor(public msalAuthStore: Store<fromMsalAuth.State>) {}

  ngOnInit() {
    this.user$ = this.msalAuthStore.pipe(select(fromMsalAuth.getUser));
    this.error$ = this.msalAuthStore.pipe(select(fromMsalAuth.getError));
  }

  authEvent(eventMessage: string) {
    if (eventMessage === 'login') {
      this.msalAuthStore.dispatch(new fromMsalAuth.Login());
    } else if (eventMessage === 'logout') {
      this.msalAuthStore.dispatch(new fromMsalAuth.Logout());
    }
  }
}
