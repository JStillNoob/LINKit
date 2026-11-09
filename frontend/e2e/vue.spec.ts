import { test, expect } from '@playwright/test'

test.describe('Profile Showcase and Theming', () => {
  test('renders LINKit brand and profile card correctly', async ({ page }) => {
    await page.goto('/')

    // Check brand header
    await expect(page.locator('header')).toContainText('LINK')
    await expect(page.locator('header')).toContainText('Tap. Link. Connect.')

    // Check profile info
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('button[aria-label="Save contact"]', { hasText: 'Save Contact' })).toBeVisible()
  })

  test('swaps themes through semantic CSS variables on data-theme', async ({ page }) => {
    await page.goto('/')

    // Default theme is professional
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'professional')

    // Click dark theme
    await page.locator('button', { hasText: 'Dark' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

    // Click minimal theme
    await page.locator('button', { hasText: 'Minimal' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'minimal')

    // Click nature theme
    await page.locator('button', { hasText: 'Nature' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'nature')
  })

  test('toggles personal and business profile modes', async ({ page }) => {
    await page.goto('/')

    // In business mode by default
    await expect(page.locator('text=LinkedIn')).toBeVisible()

    // Switch to personal mode
    await page.locator('button[aria-label="Personal Profile"]').click()
    await expect(page.locator('text=Personal Email')).toBeVisible()

    // Switch back to business mode
    await page.locator('button[aria-label="Business Profile"]').click()
    await expect(page.locator('text=LinkedIn')).toBeVisible()
  })

  test('opens and closes exchange contact modal', async ({ page }) => {
    await page.goto('/')

    // Click Exchange button
    await page.locator('button', { hasText: 'Exchange' }).click()
    const modal = page.locator('div[role="dialog"][aria-labelledby="exchange-dialog-title"]')
    await expect(modal).toBeVisible()

    // Close via close button
    await page.locator('button[aria-label="Close exchange contact modal"]').click()
    await expect(modal).toBeHidden()
  })

  test('opens and closes QR modal', async ({ page }) => {
    await page.goto('/')

    // Click QR button
    await page.locator('button[aria-label="Show QR code"]').click()
    const modal = page.locator('div[role="dialog"][aria-labelledby="qr-dialog-title"]')
    await expect(modal).toBeVisible()

    // Close via Escape key
    await page.keyboard.press('Escape')
    await expect(modal).toBeHidden()
  })
})
