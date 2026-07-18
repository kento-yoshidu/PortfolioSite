import React, { useEffect } from "react"
import Head from "next/head"

import Header from './components/Header'
import Container from "./components/container"
import PageLink from "./components/PageLink"
import AppsAndSites from "./components/AppsAndSites"
import Contributes from "./components/Contributions"
import Card from "./components/Card"
import LinkButton from "./components/LinkButton"
import Footer from "./components/Footer"

import elementIntersectionObserver from "../lib/elementIntersectionObserver"
import Styles from "./styles/style.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

const Home = () => {
  useEffect(() => {
    elementIntersectionObserver()
  }, [])

  return (

    <>
      <Head>
        <title>Kento Yoshizu Portfolio Site</title>
      </Head>

      <Header />

      <section
        className={`${Styles.section} ${Styles.sec1} inter`}
        id="sec1"
      >
        <h2 className={Styles.sectionTitle}>Sample Pages</h2>

        <p className={Styles.message}>HTMLとCSSの学習でサンプルWebサイトを作成しました。</p>
        <p className={Styles.message}>デザインセンスがないので書籍を参考にしたものが多いですが、<b>アクセシビリティ</b>を向上させたり、<b>Tailwind CSS</b>を使用したりの工夫をしています。</p>

        <div className={Styles.linkWrapper}>
          <PageLink
            url="https://sample1.toriwatari.work/"
            title="Sample1"
            text="サンプルページ1(作成中)"
          />
        </div>

        <LinkButton path="summary#sample" text="more" />
      </section>

      <section className={`${Styles.section} inter`}>
        <h2 className={Styles.sectionTitle}>Apps & Sites</h2>

        <p className={Styles.message}>作りこんだものから簡単なものまで、色々なアプリケーションやサイトです。</p>

        <AppsAndSites
          url="https://blog.toriwatari.work/page/1/"
          title="鳥に生まれることができなかった人へ"
          text="Gatsbyで作ったブログ"
          technologies={["Gatsby", "TypeScript", "CSS Modules", "AWS Amplify"]}
        />

        <AppsAndSites
          url="https://github.com/kento-yoshidu/Rust_algorithm"
          title="Rust_algorithm(GitHub)"
          text="Rustで様々なアルゴリズムの勉強"
          technologies={["Rust"]}
        />

        <AppsAndSites
          url="https://github.com/kento-yoshidu/toy_ufdb_v0"
          title="Toy UFDB v0"
          text="Union Findをコアロジックにしたデータベースを作成している"
          technologies={["Rust", "Union Find"]}
        />


        <LinkButton path="summary#apps" text="more" />
      </section>

      <section className={`${Styles.section} ${Styles.sec3} inter`}>
        <h2 className={Styles.sectionTitle}>GitHub Contributions</h2>

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
        <Container>
          <div className="inter">
            <h2 className={Styles.sectionTitle}>個人タスク</h2>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "30px",
                flexWrap: "wrap",
                margin: "0 auto"
              }}
            >
              <Card
                color="#ffee00"
                num={50}
                text="UFDB v0を完成させる"
                completedTasks={["コアロジック実装", "コマンド実装"]}
                incompleteTasks={["DB分割機能", "HTML出力機能"]}
              />
            </div>

            <LinkButton path="summary#task" text="more" />
          </div>
        </Container>
      </section>

      <Footer />
    </>
  )
}

export default Home
