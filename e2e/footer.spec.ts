import { test, expect } from '@playwright/test'

test.describe('Footer', () => {
  test('is visible on the home page', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('contentinfo')).toBeVisible()
  })

  test('is visible on other pages', async ({ page }) => {
    await page.goto('/regelboek')
    await expect(page.getByRole('contentinfo')).toBeVisible()
  })

  test('navigates to the about page', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('contentinfo').getByRole('link', { name: 'Over ons' }).click()
    await expect(page).toHaveURL(/\/over-ons/)
    await expect(page.getByRole('heading', { name: 'Over ons' })).toBeVisible()
  })

  test('has a feedback mailto link', async ({ page }) => {
    await page.goto('/')
    const feedbackLink = page.getByRole('contentinfo').getByRole('link', { name: 'Feedback' })
    await expect(feedbackLink).toBeVisible()
    await expect(feedbackLink).toHaveAttribute('href', /^mailto:/)
  })

  test('renders the Liberapay donate widget script', async ({ page }) => {
    await page.goto('/')
    const donateWidget = page.getByTestId('donate-widget')
    await expect(donateWidget).toBeAttached()
    await expect(donateWidget.locator('script')).toHaveAttribute(
      'src',
      'https://liberapay.com/ota-iod-98/widgets/button.js'
    )
  })
})
