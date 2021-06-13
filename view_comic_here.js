#!/usr/bin/env node

/*
MIT License

Copyright (c) 2021 shajunxing

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const fs = require('fs/promises');
const path = require('path');
const process = require('process');

async function processDir({ workingDirectory = process.cwd(), indexFilename = 'view_comic_here.html', templateFilename = 'template.html' } = {}) {
    console.log(arguments);
    console.log(workingDirectory, indexFilename, templateFilename);
    let template = await fs.readFile(path.join(__dirname, templateFilename), 'utf-8');
    let numericOrder = (a, b) => (a.length - b.length) || (a > b ? 1 : -1);
    let processRecur = async p => {
        try {
            let dir = await fs.opendir(p);
            let subDirs = [];
            let imgFiles = [];
            let miscFiles = [];
            for await (let dirent of dir) {
                let name = dirent.name;
                if (dirent.isDirectory()) {
                    subDirs.push(name);
                    processRecur(path.join(p, name)); // no await
                } else if (dirent.isFile()) {
                    let nameParsed = path.parse(name);
                    let extl = nameParsed.ext.toLowerCase();
                    if ({ '.jpg': 1, '.jpeg': 1, '.jpe': 1, '.jfif': 1, '.png': 1, '.gif': 1, '.bmp': 1, }[extl]) {
                        imgFiles.push(nameParsed);
                    } else if ({ '.htm': 1, '.html': 1, '.txt': 1, }[extl]) {
                        if (name !== indexFilename) {
                            miscFiles.push(name);
                        }
                    }
                }
            }
            let subDirsHtml = subDirs.sort(numericOrder)
                .map(d => `<a href="${encodeURIComponent(d)}${path.sep}${indexFilename}">${d}${path.sep}</a>`).join('\n');
            let imgFilesHtml = imgFiles.sort((a, b) => numericOrder(a.name, b.name))
                .map(f => `<img src="${encodeURIComponent(f.base)}" title="${f.base}">`).join('\n');
            let miscFilesHtml = miscFiles.sort()
                .map(m => `<a href="${encodeURIComponent(m)}">${m}</a>`).join('\n');
            fs.writeFile(path.join(p, indexFilename), eval('`' + template + '`'), 'utf-8');
        } catch (err) {
            console.error(err);
        }
    };
    processRecur(workingDirectory);
}

processDir({ workingDirectory: process.argv[2], indexFilename: process.argv[3], templateFilename: process.argv[4] });
