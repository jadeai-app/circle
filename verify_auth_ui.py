from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # 1. Arrange: Go to the local development server.
    page.goto("http://localhost:5173")

    # 2. Assert: Check for the main heading of the auth form.
    expect(page.get_by_role("heading", name="Register / Login")).to_be_visible()

    # 3. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)