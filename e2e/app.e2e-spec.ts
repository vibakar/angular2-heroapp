import { HerosAppPage } from './app.po';

describe('heros-app App', () => {
  let page: HerosAppPage;

  beforeEach(() => {
    page = new HerosAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
