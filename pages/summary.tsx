const Sitemap = () => {
  return (
    <>
      <h1>Sitemap</h1>

      <section id="samplepages">
        <h2>Sample Pages</h2>

        <p>HTMLとCSSの練習でサンプルWebサイトを作成しました。</p>
        <p>デザインセンスはありませんが、以下の点について工夫しました。</p>

        <ul>
          <li>ページの表示速度(PageSpeed Insightsで90点以上を獲得できるくらい)</li>
          <li>アクセシビリティ(Google ChromeのLighthouse機能のAccessibilityでほぼ満点を獲得できるくらい)</li>
          <li>モダンなCSSの機能を取り込む</li>
          <li>Tailwind CSSを活用する</li>
          <li>React Testing Libraryによるテスト</li>
          <li>StorybookによるUIテスト</li>
          <li>Github Actions、TerraformによるAWSへの自動デプロイ(挑戦中)</li>
        </ul>

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

      <section id="apps">
        <h2>Apps & Sites</h2>

        <ul>
          <li>
            <a>
              鳥に生まれることができなかった人へ
            </a>
          </li>
        </ul>
      </section>

      <section id="tasks">
        <h2>Tasks</h2>
      </section>
    </>
  )
}

export default Sitemap
