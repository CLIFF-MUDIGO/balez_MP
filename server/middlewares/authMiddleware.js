const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   try {
        // Get token from header
        const authHeader = req.header("Authorization");
        if (!authHeader) {
            throw new Error("Authorization header missing");
        }
        const token = authHeader.split(" ")[1];
        
        // Verify token
        const decryptedToken = jwt.verify(token, process.env.jwt_secret);
        req.body.userId = decryptedToken.userId;
        next();
   } catch(error) {
       res.status(401).send({
           success: false,
           message: error.message || "Unauthorized"
       });
   }
}
