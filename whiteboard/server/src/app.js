// @flow

import express from 'express';

/**
 * Express application.
 */
const app: express$Application<> = express();

app.use(express.json());

export default app;
