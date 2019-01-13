import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'msal';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  @Output() authEvent = new EventEmitter();
  @Input() user$: Observable<User>;

  constructor() {}

  ngOnInit() {
  }

  login() {
    this.authEvent.emit('login');
  }

  logout() {
    this.authEvent.emit('logout');
  }
}
