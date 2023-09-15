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

    const response = await fetch(`${process.env.ATCODER_PROBLEMS_API}&from_second=${unix}`);

    const data = await response.json()

    const acData = data.filter((d: any) => {
      return d.result === "AC"
    })

    console.log(acData)

    res.status(200).json({ data: acData })
  } catch (e) {
    res.status(500)
  }
}
