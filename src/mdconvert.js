import { marked } from 'marked';
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

if (process.argv.length < 3) {
    console.log('Usage: node mdconvert.js [input_folder] [output_folder]');
    process.exit(1);
}

const inputFolder = process.argv[2];
const outputFolder = process.argv[3];


function convert(files){
    files.forEach((fileName) => {
        var htmlFileName = fileName.replace('.md', '.html');
        let srcPath = join(blogPostFolder, fileName);
        readFile(srcPath, 'utf8')
            .then((data) => {
                let htmlData = marked.parse(data);
                writeFile(join(destPath, htmlFileName), htmlData)
                    .then(() => {
                        console.log(`Converted ${fileName}`);
                    })
                    .catch((e) => {
                        console.error(e);
                    })
            })
    })
}

// base folder
const __dirname = dirname(fileURLToPath(import.meta.url));
// join path
const blogPostFolder = join(__dirname, inputFolder);
// destination
const destPath = join(__dirname, outputFolder);
access(destPath, constants.W_OK)
.catch(() =>{
    mkdir(destPath);
})
.then(() =>{
  // read all the contents
  readdir(blogPostFolder)
  .then((files) => files.filter(f => extname(f) === '.md'))
  .then(convert)
  .catch((e) => {
    console.error(e);
  })  
})
.catch((e) => {
    console.error(e);
})