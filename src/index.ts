import fs from 'fs';
import { nodeModuleNameResolver } from 'typescript';
import { fileURLToPath } from 'url';
import xml2js, { Parser, convertableToString } from 'xml2js';
import xml2json from 'xml2json';

function mapper(xml : Buffer) {
    const json : {} = xml2json.toJson(xml, { object: true });
    console.dir(json, {depth : null, colors: true});
    //save(json);
}

function load(file : string) {
    console.log(__dirname);
    fs.readFile(file, (err, data) => {
        mapper(data);
    })
}

function save(json : string) {
    const c = {} 
}

load('test.xml')

// function mapper(xml : convertableToString) {
//     const parser : Parser = new xml2js.Parser();
//     const result = parser.parseString(xml, (err, result) => {
//         console.dir(result)
//         save(result)
//     });
// }

// function load() {
//     fs.readFile(__dirname + fileURLToPath, (err, data) => {
//         mapper(data);
//     })
// }

// function save(data) {

// }

