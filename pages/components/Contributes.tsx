import { useQuery, gql } from "@apollo/client"

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
      <h1>Loading...</h1>
    )
  }

  if (error) {
    return (
      <h1>error has occurred</h1>
    )
  }

  return (
    <h1 style={{ "textAlign": "center" }}>成功！</h1>
  )
}

export default Contributes
