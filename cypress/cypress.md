# Testing with Cypress

Be sure to run `npm install` before running Cypress.

## Dependencies
Cypress may require a few dependencies to be installed on your system.  See the [Cypress documentation](https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements) for more information.

Some dependencies may be installed on your system, but to be sure, run the following command:

```
$ sudo apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
```

### WSL2 Users

If you are using WSL2 you should follow the instructions [here](https://nickymeuleman.netlify.app/blog/gui-on-wsl2-cypress)

## Running Cypress
To run Cypress with the GUI, run the following command:
```
$ npm run cypress:open
```
or
```
$ npx cypress open
```

To run Cypress in the terminal, run the following command:
```
$ npm run cypress:run
```
or
```
$ npx cypress run
```
This will run all the test cases in the `cypress/e2e` folder. It will save videos of each test case in the `cypress/videos` folder.


Follow [this guide](https://docs.cypress.io/guides/getting-started/installing-cypress.html#Opening-Cypress) to learn more about Cypress.