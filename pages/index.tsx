import type { NextPage } from 'next'

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

import * as Styles from "./styles/contribute.module.css"

const Home: NextPage = ({ data }) => (
  <div className={Styles.wrapper}>
    {data.user.contributionsCollection.contributionCalendar.weeks.map((week, i) => (
      <div
        key={`week${i}`}
        className={Styles.week}
      >
        {week.contributionDays.map((day, i) => (
          <div key={`keyday${i}`}>
            {(() => {
              if (day.contributionCount >= 14) {
                return (
                  <div
                    key={`day5${i}`}
                    className={`${Styles.green5} ${Styles.box}`}
                  ></div>
                )
              } else if (day.contributionCount >= 10) {
                return (
                  <div
                    key={`day4${i}`}
                    className={`${Styles.green4} ${Styles.box}`}
                  ></div>
                )
              } else if (day.contributionCount >= 6) {
                return (
                  <div
                    key={`day3${i}`}
                    className={`${Styles.green3} ${Styles.box}`}
                  ></div>
                )
              } else if (day.contributionCount >= 2) {
                return (
                  <div
                    key={`day2${i}`}
                    className={`${Styles.green2} ${Styles.box}`}
                  ></div>
                )
              } else if (day.contributionCount === 1) {
                return (
                  <div
                    key={`day1${i}`}
                    className={`${Styles.green1} ${Styles.box}`}
                  ></div>
                )
              } else {
                return (
                  <div
                    key={`day0${i}`}
                    className={`${Styles.none} ${Styles.box}`}
                  ></div>
                )
              }
            })()}
          </div>
        ))}
      </div>
    ))}
  </div>
)

export default Home

export const getServerSideProps = async () => {
  const token = process.env.GITHUB_API

  const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    // uri: 'https://flyby-gateway.herokuapp.com/',
    headers: {authorization: `Bearer ${token}`},
    cache: new InMemoryCache(),
  });


  const { data } = await client
    .query({
      query: gql`
        query {
          user(login: "kento-yoshidu") {
            contributionsCollection {
              contributionCalendar {
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
      `,
    })

  return {
    props: { data }
  }
}

/* https://zenn.dev/ksyunnnn/scraps/9ee679c5b288fd */
