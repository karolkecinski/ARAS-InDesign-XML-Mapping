"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const xml2json_1 = __importDefault(require("xml2json"));
function mapper(xml) {
    const json = xml2json_1.default.toJson(xml, { object: true });
    console.dir(json, { depth: null, colors: true });
    //save(json);
}
function load(file) {
    console.log(__dirname);
    fs_1.default.readFile(file, (err, data) => {
        mapper(data);
    });
}
function save(json) {
    const c = {};
}
load('test.xml');
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
