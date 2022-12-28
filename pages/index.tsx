import React from "react"
import Head from "next/head"

import Loading from "./components/Loading"
import Header from './components/Header'
import PageLink from "./components/PageLink"
import AppsAndSites from "./components/AppsAndSites"
import Contributes from "./components/Contributions"
import Card from "./components/Card"
import Footer from "./components/Footer"

import Styles from "./styles/style.module.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

const Home = () => (
  <>
    <Head>
      <title>Kento Yoshizu Portfolio Site</title>
    </Head>

    <Loading />

    <Header />

    <section
      className={`${Styles.section} ${Styles.sec1}`}
      id="sec1"
    >
      <h2 className={Styles.sectionTitle}>Sample Pages</h2>

      <div className={Styles.linkWrapper}>
        <PageLink
          url="https://sample1.toriwatari.work/"
          title="Sample1"
          text="サンプルページ1(作成中)"
        />
      </div>
    </section>

    <section className={`${Styles.section}`}>
      <h2 className={Styles.sectionTitle}>Apps & Sites</h2>

      <AppsAndSites
        url="https://blog.toriwatari.work/page/1/"   
        title="鳥に生まれることができなかった人へ"
        text="Gatsbyで作ったブログです。"
        technologies={["Gatsby", "TypeScript", "CSS Modules", "AWS Amplify"]}
      />

      <AppsAndSites
        url="https://bookstogive-kento-yoshidu.vercel.app/"
        title="Books To Give"
        text="読み終わって引き取り手を探している本をリストアップするサイトです。"
        technologies={["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Supabase", "Vercel", "Google Books API"]}
      />

      <AppsAndSites
        url="https://snipet.gatsbyjs.io/"
        title="スニペット置き場（作成中）"
        text="ちょっとしたコードスニペットを置いています。言語は主にJavaScriptとRustです。"
        technologies={["Gatsby", "TypeScript", "Tailwind CSS", "Gatsby Cloud"]}
      />
    </section>

    <section className={`${Styles.section} ${Styles.sec3}`}>
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
      <h2 className={Styles.sectionTitle}>個人タスク</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "30px",
          flexWrap: "wrap",
          width: "80%",
          margin: "0 auto"
        }}
      >
        <Card
          color="#fee800"
          num={55}
          text="最新のCSSを学習する"
          completedTasks={["新しい疑似要素"]}
          incompleteTasks={["and more..."]}
        />

            {/*
        <Card color="#0113f9" num={45} text="サンプルサイトを10個作る" />

        <Card color="#04fc43" num={30} text="Jamstackサイトを10個作る" />

        <Card color="#06ccff" num={8} text="AWS認定資格を全て取得する" />

        <Card color="#ff00be" num={1} text="低レイヤーを理解する" />
      */}
      </div>
    </section>

    <Footer />
  </>
)

export default Home
