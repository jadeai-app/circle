// Import the testing utilities
import * as test from 'firebase-functions-test';
import * as admin from 'firebase-admin';

// Import the function to test
import { checkIn } from '../src/index';

// Initialize the test environment
const fft = test();

// Prepare mocks that we can inspect in our tests
const updateMock = jest.fn().mockResolvedValue(true);
const docMock = jest.fn((...args) => ({
  update: updateMock,
}));
const collectionMock = jest.fn((...args) => ({
  doc: docMock,
}));

// Mock the Firebase Admin SDK
jest.mock('firebase-admin', () => {
    const firestore = () => ({
        collection: collectionMock,
    });
    // Mock the FieldValue static property
    firestore.FieldValue = {
        serverTimestamp: jest.fn(() => 'MOCK_SERVER_TIMESTAMP'),
    };
    return {
        initializeApp: jest.fn(),
        firestore,
    };
});


describe('checkIn Cloud Function', () => {
  afterEach(() => {
    // Clean up mocks after each test
    fft.cleanup();
    jest.clearAllMocks();
  });

  it('should allow an authenticated user to check in', async () => {
    // Wrap the function to test
    const wrapped = fft.wrap(checkIn);

    // Mock authentication context
    const context = {
      auth: {
        uid: 'test-user-id',
        token: 'test-token'
      }
    };

    // Call the function
    const result = await wrapped({}, context);

    // Assertions
    expect(result).toEqual({ status: 'success', message: 'Checked in successfully.' });

    // Verify that the Firestore methods were called with the correct parameters
    expect(collectionMock).toHaveBeenCalledWith('users');
    expect(docMock).toHaveBeenCalledWith('test-user-id');
    expect(updateMock).toHaveBeenCalledWith({
      lastCheckIn: 'MOCK_SERVER_TIMESTAMP',
    });
  });

  it('should throw an error if the user is unauthenticated', async () => {
    // Wrap the function to test
    const wrapped = fft.wrap(checkIn);

    // Mock an unauthenticated context
    const context = {};

    // Call the function and expect it to throw an error
    await expect(wrapped({}, context)).rejects.toThrow(
      /The function must be called while authenticated./
    );
  });
});