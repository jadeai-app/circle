from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    # Define a handler for console messages
    def handle_console_message(msg):
        print(f"Browser Console ({msg.type}): {msg.text}")

    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Register the console message handler
    page.on("console", handle_console_message)

    # 1. Arrange: Go to the local development server.
    # The script will now print any errors that occur during page load.
    page.goto("http://localhost:5173")

    # 2. Assert: Check for the main heading of the auth form.
    # I still expect this to fail, but now I'll get the reason why.
    try:
        expect(page.get_by_role("heading", name="Register / Login")).to_be_visible(timeout=5000)
    except Exception as e:
        print(f"\nPlaywright assertion failed as expected: {e}")

    # 3. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)