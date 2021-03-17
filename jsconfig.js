module.exports = {
  compilerOptions: {
    baseUrl: "./src",
    paths: {
      "@config/*": ["components/*"],
      "@components/*": ["components/*"],
      "@routes/*": ["routes/*"],
      "@api/*": ["api/*"],
      "@utils/*": ["utils/*"],
      "@actions/*": ["store/actions/*"],
      "@reducers/*": ["store/reducers/*"],
    },
  },
};
