module.exports = {
  "typescript" : { reactDocgen: false },
  "stories": [
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../pages/components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  }
}