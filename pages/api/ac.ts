import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: any
  errorStatus?: "id" | "pass"
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // const time = 	1560046356 - 31536000;
    const time = 1669424304000 / 1000;
    //const response = await fetch(`https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=kento_0225&from_second=${time}`);
    const response = await fetch(`https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=kento_0225&from_second=${time}`);

    const data = await response.json()

    res.status(200).json({ data: data })
  } catch (e) {
    res.status(500)
  }
}