module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  rules: {
    "selector-class-pattern":
      "^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(_([a-z0-9]+-?)+){0,2}?$",
  },
  "no-descending-specificity": [true, { ignore: [".ol*", "button"] }],
};
