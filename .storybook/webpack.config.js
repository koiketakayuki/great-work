const path = require("path");

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    include: [path.resolve(__dirname, "../src"), path.resolve(__dirname, "../stories")],
    use: [
      require.resolve("awesome-typescript-loader"),
      require.resolve("react-docgen-typescript-loader"),
    ],
  });

  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};