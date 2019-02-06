const path = require('path');
const { HtmlStatsPlugin } = require('../');

module.exports = {
    entry: {
        page1: path.join(__dirname, './src/page1'),
        page2: path.join(__dirname, './src/page2'),
    },
    plugins: [
        new HtmlStatsPlugin(),
    ],
    mode: 'development',
};
