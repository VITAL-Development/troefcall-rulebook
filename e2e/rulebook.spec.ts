import { test, expect } from '@playwright/test'

test.describe('Rulebook pages load', () => {
  test('setup & dealing page renders', async ({ page }) => {
    await page.goto('/rulebook/setup-dealing')
    await expect(page.getByRole('heading', { name: 'Schudden, delen & troef roepen' })).toBeVisible()
  })

  test('trick-taking page renders', async ({ page }) => {
    await page.goto('/rulebook/trick-taking')
    await expect(page.getByRole('heading', { name: 'Een slag spelen' })).toBeVisible()
  })

  test('winning-a-hand page renders', async ({ page }) => {
    await page.goto('/rulebook/winning-a-hand')
    await expect(page.getByRole('heading', { name: 'Een hand winnen' })).toBeVisible()
  })
})

test.describe('Tab switching', () => {
  test('all three tabs are present and switchable', async ({ page }) => {
    await page.goto('/rulebook/setup-dealing')

    const simple = page.getByRole('tab', { name: /Eenvoudig/ })
    const twist  = page.getByRole('tab', { name: /Met een twist/ })
    const full   = page.getByRole('tab', { name: /Volledig/ })

    await expect(simple).toBeVisible()
    await expect(twist).toBeVisible()
    await expect(full).toBeVisible()

    // Simple tab is selected by default
    await expect(simple).toHaveAttribute('aria-selected', 'true')

    // Switch to twist
    await twist.click()
    await expect(twist).toHaveAttribute('aria-selected', 'true')
    await expect(simple).toHaveAttribute('aria-selected', 'false')

    // Switch to full
    await full.click()
    await expect(full).toHaveAttribute('aria-selected', 'true')
  })
})

test.describe('Step navigation', () => {
  test('Volgende advances and Vorige goes back', async ({ page }) => {
    await page.goto('/rulebook/setup-dealing')

    await expect(page.getByText('Stap 1 /')).toBeVisible()

    await page.getByRole('button', { name: 'Volgende' }).click()
    await expect(page.getByText('Stap 2 /')).toBeVisible()

    await page.getByRole('button', { name: 'Vorige' }).click()
    await expect(page.getByText('Stap 1 /')).toBeVisible()
  })

  test('Vorige is disabled on the first step', async ({ page }) => {
    await page.goto('/rulebook/setup-dealing')
    await expect(page.getByRole('button', { name: 'Vorige' })).toBeDisabled()
  })

  test('Volgende is disabled on the last step', async ({ page }) => {
    await page.goto('/rulebook/setup-dealing')
    // Advance to the last step by clicking until Volgende is disabled
    const next = page.getByRole('button', { name: 'Volgende' })
    while (await next.isEnabled()) {
      await next.click()
    }
    await expect(next).toBeDisabled()
  })
})

test.describe('Trump highlighting', () => {
  test('trump badge appears after a trump declaration step', async ({ page }) => {
    await page.goto('/rulebook/setup-dealing')

    // Advance until the trump badge appears (step 3 in the simple example declares trump)
    const next = page.getByRole('button', { name: 'Volgende' })
    let found = false
    for (let i = 0; i < 10; i++) {
      if (await page.getByText(/Troef:/).isVisible()) { found = true; break }
      if (await next.isDisabled()) break
      await next.click()
    }
    expect(found).toBe(true)
  })
})

test.describe('Score badges', () => {
  test('score badge appears in the full misdeal example', async ({ page }) => {
    await page.goto('/rulebook/setup-dealing')

    await page.getByRole('tab', { name: /Volledig/ }).click()

    const next = page.getByRole('button', { name: 'Volgende' })
    let found = false
    for (let i = 0; i < 15; i++) {
      if (await page.getByText(/punten koppel/).isVisible()) { found = true; break }
      if (await next.isDisabled()) break
      await next.click()
    }
    expect(found).toBe(true)
  })
})

test.describe('Caller and Dealer badges', () => {
  test('Dealer and Caller badges are shown on the table', async ({ page }) => {
    await page.goto('/rulebook/setup-dealing')
    await expect(page.getByText('Dealer').first()).toBeVisible()
    await expect(page.getByText('Caller').first()).toBeVisible()
  })
})
