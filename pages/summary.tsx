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
          <Link href="/" style={{ display: "block", marginBottom: "20px" }}>← Home</Link>

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
          </ul>
        </section>

        <section className={styles.section}>
          <h2 id="apps">🍜 Apps & Sites</h2>

          <p>作りこんだものから簡単なものまで、色々なアプリケーションやサイトです。Vue.jsとSvelteとかもやりたかったのですが、結局React一辺倒になってしまいました。</p>

          <ul className={styles.siteList}>
            <li>
              <a
                href="https://blog.toriwatari.work/page/1/"
              >
                鳥に生まれることができなかった人へ
              </a>
              <a
                href="https://github.com/kento-yoshidu/GatsbyBlog"
              >
                （Github）
              </a>

              <p>Gatsbyで作ったブログです。一番コミット数の多いサイトです。</p>

              <ul className={styles.techList}>
                <li>Gatsby</li>
                <li>TypeScript</li>
                <li>CSS Modules</li>
                <li>AWS Amplify</li>
              </ul>
            </li>

            <li>
              <a
                href="https://blog.toriwatari.work/page/1/"
              >
                鳥に生まれることができなかった人へ
              </a>
              <p>Gatsbyで作ったブログです。</p>
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 id="task">🌱 資格・認定</h2>

          <ul>
            <li>2025年7月21日: JSTQB認定 Foundation Level試験 V2023</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 id="task">🎅 やりたいこと</h2>

          <h3>放送大学を卒業する</h3>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>No.</th>
                <th>分類A</th>
                <th>分類B</th>
                <th>科目名</th>
                <th>評定</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <th>1</th>
                <th>基盤科目</th>
                <th>-</th>
                <th>身近な統計（’１８）</th>
                <th>A</th>
              </tr>
              <tr>
                <th>2</th>
                <th>基盤科目</th>
                <th>-</th>
                <th>情報学へのとびら（’２２）</th>
                <th>A</th>
              </tr>
              <tr>
                <th>3</th>
                <th>基盤科目</th>
                <th>-</th>
                <th>遠隔学習のためのパソコン活用（’２５）</th>
                <th>Ⓐ</th>
              </tr>
              <tr>
                <th>4</th>
                <th>基盤科目</th>
                <th>-</th>
                <th>より良い思考の技法（’２３）</th>
                <th>-</th>
              </tr>
              <tr>
                <th>5</th>
                <th>基盤科目</th>
                <th>外国語科目</th>
                <th>ビートルズ de 英文法（’２１）</th>
                <th>A</th>
              </tr>
              <tr>
                <th>6</th>
                <th>情報コース</th>
                <th>導入科目</th>
                <th>日常生活のデジタルメディア（’２２）</th>
                <th>Ⓐ</th>
              </tr>
              <tr>
                <th>7</th>
                <th>情報コース</th>
                <th>導入科目</th>
                <th>情報セキュリティと倫理・心得（’２６）</th>
                <th>-</th>
              </tr>
              <tr>
                <th>8</th>
                <th>情報コース</th>
                <th>専門科目</th>
                <th>Ｗｅｂのしくみと応用（’１９）</th>
                <th>Ⓐ</th>
              </tr>
              <tr>
                <th>9</th>
                <th>情報コース</th>
                <th>専門科目</th>
                <th>Ｃ言語基礎演習（’２０）</th>
                <th>Ⓐ</th>
              </tr>
            </tbody>
          </table>
        </section>

        <Link href="/" style={{ display: "block", marginBottom: "20px" }}>← Home</Link>
      </div>

      <Footer />
    </>
  )
}

export default Sitemap
