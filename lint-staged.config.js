module.exports = {
  "*.{js,ts}": ["eslint --ext .js,.ts --cache --fix", "prettier --write"],
  "**/*.ts?(x)": () => "tsc --project tsconfig.json --noEmit",
  "*.{css,scss}": "stylelint --cache --fix",
  "*.{json,md,html,css,scss}": "prettier --write",
};
