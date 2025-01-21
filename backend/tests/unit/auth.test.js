const { login } = require('../../controllers/authController');
const pool = require('../../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock dependencies
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login()', () => {
    it('should return 400 for invalid credentials', async () => {
      // Mock database query
      const mockQuery = jest.spyOn(pool, 'query')
        .mockResolvedValueOnce([[]]); // Empty result for no user found

      await login(req, res);

      expect(mockQuery).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE email = ?',
        ['test@example.com']
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Invalid credentials'
      });

      mockQuery.mockRestore();
    });

    it('should return 200 and token for valid credentials', async () => {
      // Mock user data
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test User',
        role: 'buyer'
      };

      // Mock database query
      const mockQuery = jest.spyOn(pool, 'query')
        .mockResolvedValueOnce([[mockUser]]);

      // Mock bcrypt compare
      bcrypt.compare.mockResolvedValueOnce(true);

      // Mock jwt sign
      const mockToken = 'test.jwt.token';
      jwt.sign.mockReturnValueOnce(mockToken);

      await login(req, res);

      expect(mockQuery).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE email = ?',
        ['test@example.com']
      );
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: 1, role: 'buyer' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      expect(res.json).toHaveBeenCalledWith({
        token: mockToken,
        user: expect.objectContaining({
          id: 1,
          email: 'test@example.com',
          name: 'Test User',
          role: 'buyer'
        })
      });

      mockQuery.mockRestore();
    });
  });
}); 