import { JobHelperPage } from './app.po';

describe('job-helper App', function() {
  let page: JobHelperPage;

  beforeEach(() => {
    page = new JobHelperPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
