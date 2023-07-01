import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: any
  errorStatus?: "id" | "pass"
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const time = new Date()
    const unix = Math.floor(time.getTime() / 1000) - 31536000

    const response = await fetch(`https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=kento_0225&from_second=${unix}`);

    const data = await response.json()

    res.status(200).json({ data: data })
  } catch (e) {
    res.status(500)
  }
}
