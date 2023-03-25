import Link from "next/link"
import Head from "next/head"
import Footer from "./components/Footer"
import styles from "./styles/summary.module.css"

const Sitemap = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <Head>
          <title>Site Summary | Kento Yoshizu Portfolio Site</title>
        </Head>

        <section className={styles.section}>
          <Link href="/" style={{ fontSize: "1.6rem", display: "block", marginBottom: "20px" }}>← Home</Link>

          <h1 className={styles.pageTitle}>✨ Site Summary</h1>

          <h2 id="sample">📸 Sample Pages</h2>

          <p>HTMLとCSSの学習でサンプルWebサイトを作成しました。デザインセンスがないので書籍を参考にしたものが多いですが、以下の点について工夫しました。</p>

          <ul>
            <li>ページの表示速度の向上(GoogleのPageSpeed Insightsで90点以上を獲得できるくらい)</li>
            <li>アクセシビリティの向上(Google ChromeのLighthouse機能のAccessibilityでほぼ満点を獲得できるくらい)</li>
            <li>モダンなCSSの機能の利用</li>
            <li>CSS ModulesやTailwind CSSの使用</li>
            <li>Sassは使用しない</li>
            <li>ReactやTypeScriptを使用したコンポーネント分割</li>
            <li>StorybookによるUIテスト💯</li>
            <li>React Testing Libraryによるテスト💯</li>
            <li>Github Actions、TerraformによるAWSへの自動デプロイ(挑戦中)</li>
            <li>テスト💯の結果などのSlackへの通知</li>
          </ul>

          <hr />

          <ul>
            <li>
              <a href="https://sample1.toriwatari.work/">
                Sample Page1
              </a>
            </li>

            <li>
              <a href="https://sample2.toriwatari.work/">
                Sample Page2
              </a>
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 id="apps">🍜 Apps & Sites</h2>

          <p>作りこんだものから簡単なものまで、色々なアプリケーションやサイトです。Vue.jsとSvelteとかもやりたかったのですが、結局React一辺倒になってしまいました。</p>

          <ul>
            <li>
              <a
                href="https://blog.toriwatari.work/page/1/"
              >
                鳥に生まれることができなかった人へ
              </a>
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 id="task">🎅 個人タスク</h2>
        </section>

        <section className={styles.section}>
          <h2>😸 その他</h2>

          <ul>
            <li>I 💖 HTML & CSS</li>
            <li>I 💖 VSCode & Vim</li>
            <li>I 💖 sed & awk</li>
            <li>I 💖 PostgreSQL</li>
            <li>I 💖 Roger Federer 🎾</li>
          </ul>
        </section>

        <Link href="/" style={{ fontSize: "1.6rem", display: "block", marginBottom: "20px" }}>← Home</Link>
      </div>

      <Footer />
    </>
  )
}

export default Sitemap
