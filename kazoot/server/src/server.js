// @flow

/**
 * Web server entry point used in `npm start`.
 */

import app from './app';
import express from 'express';
import path from 'path';

// Serve client files
app.use(express.static(path.join(__dirname, '/../../client/public')));

const port = 3000;
app.listen(port, () => {
  console.info(`Server running on port ${port}`);
});
