const fs = require('fs');
const path = require('path');
const Twig = require('twig');
const prettyBytes = require('pretty-bytes');

module.exports = class HtmlRenderer {
    constructor() {
        this.targetDir = './webpackReport';
        this.templateDir = path.join(__dirname, '../template');
        Twig.extendFilter('prettyBytes', prettyBytes);
    }

    generate(context) {
        this.ensureDirectories();
        const promises = [
            this.renderPage('index.html.twig', 'index.html', context),
            this.renderPage('modules.html.twig', 'modules.html', context),
        ];

        context.chunks.forEach((chunk) => {
            promises.push(this.renderPage('chunk.html.twig', `chunks/${chunk.hash}.html`, { chunk, context }));
        });
        context.modules.forEach((module) => {
            promises.push(this.renderPage('module.html.twig', `modules/${module.index}.html`, { module, context }));
        });
        promises.push(new Promise((resolve, reject) => {
            fs.writeFile(path.join(this.targetDir, 'stats.json'), JSON.stringify(context), (error) => {
                if (error) {
                    return reject(error);
                }
                return resolve();
            });
        }));
        return Promise.all(promises);
    }

    ensureDirectories() {
        if (!fs.existsSync(this.targetDir)) {
            fs.mkdirSync(this.targetDir);
        }

        if (!fs.existsSync(path.join(this.targetDir, 'chunks'))) {
            fs.mkdirSync(path.join(this.targetDir, 'chunks'));
        }
        if (!fs.existsSync(path.join(this.targetDir, 'modules'))) {
            fs.mkdirSync(path.join(this.targetDir, 'modules'));
        }
    }

    renderPage(template, fileName, data) {
        return new Promise((resolve, reject) => {
            Twig.renderFile(path.join(this.templateDir, template), data, (err, html) => {
                if (err) {
                    return reject(err);
                }
                fs.writeFile(path.join(this.targetDir, fileName), html, (error) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve();
                });
                return null;
            });
        });
    }
};
