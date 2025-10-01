# Tests

This directory contains all the automated tests for the LOOPS-AI application. The testing strategy is overseen by the **Validator** faculty to ensure comprehensive coverage and application reliability.

## Test Types

-   **Unit Tests (`*.test.ts`)**: These tests verify the functionality of individual components or functions in isolation. They are placed alongside the file they are testing.
-   **Integration Tests (`*.spec.ts`)**: These tests ensure that different parts of the application work correctly together. They are located in this directory, organized by feature.
-   **End-to-End (E2E) Tests**: These tests simulate real user scenarios and run against a full application instance. The test suites are located in the `e2e` subdirectory.

All tests are run automatically on every pull request to maintain code quality and prevent regressions. New contributions must include appropriate tests.