import fs from 'fs';
import xml2json from 'xml2json';
import xml2js from 'xml2js';
import { Composer } from './composer';

function mapper(data : any, filename : string) {

    let result : any = {}
    let CMP : Composer = new Composer()

    Object.entries(data).forEach( ([key, value]) => { 
        switch(key) {
            case 'TechnicalDocumentation': {
                result['root'] = {}
                Object.entries(value as object).forEach( ([key, value]) => {
                    switch(key) {
                        case 'Header': {
                            result['root']['base'] = CMP.composeHeader(value)
                            break;
                        }
                        case 'MarketingInformations': {
                            result['root']['grouped_title-image-legend'] = CMP.composeMarketingInformations(value);
                            break;
                        }
                        case 'Benefits': {
                            result['root']['grouped_benefit'] = CMP.composeBenefts(value)
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
        console.dir(result, {depth : null, colors: true})
    });
    return;
    console.log(data);
    let cnt = 0;
    for (let tag in data) {
        cnt += 1;
        console.log(tag);
        console.dir(data[tag], {depth : null, colors: true});
        console.log(cnt);
        switch(tag) {
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

function load(file : string) {
    console.log(__dirname);
    fs.readFile(file, (err, data) => {
        const json : {} = xml2json.toJson(data, { object: true });
        console.dir(json, {depth : null, colors: true});
        mapper(json, file);
    })
}

function save(json : {}, filename : string) {
    let builder     = new xml2js.Builder();
    const xml       = builder.buildObject(json)
    console.dir(xml, {depth : null, colors: true});

    fs.writeFile('PARSED_' + filename, xml, {} , (err) => {
        if (err) {
          console.log("err");
        } else {
          console.log("Xml file successfully updated.");
        }
    });
}

//load('test.xml')
load('HPS7000.xml')

