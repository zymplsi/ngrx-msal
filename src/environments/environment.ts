// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const protectedResourceMap: [string, string[]][] = [
  ['https://graph.microsoft.com', ['user.readbasic.all', 'calendars.read']]
];

export const environment = {
  production: false,
  redirect_url: 'http://localhost:4200',
  client_id: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
  consentScopes: ['user.readbasic.all', 'calendars.read'],
  protectedResourceMap: protectedResourceMap,
  cacheLocation: 'localStorage'


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
