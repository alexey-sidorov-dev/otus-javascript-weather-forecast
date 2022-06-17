module.exports = (api) => ({
  plugins: ["lodash", "@babel/plugin-transform-runtime"],
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: 3,
        targets: api.caller((caller) => caller && caller.target === "node")
          ? { node: "current" }
          : { chrome: "58", ie: "11" },
      },
    ],
  ],
});
