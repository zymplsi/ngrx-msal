import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from 'msal';
import { LoginPageComponent } from './login-page.component';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as fromMsalAuth from '../../store';
import * as fromRoot from '../../../reducers';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let store: Store<fromMsalAuth.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          feature: combineReducers(fromMsalAuth.reducer),
        }),
      ],
      declarations: [LoginPageComponent],
    }).compileComponents();
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expect a user on ngInit()', () => {
    const user = new User(null, null, null, null, null, null);
    const action = new fromMsalAuth.LoginSuccessful({ user: user });
    store.dispatch(action);
    component.user$.subscribe(data => {
      expect(data).toBe(user);
    });
  });

  it('should expect an error on ngInit()', () => {
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
