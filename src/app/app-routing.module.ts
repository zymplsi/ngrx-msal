import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalAuthGuard } from './msal-auth/services/msal-auth.guard';
import { NotFoundPageComponent } from './core/containers/not-found-page/not-found-page.component';
import { HomePageComponent } from './core/containers/home-page/home-page.component';
import { AboutPageComponent } from './core/containers/about-page/about-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      {
        path: '',
        loadChildren: './home/home.module#HomeModule',
        canLoad: [MsalAuthGuard]
      }
    ]
  },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: '404',
    component: NotFoundPageComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
