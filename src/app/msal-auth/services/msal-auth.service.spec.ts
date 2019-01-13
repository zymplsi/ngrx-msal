import { TestBed, fakeAsync, inject } from '@angular/core/testing';

import { MsalAuthService } from './msal-auth.service';
import { MsalConfigProvider } from '../config/auth-msal.config';

describe('MsalAuthService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [MsalConfigProvider]
    })
  );

  it('should be created', () => {
    const service: MsalAuthService = TestBed.get(MsalAuthService);
    expect(service).toBeTruthy();
  });

});
