import React from "react"
import Head from "next/head"

import Header from './components/Header'
import PageLink from "./components/PageLink"
import Contributes from "./components/Contributes"
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
      <Head>
        <title>Kento Yoshizu Portfolio Site</title>
      </Head>

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
        <h2 className={Styles.sectionTitle}>Apps & Sites</h2>

        <details className={Styles.details}>
          <summary>
            <a href="https://blog.toriwatari.work/page/1/">鳥に生まれることができなかった人へ</a>
          </summary>
          <p>Gatsbyで作ったブログです。</p>
          <ul>
            <li>Gatsby</li>
            <li>ypeScript</li>
            <li>CSS Modules</li>
            <li>AWS Amplify</li>
          </ul>
        </details>
        <details className={Styles.details}>
          <summary>
            <a href="https://blog.toriwatari.work/page/1/">Books To Give</a>
          </summary>
          <p>読み終わって引き取り手を探している本をリストアップするサイトです。</p>
          <ul>
            <li>Next.js</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Prisma</li>
            <li>Supabase</li>
            <li>Vercel</li>
            <li>Google Books API</li>
          </ul>
        </details>
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

        <div className={Styles.linkWrapper}>
          <a
            href="https://github.com/kento-yoshidu"
            className={Styles.link}
          >
            <FontAwesomeIcon
              className={Styles.icon}
              icon={faGithub}
            />
          </a>
        </div>
      </section>

      <section className={`${Styles.section} ${Styles.sec3}`}>
        <h2 className={Styles.sectionTitle}>GitHub Contributions(その2)</h2>

        <Contributes />

        <div className={Styles.linkWrapper}>
          <a
            href="https://github.com/kento-yoshidu"
            className={Styles.link}
          >
            <FontAwesomeIcon
              className={Styles.icon}
              icon={faGithub}
            />
          </a>
        </div>
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
  const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    headers: {authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_API}`},
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
