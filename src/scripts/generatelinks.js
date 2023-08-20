import {
    readdir,
    readFile,
    writeFile,
    mkdir,
    access,
    constants
} from 'node:fs/promises';
import { dirname, join, extname } from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

// base folder
const __dirname = join(dirname(fileURLToPath(import.meta.url)), '..');
const templatePath = join(__dirname, 'template.html');


access(templatePath, constants.R_OK)
.then(() =>{
    readFile(templatePath, 'utf8')
    .then((data) => {
        const dom = new JSDOM(data);
        const document = dom.window.document;
        console.log(document.getElementById('post_links'))
    })
})
.catch(() =>{
    console.error('Template file not found.');
})