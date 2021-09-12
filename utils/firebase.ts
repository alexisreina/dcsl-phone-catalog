import admin, { FirebaseError, ServiceAccount } from "firebase-admin";
import cert from "../serviceAccount.json";

if (!admin?.apps?.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(cert as ServiceAccount),
    });
  } catch (error) {
    const { stack } = error as FirebaseError;
    console.log("Firebase admin initialization error", stack);
  }
}

export default admin;
