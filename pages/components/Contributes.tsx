import { useQuery, gql } from "@apollo/client"
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

  return (
    <p style={{ "textAlign": "center", "fontSize": "2rem" }}>Total {data.user.contributionsCollection.contributionCalendar.totalContributions} contributions 🎉</p>
    /*
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
      */
  )
}

export default Contributes
