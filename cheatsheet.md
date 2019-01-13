# NgrxMsal

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.4.

## CLI for scaffolding the app

### create new app
ng g new ngrx-msal
cd ngrx-msal

### install dependencies for ngrx
npm i -D @ngrx/schematics 
npm i -S @ngrx/{store,effects,entity,store-devtools}

### set ngrx as default schematic
ng config cli.defaultCollection @ngrx/schematics

### initial setup
ng g store State --root --module app.module.ts
ng g effect App --root --module app.module.ts --nospec

### generate msal-auth module
ng g m msal-auth -m app.module --routing

### generate msal-auth ngrx feature
ng g feature msal-auth/MsalAuth --group --reducer ..reducers/index.ts -m msal-auth/msal-auth.module

## create msal-auth service
ng g s msal-auth/services/msal-auth
npm i -S msal


npm i -S ngrx-store-localstorage 
