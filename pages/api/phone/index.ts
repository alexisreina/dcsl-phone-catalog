import { NextApiRequest, NextApiResponse } from "next";
import phoneService from "../../../utils/PhoneService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  try {
    switch (method) {
      case "GET":
        const phones = await phoneService.list();
        return res.status(200).send(phones);
      case "POST":
        if (body?.data) {
          await phoneService.create(body.data);
          return res.status(200).send({ message: "Phone created!" });
        }
        return res.status(400).end("Bad Request");
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
}
