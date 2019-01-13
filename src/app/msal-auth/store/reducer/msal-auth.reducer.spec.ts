import * as fromMsalAuth from '../index';
import { User } from 'msal';


describe('MsalAuth Reducer', () => {
  describe('an unknown action', () => {
    it('should expect the previous state', () => {
      const action = {} as any;
      const { initialState } = fromMsalAuth;
      const result = fromMsalAuth.reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('login', () => {
    it('should set loading to true and loaded false', () => {
      const user = new User(null, null, null, null, null, null);
      const { initialState } = fromMsalAuth;
      const action = new fromMsalAuth.Login();
      const result = fromMsalAuth.reducer(initialState, action);
      expect(result.loading).toBe(true);
      expect(result.loaded).toBe(false);
    });
  });

  describe('successful login', () => {
    it('should expect user not null', () => {
      const user = new User(null, null, null, null, null, null);
      const { initialState } = fromMsalAuth;
      const action = new fromMsalAuth.LoginSuccessful({ user: user });
      const result = fromMsalAuth.reducer(initialState, action);
      expect(result.user).toBe(user);
    });
  });

  describe('fail login', () => {
    it('should expect auth state return to as null and error message', () => {
      const user = new User(null, null, null, null, null, null);
      const { initialState } = fromMsalAuth;
      const action = new fromMsalAuth.LoginFail({ error: 'Error' });
      const result = fromMsalAuth.reducer(initialState, action);
      expect(result).toEqual({
        user: null,
        error: 'Error',
        loaded: true,
        loading: false
      });
    });
  });

  describe('logout', () => {
    it('should expect auth state to return to the initial state', () => {
      const action = new fromMsalAuth.Logout();
      const { initialState } = fromMsalAuth;
      const result = fromMsalAuth.reducer(initialState, action);
      expect(result).toEqual(initialState);
    });
  });

});
