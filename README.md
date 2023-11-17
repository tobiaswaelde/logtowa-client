# LogTowa Client

<!-- #region badges -->
[![Quality Gate Status](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_logtowa-client_AYvTbzjog-fAIT7ou_jB&metric=alert_status&token=sqb_58424cc4277c849abc433d371e95b12065fc5718)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_logtowa-client_AYvTbzjog-fAIT7ou_jB)
[![Maintainability Rating](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_logtowa-client_AYvTbzjog-fAIT7ou_jB&metric=sqale_rating&token=sqb_58424cc4277c849abc433d371e95b12065fc5718)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_logtowa-client_AYvTbzjog-fAIT7ou_jB)
[![Security Rating](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_logtowa-client_AYvTbzjog-fAIT7ou_jB&metric=security_rating&token=sqb_58424cc4277c849abc433d371e95b12065fc5718)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_logtowa-client_AYvTbzjog-fAIT7ou_jB)
[![Vulnerabilities](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_logtowa-client_AYvTbzjog-fAIT7ou_jB&metric=vulnerabilities&token=sqb_58424cc4277c849abc433d371e95b12065fc5718)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_logtowa-client_AYvTbzjog-fAIT7ou_jB)
[![Bugs](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_logtowa-client_AYvTbzjog-fAIT7ou_jB&metric=bugs&token=sqb_58424cc4277c849abc433d371e95b12065fc5718)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_logtowa-client_AYvTbzjog-fAIT7ou_jB)
[![Duplicated Lines (%)](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_logtowa-client_AYvTbzjog-fAIT7ou_jB&metric=duplicated_lines_density&token=sqb_58424cc4277c849abc433d371e95b12065fc5718)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_logtowa-client_AYvTbzjog-fAIT7ou_jB)
<!-- #endregion -->

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

### Log Messages with scope
```ts
logger.scope('db');
logger.debug('Initializing DB connection...');
logger.info('Initialization successful.');
logger.unscope();
```

### Send a single message with a given scope
```ts
logger.scope('db');
logger.debug('Initializing DB connection...');

logger.scoped('other scope').info('Info log with other scope.');
// OR
logger.info('Info log with other scope.', { scope: 'other scope' });
logger.scoped('other scope').info('Info log with another scope.', { scope: 'another scope' }); // meta scope will overwrite other scopes

logger.info('Initialization successful.');
logger.unscope();
```