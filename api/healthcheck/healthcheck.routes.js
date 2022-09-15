/**
 * @openapi
 * /api/healthcheck:
 *  get:
 *   tags:
 *   - HealthCheck
 *   description: Get a 200 response if the server is up and running
 *   responses:
 *    200:
 *      description: App is up and running
 */

const express = require('express');

const router = express.Router();

router.get('/', (_, res) => {
  res.json({ message: 'This server is running!!' });
});

module.exports = router;
