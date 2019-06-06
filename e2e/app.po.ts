import { browser, by, element } from 'protractor';

export class AppPage {
  public async navigateTo () {
    return browser.get('/');
  }

  public async title () {
    return element(by.id('title')).getText();
  }

  public city () {
    return element(by.id('city'));
  }

  public search () {
    return element(by.id('search'));
  }

  public error () {
    return element(by.id('error')).getText();
  }
}
