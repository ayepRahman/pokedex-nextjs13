import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

export const handler = nc<NextApiRequest, NextApiResponse>({
  onError(error, req, res, next) {
    console.error(error);
    res.statusCode =
      error.status && error.status >= 100 && error.status < 600
        ? error.status
        : 500;
    res.json({ error });
  },
});
