import { test, expect } from '@playwright/test'

test.describe('PWA installability', () => {
  test('manifest link resolves and parses with expected fields', async ({ page }) => {
    await page.goto('/')

    const manifestHref = await page.locator('link[rel="manifest"]').getAttribute('href')
    expect(manifestHref).toBeTruthy()

    const manifestUrl = new URL(manifestHref!, page.url()).toString()
    const response = await page.request.get(manifestUrl)
    expect(response.ok()).toBe(true)

    const manifest = await response.json()
    expect(manifest.name).toBe('Troefcall Regelboek')
    expect(manifest.short_name).toBe('Troefcall')
    expect(manifest.display).toBe('standalone')
    expect(manifest.start_url).toBe('/')
    expect(manifest.scope).toBe('/')
    expect(manifest.theme_color).toBe('#1b4332')
    expect(manifest.background_color).toBe('#1b4332')
    expect(manifest.lang).toBe('nl')

    expect(Array.isArray(manifest.icons)).toBe(true)
    expect(manifest.icons.length).toBeGreaterThanOrEqual(3)

    const maskable = manifest.icons.find((icon: { purpose?: string }) => icon.purpose === 'maskable')
    expect(maskable).toBeTruthy()
    expect(maskable.sizes).toBe('512x512')
    expect(maskable.src).toContain('icon-512-maskable.png')

    const sizes = manifest.icons.map((icon: { sizes: string }) => icon.sizes)
    expect(sizes).toContain('192x192')
    expect(sizes).toContain('512x512')
  })

  test('html lang attribute matches the Dutch-language manifest', async ({ page }) => {
    await page.goto('/')
    const lang = await page.locator('html').getAttribute('lang')
    expect(lang).toBe('nl')
  })

  test('service worker registers successfully', async ({ page }) => {
    await page.goto('/')

    const registered = await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return false
      const registration = await navigator.serviceWorker.ready
      return !!registration.active
    })

    expect(registered).toBe(true)
  })

  test('app shell is served from cache when offline after first visit', async ({ page, context }) => {
    await page.goto('/')

    // Wait for the service worker to finish installing and take control.
    await page.evaluate(async () => {
      await navigator.serviceWorker.ready
    })
    // Give the precache a moment to settle after activation.
    await page.waitForTimeout(500)

    await context.setOffline(true)

    await page.reload()
    await expect(page.locator('#root')).toBeVisible()

    await context.setOffline(false)
  })
})
