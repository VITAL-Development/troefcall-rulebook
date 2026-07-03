import { test, expect } from '@playwright/test'

test.describe('Home page content', () => {
  test('loads and shows the Troefcall heading', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Troefcall', level: 1 })).toBeVisible()
  })

  test('contains a section card for the rulebook', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('main').getByRole('link', { name: 'Regelboek' })).toBeVisible()
  })

  test('contains a section card for the glossary', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('main').getByRole('link', { name: 'Woordenboek' })).toBeVisible()
  })

  test('contains a section card for the demo', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('main').getByRole('link', { name: 'Probeer het' })).toBeVisible()
  })

  test('navigates from home to rulebook index', async ({ page }) => {
    await page.goto('/')
    await page.locator('main').getByRole('link', { name: 'Regelboek' }).click()
    await expect(page).toHaveURL(/\/rulebook/)
    await expect(page.getByRole('heading', { name: 'Regelboek' })).toBeVisible()
  })

  test('navigates from home to glossary index', async ({ page }) => {
    await page.goto('/')
    await page.locator('main').getByRole('link', { name: 'Woordenboek' }).click()
    await expect(page).toHaveURL(/\/glossary/)
    await expect(page.getByRole('heading', { name: 'Woordenboek' })).toBeVisible()
  })

  test('navigates from home to demo', async ({ page }) => {
    await page.goto('/')
    await page.locator('main').getByRole('link', { name: 'Probeer het' }).click()
    await expect(page).toHaveURL(/\/demo\/trick-resolution/)
  })
})

test.describe('Responsive layout at 375px (mobile)', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('home page nav does not overflow at 375px', async ({ page }) => {
    await page.goto('/')
    const nav = page.getByRole('navigation')
    const navBox = await nav.boundingBox()
    expect(navBox).not.toBeNull()
    expect(navBox!.width).toBeLessThanOrEqual(375)
  })

  test('home page nav links are accessible at 375px', async ({ page }) => {
    await page.goto('/')
    // All nav links should still be present in the DOM and visible
    await expect(page.getByRole('link', { name: 'Regelboek' }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Woordenboek' }).first()).toBeVisible()
  })

  test('home page section cards are visible at 375px', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('main').getByRole('link', { name: 'Regelboek' })).toBeVisible()
    await expect(page.locator('main').getByRole('link', { name: 'Woordenboek' })).toBeVisible()
    await expect(page.locator('main').getByRole('link', { name: 'Probeer het' })).toBeVisible()
  })

  test('rulebook index does not overflow horizontally at 375px', async ({ page }) => {
    await page.goto('/rulebook')
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth)
    expect(scrollWidth).toBeLessThanOrEqual(375)
  })

  test('glossary index does not overflow horizontally at 375px', async ({ page }) => {
    await page.goto('/glossary')
    const scrollWidth = await page.evaluate(() => document.body.scrollWidth)
    expect(scrollWidth).toBeLessThanOrEqual(375)
  })
})

test.describe('Responsive layout at 1024px (tablet)', () => {
  test.use({ viewport: { width: 1024, height: 768 } })

  test('home page heading and all three section cards are visible at 1024px', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Troefcall', level: 1 })).toBeVisible()
    await expect(page.locator('main').getByRole('link', { name: 'Regelboek' })).toBeVisible()
    await expect(page.locator('main').getByRole('link', { name: 'Woordenboek' })).toBeVisible()
    await expect(page.locator('main').getByRole('link', { name: 'Probeer het' })).toBeVisible()
  })

  test('all four nav links are visible at 1024px', async ({ page }) => {
    await page.goto('/')
    const nav = page.getByRole('navigation')
    await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Regelboek' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Woordenboek' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'Probeer het' })).toBeVisible()
  })

  test('rulebook index loads correctly at 1024px', async ({ page }) => {
    await page.goto('/rulebook')
    await expect(page.getByRole('heading', { name: 'Regelboek' })).toBeVisible()
  })

  test('glossary index loads correctly at 1024px', async ({ page }) => {
    await page.goto('/glossary')
    await expect(page.getByRole('heading', { name: 'Woordenboek' })).toBeVisible()
  })
})
