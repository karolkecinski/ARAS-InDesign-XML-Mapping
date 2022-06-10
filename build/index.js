"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const xml2json_1 = __importDefault(require("xml2json"));
const xml2js_1 = __importDefault(require("xml2js"));
const composer_1 = require("./composer");
function mapper(data, filename) {
    let result = {};
    let CMP = new composer_1.Composer();
    Object.entries(data).forEach(([key, value]) => {
        switch (key) {
            case 'TechnicalDocumentation': {
                result['root'] = {};
                let components = [];
                let accessories = [];
                let related = [];
                Object.entries(value).forEach(([key, value]) => {
                    switch (key) {
                        case 'Header': {
                            result['root']['base'] = CMP.composeHeader(value);
                            break;
                        }
                        case 'MarketingInformations': {
                            result['root']['grouped_title-image-legend']['title-image-legend'] = CMP.composeMarketingInformations(value);
                            break;
                        }
                        case 'Benefits': {
                            result['root']['grouped_benefit']['benefit'] = CMP.composeBenefits(value);
                            break;
                        }
                        case 'Awards': {
                            //TODO: Unknown tag
                            break;
                        }
                        case 'SystemComponents': {
                            components = CMP.composeProducts(value);
                            break;
                        }
                        case 'Accessories': {
                            accessories = CMP.composeProducts(value);
                            break;
                        }
                        case 'RelatedProducts': {
                            //TODO: Make sure that RelatedProducts in ARAS XML should be Products in InDesigh XML!!!!
                            related = CMP.composeProducts(value);
                            break;
                        }
                        case 'TechnicalData': {
                            result['root']['technical-data']['table-data'] = CMP.composeTechnicalData(value);
                            break;
                        }
                        case 'OrderingInformations': {
                            result['root']['ordering-information']['table-data'] = CMP.composeOrderingInformations(value);
                            break;
                        }
                        case 'Notes': {
                            //TODO: Notes not included in the InDesign XML file? 
                            break;
                        }
                        case 'Backpage': {
                            //TODO: Footer
                            break;
                        }
                        default: {
                            console.log(`# ERROR: Unexpected tag: "${key}"\n# in: TechnicalDocumentation`);
                            return;
                        }
                    }
                    //console.log(`${key}: ${typeof value}`);
                });
                result['root']['grouped_product']['product'] = components.concat(accessories.concat(related));
                break;
            }
            default: {
                console.log(`# ERROR: Unexpected tag: "${key}"`);
                return;
            }
        }
        //console.dir(result, {depth : null, colors: true})
    });
    //return;
    save(data, filename);
}
function load(file) {
    console.log(__dirname);
    fs_1.default.readFile(file, (err, data) => {
        const json = xml2json_1.default.toJson(data, { object: true });
        console.dir(json, { depth: null, colors: true });
        save(data, file);
        //mapper(json, file);
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
