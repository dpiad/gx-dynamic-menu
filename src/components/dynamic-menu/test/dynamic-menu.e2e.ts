import { newE2EPage } from '@stencil/core/testing';

describe('dynamic-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dynamic-menu></dynamic-menu>');

    const element = await page.find('dynamic-menu');
    expect(element).toHaveClass('hydrated');
  });
});
