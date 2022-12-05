import React from "react"

import Header from './components/Header'
import PageLink from "./components/PageLink"
import Card from "./components/Card"
import Footer from "./components/Footer"

import Styles from "./styles/style.module.scss"
import GithubStyles from "./styles/contribute.module.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const Home = ({ data }: any) => {
  const { weeks } = data.user.contributionsCollection.contributionCalendar
  const { totalContributions } = data.user.contributionsCollection.contributionCalendar

  return (
    <>
      <Header />

      <section
        className={`${Styles.section} ${Styles.sec1}`}
        id="sec1"
      >
        <h2 className={Styles.sectionTitle}>Sample Pages</h2>

        <div className={Styles.linkWrapper}>
          <PageLink
            url="https://blog.toriwatari.work/page/1/"
            title="Sample1"
            text="サンプルページ1"
          />
        </div>
      </section>

      <section className={`${Styles.section}`}>
        <h2 className={Styles.sectionTitle}>Apps</h2>
      </section>

      <section className={`${Styles.section} ${Styles.sec3}`}>
        <h2 className={Styles.sectionTitle}>GitHub Contributions</h2>

        <p className={GithubStyles.count}>Total {totalContributions} contributions 🎉</p>
        
        <div className={GithubStyles.wrapper}>
          {weeks.map((week: any, i: number) => (
            <div
              key={`week${i}`}
              className={GithubStyles.week}
            >
              {week.contributionDays.map((day: any, i: number) => (
                <div key={`key-day${i}`}>
                  {(() => {
                    if (day.contributionCount >= 12) {
                      return (
                        <div
                          key={`key-day5${i}`}
                          className={`${GithubStyles.green5} ${GithubStyles.box}`}
                        >
                          <div className={GithubStyles.info}>
                            <p>{day.contributionCount} contributions on {day.date}</p>
                          </div>
                        </div>
                      )
                    } else if (day.contributionCount >= 8) {
                      return (
                        <div
                          key={`key-day4${i}`}
                          className={`${GithubStyles.green4} ${GithubStyles.box}`}
                        >
                          <div className={GithubStyles.info}>
                            <p>{day.contributionCount} contributions on {day.date}</p>
                          </div>
                        </div>
                      )
                    } else if (day.contributionCount >= 4) {
                      return (
                        <div
                          key={`key-day3${i}`}
                          className={`${GithubStyles.green3} ${GithubStyles.box}`}
                        >
                          <div className={GithubStyles.info}>
                            <p>{day.contributionCount} contributions on {day.date}</p>
                          </div>
                        </div>
                      )
                    } else if (day.contributionCount >= 1) {
                      return (
                        <div
                          key={`key-day2${i}`}
                          className={`${GithubStyles.green2} ${GithubStyles.box}`}
                        >
                          <div className={GithubStyles.info}>
                            <p>{day.contributionCount} contributions on {day.date}</p>
                          </div>
                        </div>
                      )
                    } else {
                      return (
                        <div
                          key={`key-day0${i}`}
                          className={`${GithubStyles.none} ${GithubStyles.box}`}
                        >
                          <div className={GithubStyles.info}>
                            <p>{day.contributionCount} contributions on {day.date}</p>
                          </div>
                        </div>
                      )
                    }
                  })()}
                </div>
              ))}
            </div>
          ))}
        </div>

        <a
          href="https://github.com/kento-yoshidu"
          className={Styles.link}
        >
          <FontAwesomeIcon
            className={Styles.icon}
            icon={faGithub}
          />
        </a>
      </section>

      <section
        className={`${Styles.section} ${Styles.sec4}`}
      >
        <h2 className={Styles.sectionTitle}>2022年度の個人タスク</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
            width: "80%",
            margin: "0 auto"
          }}
        >
          <Card color="#fee800" num={55} text="最新のCSSを学習する" />

          <Card color="#04fc43" num={50} text="Jamstackサイトを10個作る" />

          <Card color="#06ccff" num={50} text="AWS認定資格を2つ以上取る" />

          <Card color="#ff00be" num={45} text="サンプルWebサイトを10個作る" />
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Home

export const getServerSideProps = async () => {
  const token = process.env.GITHUB_API

  const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    headers: {authorization: `Bearer ${token}`},
    cache: new InMemoryCache(),
  });


  const { data } = await client
    .query({
      query: gql`
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
    })

  return {
    props: { data }
  }
}
