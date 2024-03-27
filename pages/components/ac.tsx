import { useState } from "react"
import Container from "./container"

const Ac = () => {
  const [data, setData] = useState(null);
  const [box, setBox] = useState<any>(null);

  const handleClick = async () => {
    const res = await fetch("/api/ac");

    const  { data } = await res.json();

    formatData(data)
  }

  const formatData = (data: any) => {
    const today = new Date()

    const firstDate = today.getFullYear()-1

    // console.log(today.toLocaleDateString(), firstDate.toLocaleString())

    setData(data)
  }

  /*
  // 1年前から今日までの日付
  function displayDates(startDate: any) {
    const currentDate = new Date("2023-04-01");
    const today = new Date();

    const tmp = [];

    while (currentDate <= today) {
      const obj = {
        date: currentDate.toLocaleDateString(),
        status: "none"
      }

      tmp.push(obj);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setBox(tmp)
  }
  */

  return (
    <Container>
      <h1>AC Test</h1>

      <button
        onClick={handleClick}
      >
        click me
      </button>

      <div>
        {data && (
          <ul>
            {/* @ts-ignore */}
            {data.map((d: any) => (
              <li key={d.id}>{new Date(d.epoch_second * 1000).toLocaleDateString()}</li>
            ))}
          </ul>
        )}
      </div>

      {/*box && (
        <>
          {box.map((b: any) => {
            return (
              <>
                <p key={`date=${b}`}>{b.date}</p>
              </>
            )
          }
          )}
        </>
        )*/}
    </Container>
  )
}

export default Ac
