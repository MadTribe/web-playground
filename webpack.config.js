var path = require("path");
module.exports = {
  entry: { 'main': "./app/scripts/main.js",
           'music' : "./app/scripts/music.js"},

  output: {
    path: path.resolve(__dirname, "app/scripts"),
    publicPath: "scripts/",
    filename: "[name].js"
  }
};
