import TokenManager from '../security/token-manager.js';
import response from '../utils/response.js';

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    try {
      const actualToken = token.replace('Bearer ', '');
      const user = await TokenManager.verifyAccessToken(
        actualToken,
        process.env.ACCESS_TOKEN_KEY,
      );
      req.user = user;
      return next();
    } catch (error) {
      return response(res, 401, error.message, null);
    }
  }

  return response(res, 401, 'Unauthorized', null);
};

export default authenticateToken;
