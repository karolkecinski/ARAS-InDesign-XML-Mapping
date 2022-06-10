"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const xml2json_1 = __importDefault(require("xml2json"));
const xml2js_1 = __importDefault(require("xml2js"));
function mapper(data, filename) {
    let result = {};
    Object.entries(data).forEach(([key, value]) => {
        switch (key) {
            case 'TechnicalDocumentation': {
                result['root'] = {};
                Object.entries(value).forEach(([key, value]) => {
                    switch (key) {
                        case 'Header': {
                            result['root'] = composeHeader(value);
                            break;
                        }
                        case 'MarketingInformations': {
                            break;
                        }
                        case 'Benefits': {
                            break;
                        }
                        case 'Awards': {
                            break;
                        }
                        case 'SystemComponents': {
                            break;
                        }
                        case 'Accessories': {
                            break;
                        }
                        case 'RelatedProducts': {
                            break;
                        }
                        case 'TechnicalData': {
                            break;
                        }
                        case 'OrderingInformations': {
                            break;
                        }
                        case 'Notes': {
                            break;
                        }
                        case 'Footer': {
                            break;
                        }
                        default: {
                            console.log(`# ERROR: Unexpected tag: "${key}"\n# in: TechnicalDocumentation`);
                            return;
                        }
                    }
                    console.log(`${key}: ${typeof value}`);
                });
                break;
            }
            default: {
                console.log(`# ERROR: Unexpected tag: "${key}"`);
                return;
            }
        }
        console.log(`${key}: ${value}`);
        console.dir(result, { depth: null, colors: true });
    });
    return;
    console.log(data);
    let cnt = 0;
    for (let tag in data) {
        cnt += 1;
        console.log(tag);
        console.dir(data[tag], { depth: null, colors: true });
        console.log(cnt);
        switch (tag) {
            case 'TechnicalDocumentation': {
                break;
            }
            default: {
                console.log(`%cERROR: Unexpected tag: "${tag}"`);
                return;
            }
        }
    }
    save(data, filename);
}
function load(file) {
    console.log(__dirname);
    fs_1.default.readFile(file, (err, data) => {
        const json = xml2json_1.default.toJson(data, { object: true });
        console.dir(json, { depth: null, colors: true });
        mapper(json, file);
    });
}
function save(json, filename) {
    let builder = new xml2js_1.default.Builder();
    const xml = builder.buildObject(json);
    console.dir(xml, { depth: null, colors: true });
    fs_1.default.writeFile('PARSED_' + filename, xml, {}, (err) => {
        if (err) {
            console.log("err");
        }
        else {
            console.log("Xml file successfully updated.");
        }
    });
}
//load('test.xml')
load('HPS7000.xml');
