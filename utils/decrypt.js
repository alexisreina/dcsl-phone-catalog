import crypto from "crypto";
// import account from "./service-account-encrypted";

export default function getCredentials() {
  const algorithm = "aes-128-cbc";
  const decipher = crypto.createDecipheriv(
    algorithm,
    process.env.SERVICE_ENCRYPTION_KEY,
    process.env.SERVICE_ENCRYPTION_IV
  );
  let decrypted = decipher.update(
    process.env.FIREBASE_CREDENTIALS,
    "base64",
    "utf8"
  );
  decrypted += decipher.final("utf8");
  return decrypted;
}
