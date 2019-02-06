const { HtmlStatsPlugin } = require('../');

module.exports = {
    entry: {
        page1: './src/page1',
        page2: './src/page2',
    },
    plugins: [
        new HtmlStatsPlugin(),
    ],
    mode: 'development',
};
