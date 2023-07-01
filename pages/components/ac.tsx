import { useEffect, useState } from "react"

const Ac = () => {
  const [data, setData] = useState(null);

  const handleClick = async () => {
    const res = await fetch("/api/ac");

    const  { data } = await res.json();

    setData(data)
  }

  return (
    <>
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
            {data.map((d: any) => {
              console.log(d)
              return (
                <>
                  <li>{d.epoch_second * 1000}</li>
                  <li>{new Date(d.epoch_second * 1000).toLocaleDateString()}</li>
                </>
              )
            })}
          </ul>
        )}
      </div>
    </>
  )
}

export default Ac
