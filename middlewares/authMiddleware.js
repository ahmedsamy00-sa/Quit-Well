import expressAsyncHandler from 'express-async-handler';
import ApiError from '../utils/ApiError.js';
import jwt  from 'jsonwebtoken';

const authMiddleware = expressAsyncHandler(async(req, res, next) => {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(new ApiError("You are not authenticated! Please login to get access.", 401));
        }
        const token = authHeader.split(" ")[1];
        
        const decoded = jwt.verify(token, process.env.Jwt_secret_key);
        req.user = decoded;

        next();
});

export default authMiddleware;