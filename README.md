[![Build Status](https://travis-ci.org/nickwhite917/league-demo-es6-rest-api.svg?branch=master)](https://travis-ci.org/nickwhite917/league-demo-es6-rest-api)
## Overview

This is a REST API in Node.js using ES6 and Express with Code Coverage and JWT Authentication. Follows [Airbnb's Javascript style guide](https://github.com/airbnb/javascript).

### Features

| Feature                                | Summary                                                                                                                                                                                                                                                     |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ES6 via Babel                  	 	 | ES6 support using [Babel](https://babeljs.io/).  |
| Authentication via JsonWebToken                  	 	 | Supports authentication using [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken).  |
| Code Linting               			 | JavaScript code linting is done using [ESLint](http://eslint.org) - a pluggable linter tool for identifying and reporting on patterns in JavaScript. Uses ESLint with [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb), which tries to follow the Airbnb JavaScript style guide.                                                                                                |
| Auto server restart                  	 | Restart the server using [nodemon](https://github.com/remy/nodemon) in real-time anytime an edit is made, with babel compilation and eslint.                                                                                                                                                                            |
| ES6 Code Coverage via [istanbul](https://www.npmjs.com/package/istanbul)                  | Supports code coverage of ES6 code using istanbul and mocha. Code coverage reports are saved in `coverage/` directory post `npm test` execution. Open `lcov-report/index.html` to view coverage report. `npm test` also displays code coverage summary on console.                                                                                                                                                                            |
| Debugging via [debug](https://www.npmjs.com/package/debug)           | Instead of inserting and deleting console.log you can replace it with the debug function and just leave it there. You can then selectively debug portions of your code by setting DEBUG env variable. If DEBUG env variable is not set, nothing is displayed to the console.                       |
| Promisified Code via [bluebird](https://github.com/petkaantonov/bluebird)           | We love promise, don't we ? All our code is promisified and even so our tests via [supertest-as-promised](https://www.npmjs.com/package/supertest-as-promised).                       |
| API parameter validation via [express-validation](https://www.npmjs.com/package/express-validation)           | Validate body, params, query, headers and cookies of a request (via middleware) and return a response with errors; if any of the configured validation rules fail. You won't anymore need to make your route handler dirty with such validations. |
| Secure app via [helmet](https://github.com/helmetjs/helmet)           | Helmet helps secure Express apps by setting various HTTP headers. |

- CORS support via [cors](https://github.com/expressjs/cors)
- Uses [http-status](https://www.npmjs.com/package/http-status) to set http status code. It is recommended to use `httpStatus.INTERNAL_SERVER_ERROR` instead of directly using `500` when setting status code.
- Has `.editorconfig` which helps developers define and maintain consistent coding styles between different editors and IDEs.

## Getting Started

Clone the repo:
```sh
git clone git@github.com:nickwhite917/league-demo-es6-rest-api.git
cd league-demo-es6-rest-api
```

Install dependencies:
```sh
npm install
```

Start server:
```sh
# set DEBUG env variable to get debug logs
DEBUG=league-demo-es6-rest-api:* npm start
# OR
# requires gulp to be installed globally
npm i -g gulp
gulp serve
```

Execute tests:
```sh
# compile with babel and run tests
npm test (or gulp mocha)

# use --code-coverage-reporter text to get code coverage for each file
gulp mocha --code-coverage-reporter text
```

Other gulp tasks:
```sh
# Wipe out dist and coverage directory
gulp clean

# Lint code with ESLint
gulp lint

# Default task: Wipes out dist and coverage directory. Compiles using babel.
gulp
```

##### Deployment

```sh
# compile to ES5
1. npm run build or gulp

# upload dist/ to your server
2. scp -rp dist/ user@dest:/path

# install production dependencies only
3. npm i --production

# Use any process manager to start your services
4. pm2 start dist/index.js
```

## Logging

Universal logging library [winston](https://www.npmjs.com/package/winston) is used for logging. It has support for multiple transports.  A transport is essentially a storage device for your logs. Each instance of a winston logger can have multiple transports configured at different levels. For example, one may want error logs to be stored in a persistent remote location (like a database), but all logs output to the console or a local file. We just log to the console for simplicity, you can configure more transports as per your requirement.

#### API logging
Logs detailed info about each api request to console during development.

#### Error logging
Logs stacktrace of error to console along with other details. You should ideally store all error messages persistently.

## Code Coverage
Get code coverage summary on executing `npm test`

`npm test` also generates HTML code coverage report in `coverage/` directory. Open `lcov-report/index.html` to view it.

## Docs and Recipes

* [Gulp recipes](https://github.com/gulpjs/gulp/tree/master/docs/recipes) - the official Gulp recipes directory includes a comprehensive list of guides for different workflows you can add to your project.

## Contributing

Contributions, questions and comments are all welcome and encouraged. For code contributions submit a pull request with unit test.
