import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromMsalAuth from '../../../msal-auth/store';
import { User } from 'msal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.css']
})
export class HeaderSectionComponent implements OnInit {
  user$: Observable<User>;
  error$: Observable<string>;
  constructor(
    public msalAuthStore: Store<fromMsalAuth.State>
  ) {}

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
