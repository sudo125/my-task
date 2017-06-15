import { MyTaskPage } from './app.po';

describe('my-task App', function() {
  let page: MyTaskPage;

  beforeEach(() => {
    page = new MyTaskPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
