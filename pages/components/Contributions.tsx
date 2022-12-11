import { useState } from "react"
import { useQuery, gql } from "@apollo/client"
import Styles from "../styles/contributions.module.scss"

const Query = gql`
  query getContribution {
    user(login: "kento-yoshidu") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`

const green = [
  "0, 85, 0",
  "0, 120, 0",
  "0, 155, 0",
  "0, 190, 0"
]

const orange = [
  "198, 71, 0",
  "228, 102, 22",
  "245, 132, 35",
  "255, 160, 51"
]

const blue = [
  "0, 53, 98",
  "0, 80, 123",
  "0, 103, 193",
  "0, 129, 241"
]

const Contributions = () => {
  const [theme, setTheme] = useState(green)
  const { data, loading, error } = useQuery(Query)

  if (loading) {
    return (
      <p className={Styles.loadingMessage}>Loading...</p>
    )
  }

  if (error) {
    return (
      <div className={Styles.errorWrapper}>
        <h3 className={Styles.errorMessage}>Error has occurred...🤔</h3>
        <p className={Styles.errorText}>データ取得でエラーが発生しました。<br />GitHubのコントリビューション数を取得して表示する予定でした。<br />申し訳ありませんが、しばらく待ってからアクセスして下さい。</p>
      </div>
    )
  }

  const { weeks } = data.user.contributionsCollection.contributionCalendar
  const { totalContributions } = data.user.contributionsCollection.contributionCalendar

  return (
    <>
      <p className={Styles.count}>Total {totalContributions} contributions 🎉</p>

      <div className={Styles.wrapper}>
        {weeks.map((week: any, i: number) => (
          <div
            key={`week${i}`}
            className={Styles.week}
          >
            {week.contributionDays.map((day: any, i: number) => (
              <>
                {(() => {
                  if (day.contributionCount >= 12) {
                    return (
                      /* @ts-ignore */
                      <div className={`${Styles.box}`} style={{ "--color": theme[0] }}>
                        <div className={Styles.info}>
                          <p>{day.contributionCount} contributions on {day.date}</p>
                        </div>
                      </div>
                    )
                  } else if (day.contributionCount >= 8) {
                    return (
                      /* @ts-ignore */
                      <div className={`${Styles.box}`} style={{ "--color": theme[1] }}>
                        <div className={Styles.info}>
                          <p>{day.contributionCount} contributions on {day.date}</p>
                        </div>
                      </div>
                    )
                  } else if (day.contributionCount >= 4) {
                    return (
                      /* @ts-ignore */
                      <div className={`${Styles.box}`} style={{ "--color": theme[2] }}>
                        <div className={Styles.info}>
                          <p>{day.contributionCount} contributions on {day.date}</p>
                        </div>
                      </div>
                    )
                  } else if (day.contributionCount >= 1) {
                    return (
                      /* @ts-ignore */
                      <div className={`${Styles.box}`} style={{ "--color": theme[3] }}>
                        <div className={Styles.info}>
                          <p>{day.contributionCount} contributions on {day.date}</p>
                        </div>
                      </div>
                    )
                  } else {
                    return (
                      <div className={`${Styles.box} ${Styles.none}`}>
                        <div className={Styles.info}>
                          <p>{day.contributionCount} contributions on {day.date}</p>
                        </div>
                      </div>
                    )
                  }
                })()}
              </>
            ))}
          </div>
        ))}
      </div>

      <div className={Styles.buttonWrapper}>
        <button
          onClick={() => setTheme(green)}
          /* @ts-ignore */
          style={{ "--color": "0, 128, 0" }}
        >
        </button>

        <button
          onClick={() => setTheme(orange)}
          /* @ts-ignore */
          style={{ "--color": "255, 128, 0" }}
        >
        </button>

        <button
          onClick={() => setTheme(blue)}
          /* @ts-ignore */
          style={{ "--color": "0, 0, 255" }}
        >
        </button>
      </div>
    </>
  )
}

export default Contributions
