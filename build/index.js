"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const xml2json_1 = __importDefault(require("xml2json"));
const xml2js_1 = __importDefault(require("xml2js"));
function mapper(data, filename) {
    const json = xml2json_1.default.toJson(data, { object: true });
    console.dir(json, { depth: null, colors: true });
    let builder = new xml2js_1.default.Builder();
    const stringifiedJson = JSON.stringify(json);
    const xml = builder.buildObject(json); //= xml2json.toXml(json);
    console.dir(xml, { depth: null, colors: true });
    save(xml, filename);
}
function load(file) {
    console.log(__dirname);
    fs_1.default.readFile(file, (err, data) => {
        mapper(data, file);
    });
}
function save(xml, filename) {
    fs_1.default.writeFile('PARSED_' + filename, xml, {}, (err) => {
        if (err) {
            console.log("err");
        }
        else {
            console.log("Xml file successfully updated.");
        }
    });
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
