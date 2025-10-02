from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # 1. Go to the local development server.
    page.goto("http://localhost:5173")

    # 2. Wait for the page to be fully loaded.
    page.wait_for_load_state('networkidle')

    # 3. Get and print the entire inner HTML of the body.
    body_html = page.evaluate("() => document.body.innerHTML")
    print("--- Page Body HTML ---")
    print(body_html)
    print("----------------------")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)