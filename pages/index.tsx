import React from "react"
import type { NextPage } from 'next'

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

import Header from './components/Header';

import * as Styles from "./styles/contribute.module.css"

const Home: NextPage = ({ data }: any) => (
  <>
    <Header />

    {/*<div className={Styles.wrapper}>*/}
    <div>
      {data.user.contributionsCollection.contributionCalendar.weeks.map((week: any, i: any) => (
        <div
          key={`week${i}`}
          /* @ts-ignore */
          className={Styles.week}
        >
          {week.contributionDays.map((day: any, i: any) => (
            <div key={`keyday${i}`}>
              {(() => {
                if (day.contributionCount >= 14) {
                  return (
                    <div
                      key={`day5${i}`}
                      /* @ts-ignore */
                      className={`${Styles.green5} ${Styles.box}`}
                    ></div>
                  )
                } else if (day.contributionCount >= 10) {
                  return (
                    <div
                      key={`day4${i}`}
                      /* @ts-ignore */
                      className={`${Styles.green4} ${Styles.box}`}
                    ></div>
                  )
                } else if (day.contributionCount >= 6) {
                  return (
                    <div
                      key={`day3${i}`}
                      /* @ts-ignore */
                      className={`${Styles.green3} ${Styles.box}`}
                    ></div>
                  )
                } else if (day.contributionCount >= 2) {
                  return (
                    <div
                      key={`day2${i}`}
                      /* @ts-ignore */
                      className={`${Styles.green2} ${Styles.box}`}
                    ></div>
                  )
                } else if (day.contributionCount === 1) {
                  return (
                    <div
                      key={`day1${i}`}
                      /* @ts-ignore */
                      className={`${Styles.green1} ${Styles.box}`}
                    ></div>
                  )
                } else {
                  return (
                    <div
                      key={`day0${i}`}
                      /* @ts-ignore */
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
  </>
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
