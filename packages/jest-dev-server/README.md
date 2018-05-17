# jest-dev-server

Starts a server before your Jest tests and tears it down after.

## Why

Jest tests against local development servers need to spawn a server only during tests.
Servers often have large startup costs, so individual tests may not want to individually start them up and tear them down.

## Usage

`jest-dev-server` exports `setup` for your `globalSetup` and `teardown` for your `globalTeardown`.

```javascript
// globalSetup.js
const { setup: setupServer } = require('jest-dev-server')
module.exports = async function globalSetup() {
  await setupServer({
    command: `node config/start.js --port=3000`,
    port: 3000,
    launchTimeout: 50000,
  })
  // Your global setup
}
```

```javascript
// globalTeardown.js
const { teardown: teardownServer } = require('jest-dev-server')
module.exports = async function globalTeardown() {
  await teardownServer()
  // Your global setup
}
```
