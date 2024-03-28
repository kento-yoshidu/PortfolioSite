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
    const unix = Math.floor(time.getTime() / 1000) - (31536000 / 4)
    console.log("time=", unix)

    const response = await fetch(`${process.env.ATCODER_PROBLEMS_API}&from_second=${unix}`);

    const data = await response.json()

    const map = new Map<string, number>()

    for (const d of data) {
      if (d.result === "AC") {
        const date = new Date(d.epoch_second * 1000); // タイムスタンプをミリ秒に変換
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 月は0から始まるため+1する
        const day = String(date.getDate()).padStart(2, '0');

        const key = `${year}-${month}-${day}`

        if (map.has(key)) {
          const currentValue = map.get(key);
          map.set(key, currentValue! + 1);
        } else {
          map.set(key, 1);
        }
      }
    }

    console.log("data = ", map);

    return res.status(200).json({ data })
  } catch (e) {
    return res.status(500)
  }
}
