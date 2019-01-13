import { AppPage } from './app.po';


describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display navigation menu', () => {
    page.navigateTo();
    expect(page.navigationMenuExist()).toEqual(true);
  });
});
