import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { NavMenuComponent } from '../../components/nav-menu/nav-menu.component';
import { RouterModule } from '@angular/router';
import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromMsalAuth from '../../../msal-auth/store';
import * as fromRoot from '../../../reducers';
import { HeaderSectionComponent } from '../header-section/header-section.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

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
        HomePageComponent,
        HeaderSectionComponent,
        NavMenuComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have router outlet and app-header-section element', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('app-header-section').nodeType).toBe(1);
    expect(el.querySelector('router-outlet').nodeType).toBe(1);
  });
});
