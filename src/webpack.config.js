module.exports = {
    devtool: "source-map", // Ensure source maps are properly handled
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: "pre",
          loader: "source-map-loader",
          exclude: /node_modules\/react-datepicker/, // Ignore source maps for react-datepicker
        },
      ],
    },
  };
  