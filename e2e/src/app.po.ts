import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  navigationMenuExist() {
    return element(by.css('app-header-section')).isDisplayed();
  }
}
