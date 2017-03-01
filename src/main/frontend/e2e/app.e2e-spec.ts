import { ToodaiPage } from './app.po';

describe('toodai App', () => {
  let page: ToodaiPage;

  beforeEach(() => {
    page = new ToodaiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
