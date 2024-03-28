import type { NextApiRequest, NextApiResponse } from "next";

/*
type Data = {
  result: any
  errorStatus?: "id" | "pass"
}
*/

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const today = new Date()
    const unix = Math.floor(today.getTime() / 1000) - (31536000 / 4)

    const response = await fetch(`${process.env.ATCODER_PROBLEMS_API}&from_second=${unix}`);

    const data = await response.json()

    const map = new Map<string, number>()

    // 4か月前の日付を計算
    const fourMonthsAgo = new Date();
    fourMonthsAgo.setMonth(today.getMonth() - 4);

    // 日付の範囲をループしてMapに追加
    const currentDate = new Date(fourMonthsAgo);
    while (currentDate <= today) {
      const dateString = currentDate.toISOString().slice(0, 10); // 日付を"YYYY-MM-DD"形式に変換
      map.set(dateString, 0); // キー: 日付, 値: 0
      currentDate.setDate(currentDate.getDate() + 1); // 次の日付へ
    }

    for (const d of data) {
      if (d.result === "AC") {
        const date = new Date(d.epoch_second * 1000); // タイムスタンプをミリ秒に変換
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 月は0から始まるため+1する
        const day = String(date.getDate()).padStart(2, '0');

        const key = `${year}-${month}-${day}`

        const currentValue = map.get(key);
        map.set(key, currentValue! + 1);
      }
    }

    return res.status(200).json(Object.fromEntries(map))
  } catch (e) {
    return res.status(500)
  }
}
