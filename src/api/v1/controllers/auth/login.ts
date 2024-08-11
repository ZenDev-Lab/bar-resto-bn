import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).json({ badreq: "invalid Credentials" });

  res
    .json({
      userId: "ukfjaldf",
      token: "string",
    })
    .status(200);
};
