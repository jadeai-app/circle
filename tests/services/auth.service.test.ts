import { AuthService } from '../../src/services/auth.service';
import * as admin from 'firebase-admin';

// Mock the entire firebase-admin module
jest.mock('firebase-admin', () => {
  const mockAuth = {
    createUser: jest.fn(),
  };
  return {
    initializeApp: jest.fn(),
    auth: () => mockAuth,
    apps: [],
  };
});

describe('AuthService', () => {
  let authService: AuthService;
  let mockCreateUser: jest.Mock;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // We need to access the mock from the mocked module
    mockCreateUser = admin.auth().createUser as jest.Mock;
    authService = new AuthService();
  });

  describe('registerUser', () => {
    it('should create a new user successfully', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const mockUserRecord = { uid: '123', email };

      mockCreateUser.mockResolvedValue(mockUserRecord);

      const userRecord = await authService.registerUser(email, password);

      expect(mockCreateUser).toHaveBeenCalledWith({
        email,
        password,
      });
      expect(userRecord).toEqual(mockUserRecord);
    });

    it('should throw an error if user creation fails', async () => {
      const email = 'existing@example.com';
      const password = 'password123';
      const mockError = new Error('The email address is already in use by another account.');
      (mockError as any).code = 'auth/email-already-exists';

      mockCreateUser.mockRejectedValue(mockError);

      await expect(authService.registerUser(email, password)).rejects.toThrow(mockError);

      expect(mockCreateUser).toHaveBeenCalledWith({
        email,
        password,
      });
    });
  });
});