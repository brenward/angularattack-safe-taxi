import { SafeTaxiPage } from './app.po';

describe('safe-taxi App', () => {
  let page: SafeTaxiPage;

  beforeEach(() => {
    page = new SafeTaxiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
