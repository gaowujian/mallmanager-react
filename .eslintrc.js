module.exports = {
  parser: "babel-eslint",
  extends: ["react-app"],
  plugins: ["react-hooks"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
  },
};
