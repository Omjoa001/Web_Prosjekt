// @flow

import express from 'express';
import router from './kazoot-router';

/**
 * 
 * Express application.
 */
const app: express$Application<> = express();

app.use(express.json());

// Since API is not compatible with v1, API version is increased to v2
app.use('/api/v2', router);

export default app;
