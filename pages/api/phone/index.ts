import { NextApiRequest, NextApiResponse } from "next";
import phoneService, {
  Phone,
  PhoneCollection,
} from "../../../utils/PhoneService";

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
        if (!body?.data) return res.status(400);
        await phoneService.create(body.data);
        return res.status(200).send({ message: "Phone created!" });
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}
