import { test, expect } from '@playwright/test'

const VIEWPORTS = [
  { label: 'portrait phone (430×844)', width: 430, height: 844 },
  { label: 'portrait tablet (768×1024)', width: 768, height: 1024 },
]

for (const vp of VIEWPORTS) {
  test.describe(`/demo/slag-oplossen — ${vp.label}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto('/demo/slag-oplossen')
      await page.getByRole('button', { name: 'Start spel' }).click()
      // Wait for the table to be rendered (exact:true avoids matching "Noord/Zuid" in the score bar)
      await expect(page.getByText('Noord', { exact: true })).toBeVisible()
    })

    test('no horizontal scroll', async ({ page }) => {
      const hasHorizontalScroll = await page.evaluate(
        () => document.body.scrollWidth > document.documentElement.clientWidth,
      )
      expect(hasHorizontalScroll).toBe(false)
    })

    test('all four player seats are visible', async ({ page }) => {
      for (const name of ['Noord', 'Oost', 'Zuid', 'West']) {
        await expect(page.getByText(name, { exact: true })).toBeVisible()
      }
    })
  })
}
