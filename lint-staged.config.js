module.exports = {
  "*.js": [
    "eslint --config eslint.config.js --cache --fix",
    "prettier --write",
  ],
  "*.{json,md,html,css}": "prettier --write",
};
