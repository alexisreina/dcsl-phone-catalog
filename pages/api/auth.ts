import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.FIREBASE_API_KEY;
const uri = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  switch (method) {
    case "POST":
      const { email, password } = body;

      if (!email || !password)
        return res.status(401).end("Invalid user name or password");

      axios
        .post(uri, {
          email,
          password,
        })
        .then((response) => {
          console.log(response);
          res.status(200).send({ token: response.data.idToken });
        })
        .catch((error) => {
          console.error(error);
          res.status(401).end("Invalid user name or password");
        });

      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
