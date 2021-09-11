import { NextApiRequest, NextApiResponse } from "next";
import phoneService from "../../../utils/PhoneService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { id } = req.query;

  if (Array.isArray(id)) return res.status(400);

  try {
    switch (method) {
      case "GET":
        const phone = await phoneService.getOne(id);

        if (phone) {
          return res.status(200).send(phone);
        }

        return res.status(404);
      default:
        res.status(405);
    }
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}
