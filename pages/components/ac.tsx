import { useState } from "react"
import Container from "./container"

import Styles from "../styles/contributions.module.css"

const Ac = () => {
  const [data, setData] = useState<Map<string, number> | null>(null);

  const handleClick = async () => {
    const res = await fetch("/api/ac");

    setData(await res.json())
  }

  const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  // 7個ごとに分割して格納する配列
  const dividedArray = [];

  // 7個ごとに分割して格納
  for (let i = 0; i < myArray.length; i += 7) {
      const chunk = myArray.slice(i, i + 7);
      dividedArray.push(chunk);
  }

  // 各要素を <div> 要素に格納
  const result = dividedArray.map((chunk, index) => {
      const innerDivs = chunk.map((item) => `<div>${item}</div>`).join('');
      return `<div class="outer-div">${innerDivs}</div>`;
  });

  // console.log(result)

  return (
    <>
      <p className={Styles.count}>過去4ヵ月間のAtCoderのAC数を表示します ※工事中👷‍♂️</p>

      <div className={Styles.wrapper}>

        <button
          onClick={handleClick}
        >
          click me
        </button>

        {data && Object.entries(data).map(([k, v]) => {
          return (
            <p key="k">{k}: {v}</p>
          )
        })}

        {data && (
          <button onClick={() => setData(null)}>閉じる</button>
        )}
      </div>
    </>
  )
}

export default Ac
