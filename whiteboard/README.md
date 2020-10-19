# WebSocket example: Whiteboard

## Setup database connections

This example does not use any database. You can therefore create empty `config.js` files:

```sh
touch server/src/config.js server/test/config.js
```

## Start server

Install dependencies and start server:

```sh
cd server
npm install
npm start
```

### Run server tests:

```sh
npm test
```

Compared to the previous example project, the only additional dependency is
[ws](https://www.npmjs.com/package/ws).

## Bundle client files to be served through server

Install dependencies and bundle client files:

```sh
cd client
npm install
npm start
```

### Run client tests:

```sh
npm test
```
