const express = require('express');
const apiRouter = express.Router();

const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const { JWT_SECRET } = process.env;

// JWT authentication middleware
apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    return next(); // nothing to see here
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        return next();
      } else {
        return next({
          name: 'AuthorizationHeaderError',
          message: 'Authorization token malformed',
        });
      }
    } catch (error) {
      return next(error);
    }
  } else {
    return next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

// Logging middleware
apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log('User is set:', req.user);
  }

  next();
});

// Mounting routers
apiRouter.use('/users', require('./users'));
apiRouter.use('/posts', require('./posts'));
apiRouter.use('/tags', require('./tags'));

// Error handling middleware
apiRouter.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

module.exports = apiRouter;
