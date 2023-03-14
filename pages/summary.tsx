import Footer from "./components/Footer"
import styles from "./styles/summary.module.css"

const Sitemap = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <section className={styles.section} id="sample">
          <h1 className={styles.pageTitle}>✨ Site Summary</h1>

          <h2>📸 Sample Pages</h2>

          <p>HTMLとCSSの練習でサンプルWebサイトを作成しました。デザインセンスはありませんが、以下の点について工夫しました。</p>

          <ul>
            <li>ページの表示速度の向上(GoogleのPageSpeed Insightsで90点以上を獲得できるくらい)</li>
            <li>アクセシビリティの向上(Google ChromeのLighthouse機能のAccessibilityでほぼ満点を獲得できるくらい)</li>
            <li>モダンなCSSの機能の利用</li>
            <li>CSS ModulesやTailwind CSSの使用</li>
            <li>Sassは使用しない</li>
            <li>ReactやTypeScriptを使用し、適宜モジュール分割</li>
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

        <section className={styles.section} id="apps">
          <h2>🍜 Apps & Sites</h2>

          <p>作りこんだものから簡単なものまで、色々なアプリケーションやサイトです。Vue.jsとSvelteとかもやりたかったのですが、結局React一辺倒になってしまいました。</p>

          <ul>
            <li>
              <a>
                鳥に生まれることができなかった人へ
              </a>
            </li>
          </ul>
        </section>

        <section className={styles.section} id="task">
          <h2>🎅 個人タスク</h2>
        </section>
      </div>

      <Footer />
    </>
  )
}

export default Sitemap
