function requireUser(req, res, next) {
  
    const user = req.user;
  
    // Check if the user is authenticated
    if (!user) {
      // If not authenticated, send a 401 Unauthorized response
      return res.status(401).json({
        error: 'Authentication required',
      });
    }
  
    // If authenticated, attach the user to the request object
    req.user = user;
  
    // Continue to the next middleware or route handler
    next();
  }
  
  module.exports = {
    requireUser,
  };
  