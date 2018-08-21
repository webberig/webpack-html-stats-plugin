const fs = require('fs');
const path = require('path');
const Twig = require('twig');
const prettyBytes = require('pretty-bytes');
const RenderContext = require('./RenderContext');
const HtmlRenderer = require('./HtmlRenderer');

class HtmlStatsPlugin {
    /*
    constructor (opts) {
        opts = opts || {};
        this.opts = {};
    }
    */

    apply (compiler) {
        this.renderer = new HtmlRenderer();
        if (compiler.hooks) {
            compiler.hooks.done.tapPromise('html-stats-plugin', this.emitStats.bind(this));
        } else {
            compiler.plugin('emit', this.emitStats.bind(this));
        }
        Twig.extendFilter('prettyBytes', prettyBytes);
    }

    emitStats (curCompiler) {
        return new Promise((resolve) => {
            const context = new RenderContext(curCompiler);
            this.renderer.generate(context);
            resolve();
        });
    }
}

module.exports = HtmlStatsPlugin;
