import { NextApiRequest, NextApiResponse } from "next";
import phoneService from "../../../utils/PhoneService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const { id } = req.query;

  if (Array.isArray(id)) return res.status(400).end("Invalid parameters");

  try {
    switch (method) {
      case "GET":
        const phone = await phoneService.getOne(id);
        if (phone) return res.status(200).send(phone);
        return res.status(404).end("Not Found");
      case "PUT":
        console.log(body);
        if (body?.data) {
          await phoneService.update(body.data);
          return res.status(200).send({ message: "Phone updated!" });
        }
        return res.status(400).end("Bad Request");
      case "DELETE":
        if (id) {
          await phoneService.delete(id);
          return res.status(200).send({ message: "Phone deleted!" });
        }
        return res.status(400).end("Bad Request");
      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    console.log(e);
    res.status(500).end("Internal Server Error");
  }
}
