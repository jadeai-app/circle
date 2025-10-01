import * as admin from 'firebase-admin';

export class AuthService {
  private auth: admin.auth.Auth;

  constructor() {
    // This is a simplified initialization. In a real application,
    // service account credentials would be securely provided.
    if (!admin.apps.length) {
      admin.initializeApp();
    }
    this.auth = admin.auth();
  }

  /**
   * Registers a new user with the provided email and password.
   * @param email The user's email address.
   * @param password The user's password.
   * @returns A promise that resolves with the created user record.
   * @throws Throws an error if the user could not be created (e.g., email already exists).
   */
  async registerUser(email: string, password: string): Promise<admin.auth.UserRecord> {
    try {
      const userRecord = await this.auth.createUser({
        email,
        password,
      });
      return userRecord;
    } catch (error) {
      // The calling function will be responsible for handling specific error codes,
      // such as 'auth/email-already-exists'.
      throw error;
    }
  }
}