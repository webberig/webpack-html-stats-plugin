

const fs = require('fs');
const path = require('path');
const Twig = require('twig');
const prettyBytes = require('pretty-bytes');
const RenderContext = require('./RenderContext');

class HtmlStatsPlugin {
    /*
    constructor (opts) {
        opts = opts || {};
        this.opts = {};
    }
    */

    apply (compiler) {
        if (compiler.hooks) {
            compiler.hooks.afterEmit.tapPromise('html-stats-plugin', this.emitStats.bind(this));
        } else {
            compiler.plugin('emit', this.emitStats.bind(this));
        }
        Twig.extendFilter('prettyBytes', prettyBytes);
    }

    emitStats (curCompiler) {
        return new Promise((resolve) => {
            const context = new RenderContext(curCompiler);

            const dir = './webpackReport';

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }

            if (!fs.existsSync(path.join(dir, 'chunks'))) {
                fs.mkdirSync(path.join(dir, 'chunks'));
            }
            if (!fs.existsSync(path.join(dir, 'modules'))) {
                fs.mkdirSync(path.join(dir, 'modules'));
            }

            Twig.renderFile(path.join(__dirname, '../template', 'index.html.twig'), context, (err, html) => {
                fs.writeFile(path.join(dir, 'index.html'), html, (error) => {
                    if (error) {
                        throw error;
                    }
                });
            });
            Twig.renderFile(path.join(__dirname, '../template', 'modules.html.twig'), context, (err, html) => {
                fs.writeFile(path.join(dir, 'modules.html'), html, (error) => {
                    if (error) {
                        throw error;
                    }
                });
            });
            context.chunks.forEach((chunk) => {
                Twig.renderFile(path.join(__dirname, '../template', 'chunk.html.twig'), { chunk, context }, (err, html) => {
                    fs.writeFile(path.join(dir, 'chunks', `${chunk.hash}.html`), html, (error) => {
                        if (error) {
                            throw error;
                        }
                    });
                });
            });
            context.modules.forEach((module) => {
                Twig.renderFile(path.join(__dirname, '../template', 'module.html.twig'), { module, context }, (err, html) => {
                    fs.writeFile(path.join(dir, 'modules', `${module.index}.html`), html, (error) => {
                        if (error) {
                            throw error;
                        }
                    });
                });
            });

            fs.writeFile(path.join(dir, 'stats.json'), JSON.stringify(context), (error) => {
                if (error) {
                    throw error;
                }
            });

            resolve();
        });
    }
}

module.exports = HtmlStatsPlugin;
