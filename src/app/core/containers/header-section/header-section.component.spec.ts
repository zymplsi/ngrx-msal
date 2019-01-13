import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from 'msal';
import { HeaderSectionComponent } from './header-section.component';
import { NavMenuComponent } from '../../components/nav-menu/nav-menu.component';
import { RouterModule } from '@angular/router';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import * as fromMsalAuth from '../../../msal-auth/store';
import * as fromRoot from '../../../reducers';

describe('HeaderSectionComponent', () => {
  let component: HeaderSectionComponent;
  let fixture: ComponentFixture<HeaderSectionComponent>;
  let store: Store<fromMsalAuth.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        StoreModule.forRoot({
          ...fromRoot.reducers,
          feature: combineReducers(fromMsalAuth.reducer)
        })
      ],
      declarations: [ HeaderSectionComponent, NavMenuComponent ]
    })
    .compileComponents();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have app-nav-menu element', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('app-nav-menu').nodeType).toBe(1);
  });

  it('should expect a user upon subscribed on ngInit()', () => {
    const user = new User(null, null, null, null, null, null);
    const action = new fromMsalAuth.LoginSuccessful({ user: user });
    store.dispatch(action);
    component.user$.subscribe(data => {
      expect(data).toBe(user);
    });
  });

  it('should expect an error upon subscribed on ngInit()', () => {
    const action = new fromMsalAuth.LoginFail({ error: 'Error' });
    store.dispatch(action);
    component.error$.subscribe(error => {
      expect(error).toBe('Error');
    });
  });

  it('should dispatch login action on login()', () => {
    const action = new fromMsalAuth.Login();
    store.dispatch(action);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch logout action on logout()', () => {
    const action = new fromMsalAuth.Logout();
    store.dispatch(action);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
