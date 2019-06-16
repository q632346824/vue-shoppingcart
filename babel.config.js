const path = require('path')
module.exports = {
  presets: [
    '@vue/app'
  ],
//   plugins: [
//     "transform-remove-strict-mode"  //配置插件，这里很重要
// ],
// "plugins": [
//   ["@babel/plugin-transform-modules-commonjs", { "strictMode": false }]
// ],
// ignore: [
//   './src/lib/mui/mui.min.js'
// ],
ignore: [
  "./src/lib",
]
}
