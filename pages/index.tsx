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
          text="Gatsbyで作ったブログです。"
          technologies={["Gatsby", "TypeScript", "CSS Modules", "AWS Amplify"]}
        />

        <AppsAndSites
          url="https://myforms.toriwatari.work/"
          title="My Forms"
          text="フォームの作成を通して、UI/UXやアクセシビリティについて考えます。"
          technologies={["Next.js", "TypeScript", "CSS Modules", "React Hook Forms", "Zod", "MSW", "AWS Amplify"]}
        />

        <AppsAndSites
          url="https://bookstogive-kento-yoshidu.vercel.app/"
          title="BooksToGive"
          text="読み終わって引き取り手を探している本をリストアップするサイトです。"
          technologies={["Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Prisma", "Supabase", "Vercel", "Google Books API"]}
        />

        {/*
        <AppsAndSites
          url="https://tennis-chart.toriwatari.work"
          title="Tennis Chart(仮)"
          text="BIG4と呼ばれる存在がいかに男子テニス界を支配していたか、チャートを用いて振り返ります。バックエンドはRustです。"
          technologies={["Next.js", "TypeScript", "React Query", "Recharts", "Rust", "Actix Web", "PostgreSQL"]}
        />
        */}

        <AppsAndSites
          url="https://github.com/kento-yoshidu/Rust_algorithm"
          title="Rust_algorithm(GitHub)"
          text="Rustで様々なアルゴリズムを実装したり、競技プログラミングに挑みます。"
          technologies={["Rust"]}
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
                num={75}
                text="最新のCSSを学習する"
                completedTasks={["CSS変数", "CSS Nesting", ":has()、:is()、:where()、etc..."]}
                incompleteTasks={["@layer、@container、etc..."]}
              />

              <Card
                color="#ff9f39"
                num={50}
                text="OSS-DB認定資格を取得する"
                completedTasks={["OSS-DB Silver"]}
                incompleteTasks={["OSS-DB Gold"]}
              />

              <Card
                color="#04fc43"
                num={20}
                text="Jamstackサイトを10個作る"
                links={[
                  ["鳥に生まれることができなかった人へ", "https://blog.toriwatari.work/page/1/"],
                  ["スニペット置き場", "https://snipestrageplace.gatsbyjs.io/"]
                ]}
              />

              <Card
                color="#0113f9"
                num={10}
                text="サンプルサイトを10個作る"
                links={[
                  ["Sample Page1", "https://sample1.toriwatari.work"]
                ]}
              />

              <Card
                color="#06ccff"
                num={8}
                text="AWS認定資格を取得する"
                completedTasks={["Solutions Architect Associate"]}
                incompleteTasks={[
                  "Cloud Practitioner",
                  "Developer Associate",
                  "SysOps Administrator Associate",
                  "Advanced Networking Specialty",
                  "Data Analytics Specialty",
                  "Database Specialty",
                  "Machine Learning Specialty",
                  "Security Specialty",
                  "SAP on AWS Specialty",
                  "Solutions Architect Professional",
                  "DevOps Engineer Professional"
                ]}
              />

              <Card
                color="#ff00be"
                num={1}
                text="低レイヤーを理解する"
                incompleteTasks={["C、C++", "Rust", "CPU", "アセンブリ", "コンパイラー", "OS"]}
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
