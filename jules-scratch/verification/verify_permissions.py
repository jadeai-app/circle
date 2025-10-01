import os
from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    # Get the absolute path to the index.html file
    # This is necessary because the script runs from a different directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    # The public directory is three levels up from the script's directory
    # jules-scratch/verification -> jules-scratch -> /app -> /app/public
    # Correcting the path assumption. pwd is /app
    base_dir = os.path.abspath(os.path.join(current_dir, '..', '..'))
    index_path = os.path.join(base_dir, 'public', 'index.html')

    # Ensure the path is a valid file URL
    if not os.path.exists(index_path):
        raise FileNotFoundError(f"Could not find index.html at {index_path}")

    file_url = f'file://{index_path}'

    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto(file_url)

    # --- Test Case 1: Unauthorized User ---
    print("Testing unauthorized user...")

    # Fill in login credentials for an unauthorized user
    page.locator("#login-email").fill("unauthorized@example.com")
    page.locator("#login-password").fill("password123")

    # Click the login button
    page.locator("#login-button").click()

    # Assert that the "Access Denied" message is visible
    access_denied_message = page.locator("#message")
    expect(access_denied_message).to_have_text("Access Denied. You are not authorized to use this application.")

    # Take a screenshot of the unauthorized access attempt
    unauthorized_screenshot_path = "jules-scratch/verification/unauthorized_access.png"
    page.screenshot(path=unauthorized_screenshot_path)
    print(f"Screenshot saved to {unauthorized_screenshot_path}")

    # Reload the page to reset the state for the next test
    page.reload()

    # --- Test Case 2: Authorized User ---
    print("Testing authorized user...")

    # Fill in login credentials for an authorized user
    page.locator("#login-email").fill("user@example.com")
    page.locator("#login-password").fill("password123")

    # Click the login button
    page.locator("#login-button").click()

    # Assert that the user dashboard is visible
    dashboard = page.locator("#user-dashboard")
    expect(dashboard).to_be_visible()

    # Assert that the welcome message contains the correct email
    expect(page.locator("#user-email")).to_have_text("user@example.com")

    # Take a screenshot of the successful login
    authorized_screenshot_path = "jules-scratch/verification/authorized_access.png"
    page.screenshot(path=authorized_screenshot_path)
    print(f"Screenshot saved to {authorized_screenshot_path}")

    browser.close()

if __name__ == "__main__":
    with sync_playwright() as playwright:
        run_verification(playwright)