# EngageSphere

Sample project with a [Node.js](https://nodejs.org/) backend and a [React](https://react.dev/) frontend.

## Business rules

Read the following [doc](./docs/Requirements.md) to understand all the EngageSphere application's functionalities.

## Pre-requirements

To run this project, you will need:

- [git](https://git-scm.com/downloads) (I've used version `2.42.1` while writing this doc)
- [Node.js](https://nodejs.org/en/) (I've used version `v22.13.1` while writing this doc)
- npm (I've used version `10.9.2` while writing this doc)

**Note:** When installing Node.js, npm is automatically installed too.

## Installing and starting the servers

Read the following [doc](./docs/TestEnvironment.md) to install and start the backend and frontend servers.

## Test cases

Read the following [doc](./docs/TestCases.md) to get a list of test cases.

## Running Cypress Tests

This project includes end-to-end tests using Cypress, separated into API and GUI test categories. Follow the instructions below to install and run these tests:

### Installing Cypress

1. Ensure you have `Node.js` and `npm` installed as per the pre-requirements above.
2. Navigate to the root directory of your project.
3. Install Cypress as a development dependency by running:

```bash
npm install cypress --save-dev
```

4. Verify that Cypress has been installed by running:

```bash
npx cypress verify
```


### Folder Structure for Tests

The test files are organized as follows:

- **API Tests**: Located in `cypress/e2e/api/engageAPI.cy.js`.
- **GUI Tests**: Located in `cypress/e2e/e2e/engageGUI.cy.js`.


### Running Tests

You can run API and GUI tests separately or together using Cypress commands:

#### Running All Tests

To run all tests (both API and GUI):

- **Interactive Mode**: Launch Cypress Test Runner with:

```bash
npx cypress open
```

Select either individual test files or all available tests from the runner interface.
- **Headless Mode**: Run all tests without opening the graphical interface using:

```bash
npx cypress run
```


#### Running API Tests Only

To run only the API tests:

- **Interactive Mode**: Open Cypress Test Runner:

```bash
npx cypress open
```

Then select `cypress/e2e/api/engageAPI.cy.js`.
- **Headless Mode**: Run only this specific test file:

```bash
npx cypress run --spec "cypress/e2e/api/engageAPI.cy.js"
```


#### Running GUI Tests Only

To run only the GUI tests:

- **Interactive Mode**: Open Cypress Test Runner:

```bash
npx cypress open
```

Then select `cypress/e2e/e2e/engageGUI.cy.js`.
- **Headless Mode**: Run only this specific test file:

```bash
npx cypress run --spec "cypress/e2e/e2e/engageGUI.cy.js"
```


### Additional Commands

- Run tests in a specific browser (e.g., Chrome):

```bash
npx cypress run --browser chrome
```

- Run tests in headed mode (with browser UI visible):

```bash
npx cypress run --headed
```


For more details on writing and running Cypress tests, refer to the official [Cypress documentation](https://docs.cypress.io).

---

Made with ❤️ by [Walmyr](https://walmyr.dev).
Tests by Bruno Figueiredo

<div style="text-align: center">⁂</div>

[^1]: https://pplx-res.cloudinary.com/image/upload/v1742568908/user_uploads/VrYjtGtFTuPLZXf/image.jpg

