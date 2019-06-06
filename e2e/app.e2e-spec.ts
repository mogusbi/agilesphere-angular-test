import { AppPage } from './app.po';

describe('angular-weather App', () => {
  let page: AppPage;

  beforeEach(async (): Promise<void> => {
    page = new AppPage();

    await page.navigateTo();
  });

  it('should have the correct page title', async (): Promise<void> => {
    const result: string = await page.title();

    expect(result).toEqual('AgileSphere coding test - The Weather App');
  });

  describe('search', (): void => {
    it('should be disabled if no city is input', async (): Promise<void> => {
      await page.city().sendKeys('');

      const result: boolean = await page.search().isEnabled();

      expect(result).toEqual(false);
    });

    it('should be enabled if city is input', async (): Promise<void> => {
      await page.city().sendKeys('Hull');

      const result: boolean = await page.search().isEnabled();

      expect(result).toEqual(true);
    });
  });

  describe('results', (): void => {
    it('should display an error message if no result is found', async (): Promise<void> => {
      await page.city().sendKeys('Fake');
      await page.search().click();

      const result: string = await page.error();

      expect(result).toEqual('Error, unable to get weather');
    });
  });
});
