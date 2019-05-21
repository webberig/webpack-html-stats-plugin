Webpack HTML Stats Plugin
==========================

[![Build Status](https://travis-ci.org/webberig/webpack-html-stats-plugin.svg?branch=master)](https://travis-ci.org/webberig/webpack-html-stats-plugin)

This plugin will generate an HTML report using the Webpack stats object.

The result should be similar to that of [webpack analyse](http://webpack.github.io/analyse/)
with the difference that you don't need to upload/select your `stats.json` 
file. The report is made of static HTML files that you can easily publish for your team
to review, or help you optimize your bundles.

Browse a sample report: https://webberig.github.io/webpack-html-stats-plugin/

## Installation

The plugin is available via [npm](https://www.npmjs.com/package/webpack-html-stats-plugin):

```
$ npm install --save-dev webpack-html-stats-plugin
$ yarn add --dev webpack-html-stats-plugin
```

Add the plugin to your `webpack.config.js`:

```js
const { HtmlStatsPlugin } = require("webpack-html-stats-plugin")

module.exports = {
  plugins: [
    new HtmlStatsPlugin()
  ]
}
```

## How it works

Every time a webpack build is triggered, the report will be generated in 
the `/webpackReport` folder inside your project.

Hot reloading is easily achieved if you use [live-server](http://tapiov.net/live-server/)
to serve the report.


## Contributions

Contributions welcome! The current report being generated is somewhat crude
and lacks much information.

#### Todo's

- [ ] Add tests
- [ ] Properly define webpack version (currently tested on webpack 4.16)
- [ ] Add more information about chunks, modules, assets
- [ ] Implement a build stack for JS and CSS
- [ ] CLI support
- [ ] Configuration options (ie. target location)
- [ ] Add size analysis graphs


