import { newE2EPage } from '@stencil/core/testing';

describe('dynamic-menu-popup', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dynamic-menu-popup></dynamic-menu-popup>');

    const element = await page.find('dynamic-menu-popup');
    expect(element).toHaveClass('hydrated');
  });
});
