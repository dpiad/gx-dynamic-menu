import { newE2EPage } from '@stencil/core/testing';

describe('dynamic-menu-action', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dynamic-menu-action></dynamic-menu-action>');

    const element = await page.find('dynamic-menu-action');
    expect(element).toHaveClass('hydrated');
  });
});
