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
    async function processRecur(p) {
        try {
            let dir = await fs.opendir(p);
            let subDirs = [];
            let imgFiles = [];
            let miscFiles = [];
            for await (let dirent of dir) {
                let name = dirent.name;
                if (dirent.isDirectory()) {
                    subDirs.push(name);
                    processRecur(path.join(p, name));
                } else if (dirent.isFile()) {
                    let extl = name.match(/\.(\w+)$/)?.[0]?.toLowerCase();
                    if ({
                        '.jpg': true,
                        '.jpeg': true,
                        '.jpe': true,
                        '.jfif': true,
                        '.png': true,
                        '.gif': true,
                        '.bmp': true,
                    }[extl]) {
                        imgFiles.push(name)
                    } else if ({
                        '.htm': true,
                        '.html': true,
                        '.txt': true,
                    }[extl]) {
                        if (name !== indexFilename) {
                            miscFiles.push(name)
                        }
                    }
                }
            }
            fs.writeFile(path.join(p, indexFilename), eval('`' + template + '`'), 'utf-8');
        } catch (err) {
            console.error(err);
        }
    }
    processRecur(workingDirectory);
}

processDir({ workingDirectory: process.argv[2], indexFilename: process.argv[3], templateFilename: process.argv[4] });
