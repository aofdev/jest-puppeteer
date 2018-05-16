# jest-dev-server

Starts a server before your Jest tests and tears it down after.

## Why

Jest tests against local development servers need to spawn a server only during tests.
Servers often have large startup costs, so individual tests may not want to individually start them up and tear them down.

## Usage

`jest-dev-server` exports `setupServer` for your `globalSetup` and `teardownServer` for your `globalTeardown`.

```javascript
// globalSetup.js
module.exports = require('jest-dev-server').setupServer({
    command: `node config/start.js --port=3000`,
    port: 3000,
    launchTimeout: 50000,
})
```

```javascript
// globalTeardown.js
module.exports = require('jest-dev-server').teardownServer
```
