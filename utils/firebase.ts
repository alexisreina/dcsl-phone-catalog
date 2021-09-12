import admin, { FirebaseError, ServiceAccount } from "firebase-admin";
import getCredentials from "./decrypt";

const credentials = JSON.parse(getCredentials());

if (!admin?.apps?.length) {
  try {
    admin.initializeApp({ credential: admin.credential.cert(credentials) });
  } catch (error) {
    const { stack } = error as FirebaseError;
    console.log("Firebase admin initialization error", stack);
  }
}

export default admin;
