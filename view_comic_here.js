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
    const template = await fs.readFile(path.join(__dirname, templateFilename), 'utf-8');
    // string natural comparation "alphanum" algorithm
    // https://stackoverflow.com/questions/1601834/c-implementation-of-or-alternative-to-strcmplogicalw-in-shlwapi-dll
    // https://docs.microsoft.com/en-us/previous-versions/technet-magazine/hh475812(v=msdn.10)?redirectedfrom=MSDN
    const naturalCompare = (x, y) => {
        const isDigit = c => { let i = c.charCodeAt(); return i >= 48 && i <= 57 };
        const toDigit = c => c.charCodeAt() - 48;
        let lx = x.length, ly = y.length, mx, my;
        for (mx = 0, my = 0; mx < lx && my < ly; mx++, my++) {
            if (isDigit(x[mx]) && isDigit(y[my])) {
                let vx = 0, vy = 0;
                for (; mx < lx && isDigit(x[mx]); mx++)
                    vx = vx * 10 + toDigit(x[mx]);
                for (; my < ly && isDigit(y[my]); my++)
                    vy = vy * 10 + toDigit(y[my]);
                if (vx != vy)
                    return vx > vy ? 1 : -1;
            }
            if (mx < lx && my < ly && x[mx] != y[my])
                return x[mx] > y[my] ? 1 : -1;
        }
        return lx - ly;
    };
    const processRecur = async p => {
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
                    let extl = name.match(/\.(\w+)$/)?.[0]?.toLowerCase();
                    if ({ '.jpg': 1, '.jpeg': 1, '.jpe': 1, '.jfif': 1, '.png': 1, '.gif': 1, '.bmp': 1, }[extl]) {
                        imgFiles.push(name);
                    } else if ({ '.htm': 1, '.html': 1, '.txt': 1, }[extl]) {
                        if (name !== indexFilename) {
                            miscFiles.push(name);
                        }
                    }
                }
            }
            let subDirsHtml = subDirs.sort(naturalCompare)
                .map(d => `<a href="${encodeURIComponent(d)}${path.sep}${indexFilename}">${d}${path.sep}</a>`).join('\n');
            let imgFilesHtml = imgFiles.sort(naturalCompare)
                .map(f => `<img src="${encodeURIComponent(f)}" title="${f}">`).join('\n');
            let miscFilesHtml = miscFiles.sort(naturalCompare)
                .map(m => `<a href="${encodeURIComponent(m)}">${m}</a>`).join('\n');
            fs.writeFile(path.join(p, indexFilename), eval('`' + template + '`'), 'utf-8');
        } catch (err) {
            console.error(err);
        }
    };
    processRecur(workingDirectory);
}

processDir({ workingDirectory: process.argv[2], indexFilename: process.argv[3], templateFilename: process.argv[4] });
