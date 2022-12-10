import { useQuery, gql } from "@apollo/client"
import { EDGE_RUNTIME_WEBPACK } from "next/dist/shared/lib/constants"
import { writer } from "repl"
import Styles from "../styles/test.module.scss"

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

const Contributes = () => {
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
                      <div className={`${Styles.box} ${Styles.green5}`}>
                        <div className={Styles.info}>
                          <p>{day.contributionCount} contributions on {day.date}</p>
                        </div>
                      </div>
                    )
                  } else if (day.contributionCount >= 8) {
                    return (
                      <div className={`${Styles.box} ${Styles.green4}`}>
                        <div className={Styles.info}>
                          <p>{day.contributionCount} contributions on {day.date}</p>
                        </div>
                      </div>
                    )
                  } else if (day.contributionCount >= 4) {
                    return (
                      <div className={`${Styles.box} ${Styles.green3}`}>
                        <div className={Styles.info}>
                          <p>{day.contributionCount} contributions on {day.date}</p>
                        </div>
                      </div>
                    )
                  } else if (day.contributionCount >= 1) {
                    return (
                      <div className={`${Styles.box} ${Styles.green2}`}>
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
    </>
  )
}

export default Contributes
