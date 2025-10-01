import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

export const checkIn = functions.https.onCall(async (data, context) => {
  // Check if the user is authenticated.
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }

  const uid = context.auth.uid;
  const userRef = db.collection("users").doc(uid);

  try {
    // Update the user's lastCheckIn timestamp.
    await userRef.update({
      lastCheckIn: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { status: "success", message: "Checked in successfully." };
  } catch (error) {
    console.error("Check-in failed for user:", uid, error);
    throw new functions.https.HttpsError(
      "internal",
      "An error occurred while trying to check in."
    );
  }
});