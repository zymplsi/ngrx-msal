import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundPageComponent } from './containers/not-found-page/not-found-page.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { HeaderSectionComponent } from './containers/header-section/header-section.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { AboutPageComponent } from './containers/about-page/about-page.component';

@NgModule({
  declarations: [
    NavMenuComponent,
    HeaderSectionComponent,
    NotFoundPageComponent,
    HomePageComponent,
    AboutPageComponent
  ],
  imports: [CommonModule, RouterModule]
})
export class CoreModule {}
