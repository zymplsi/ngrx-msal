import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPageComponent } from './about-page.component';
import { HeaderSectionComponent } from '../header-section/header-section.component';
import { NavMenuComponent } from '../../components/nav-menu/nav-menu.component';
import { RouterModule } from '@angular/router';
import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromMsalAuth from '../../../msal-auth/store';
import * as fromRoot from '../../../reducers';

describe('AboutPageComponent', () => {
  let component: AboutPageComponent;
  let fixture: ComponentFixture<AboutPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        StoreModule.forRoot({
          ...fromRoot.reducers,
          feature: combineReducers(fromMsalAuth.reducer)
        })
      ],
      declarations: [
        AboutPageComponent,
        HeaderSectionComponent,
        NavMenuComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have app-header-section element', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('app-header-section').nodeType).toBe(1);
  });
});
