# LogTowa Client

This package provides a minimal client for [LogTowa](https://github.com/tobiaswaelde/logtowa-app) providing a consoel logger and an interface to log to the LogTowa cloud.

[LogTowa](https://github.com/tobiaswaelde/logtowa-app) is a simple self hosted service which helps you keeping track of your logs in a simple and clear web UI.

## Installation
### Yarn
```sh
yarn add logtowa-client
```
### NPM
```sh
npm install logtowa-client
```

## Usage
```ts
import { LogTowaClient } from 'logtowa-client';

// This information can be found in the web UI
const HOST = 'https://your-api-endpoint';
const API_TOKEN = 'your-api-token';
const APP_KEY = 'app-key';

const logger = new LogTowaClient({
  level: 'verbose', // the minimum level to log; if undefined, all levels will be logged; default: undefined
  console: {
    enabled: true, // enable/disable console logging; default: true
    level: 'verbose', // the minimum level to log; if undefined, all levels will be logged; default: undefined
    timestamps: true, // enable/disable timestamps in console logs; default: true
  },
  cloud: {
    enabled: true,  // enable/disable console logging; default: true
    level: 'verbose', // the minimum level to log; if undefined, all levels will be logged; default: undefined
    host: HOST,
    token: API_TOKEN,
    appKey: APP_KEY,
  }
});
```

There are several ways how you can log a message. You can add metadata which provides more information about the log. You can also add a scope (e.g. "db" for all database related logs, "auth" for all authentication related logs). The scope allows you to easily filter the logs in the web UI.

### Basic Log Message
```ts
logger.info('Hello world.');
```

### Log Message with metadata
```ts
logger.info('User signed in.', { name: 'Tobias', age: 24 });
```

### Log Message with scope
```ts
logger.info('Initialization successful.', { scope: 'db' });
```

### Log Message with metadata & scope 
```ts
logger.info('User signed in.', { scope: 'auth', name: 'Tobias', age: 24 });
```