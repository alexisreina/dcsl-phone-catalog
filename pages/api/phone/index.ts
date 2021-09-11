import { NextApiRequest, NextApiResponse } from "next";
import phoneService, {
  Phone,
  PhoneCollection,
} from "../../../utils/PhoneService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  try {
    switch (method) {
      case "GET":
        const phones = await phoneService.list();
        return res.status(200).send(phones);

      default:
        res.status(405);
    }
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}
