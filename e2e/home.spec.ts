import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('links to every project', async ({ page }) => {
    const projects = page.getByRole('region', { name: 'Projects' });
    for (const [name, url] of [
      ['The Binary Game', 'https://binary.loicviennois.com'],
      ['Project Euler Solver', 'https://euler.loicviennois.com'],
      ['KSP Delta-V Planner', 'https://ksp.loicviennois.com'],
    ]) {
      await expect(projects.getByRole('link', { name })).toHaveAttribute(
        'href',
        url,
      );
    }
  });

  test('links to the elsewhere profiles', async ({ page }) => {
    const intro = page.getByRole('region', { name: /I'm Loïc/ });
    await expect(intro.getByRole('link', { name: 'GitHub' })).toBeVisible();
    await expect(intro.getByRole('link', { name: 'Reddit' })).toBeVisible();
    await expect(
      intro.getByRole('link', { name: 'contact@loicviennois.com' }),
    ).toHaveAttribute('href', 'mailto:contact@loicviennois.com');
  });

  test('is dark by default and remembers the chosen theme', async ({
    page,
  }) => {
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');

    await page.getByRole('button', { name: 'Switch to light theme' }).click();
    await expect(html).toHaveAttribute('data-theme', 'light');
    await expect(
      page.getByRole('button', { name: 'Switch to dark theme' }),
    ).toBeVisible();

    await page.reload();
    await expect(html).toHaveAttribute('data-theme', 'light');
  });

  for (const theme of ['dark', 'light'] as const) {
    test(`passes axe checks in the ${theme} theme`, async ({ page }) => {
      if (theme === 'light') {
        await page
          .getByRole('button', { name: 'Switch to light theme' })
          .click();
      }
      // Let the entrance animations settle before checking contrast.
      await page.waitForTimeout(1000);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    });
  }

  test('adds a star where the background is clicked', async ({ page }) => {
    const added = page.locator('[data-added-stars] circle');

    await page.mouse.click(40, 600);
    await expect(added).toHaveCount(1);
    await expect(added).toHaveAttribute('cx', '40');
    await expect(added).toHaveAttribute('cy', '600');

    await page.getByRole('button', { name: 'Switch to light theme' }).click();
    await expect(added).toHaveCount(1);
  });
});
