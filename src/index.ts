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
                let components : Array<any> = [];
                let accessories : Array<any> = [];
                let related : Array<any> = [];

                Object.entries(value as object).forEach( ([key, value]) => {
                    switch(key) {
                        case 'Header': {
                            result['root']['base'] = CMP.composeHeader(value)
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

function load(file : string) {
    console.log(__dirname);
    fs.readFile(file, (err, data) => {
        const json : {} = xml2json.toJson(data, { object: true });
        console.dir(json, {depth : null, colors: true});
        save(data, file)
        //mapper(json, file);
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

