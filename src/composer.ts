import fs from 'fs';
import xml2json from 'xml2json';
import xml2js from 'xml2js';

interface Header {
    Title   : any
    Subtitle: any
    Legend  : any
}

class Composer {
    composeHeader(data : Header) {
        let result : any = {}
        Object.entries(data as object).forEach( ([key, value]) => {
            switch(key) {
                case 'Title': {
                    result['content-headline'] = value;
                    break;
                }
                case 'Subtitle': {
                    // TODO: ?
                    break;
                }
                case 'Legend': {
                    result['content-text'] = value;
                    break;
                }

                default: {
                    console.log(`# ERROR Unexpected tag: "${key}"\n# in: TechnicalDocumentation: \n#\t Header`);
                    break;
                }
            }
            // TODO: <lang>, <cntPath> ?
            result['cntPath'] = '/content/mam/base/en_GB/marketing-products/personal-protection-equipment/draeger-hps-7000';
            result['lang']    = 'en_GB';
        });

        return result;
    }

    composeMarketingInformations(data : any) {
        let result : Array<any> = [];
        //MarketingInformations
        Object.entries(data as object).forEach( ([key, value]) => {
            if(key != 'Title') {
                //MarketingInformation
                Object.entries(value as object).forEach( ([key, value]) => {
                    //Left-/Right- MarketingSection:
                    if(key != 'Graphic') {
                        Object.entries(value as object).forEach( ([key, value]) => {
                            //MarketingInformationContent
                            let entry : any = {}
                            Object.entries(value as object).forEach( ([key, value]) => {
                                switch(key) {
                                    case 'Title': {
                                        entry['content-headline'] = value;
                                        break;
                                    }
                                    case 'Legend': {
                                        entry['content-text'] = value;
                                        break;
                                    }

                                    default: {
                                        console.log(`# ERROR Unexpected tag: "${key}"\n# in: TechnicalDocumentation: 
                                            \n#\t in MarketingInformations
                                            \n#\t\t in MarketingInformation
                                            \n#\t\t\t in MarketingSections
                                            \n#\t\t\t\t in MarketingInformationContent
                                            `);
                                        break;
                                    }
                                }
                                // TODO: <cntPath> ?
                            });
                            result.push(entry);
                        });
                    }
                });
            }
        });
        return result;
    }

    composeBenefits(data : any) {
        let result : Array<any> = [];
        //Benefits
        Object.entries(data as object).forEach( ([key, value]) => {
            let entry : any = {}
            if(key == 'Benefit') {
                Object.entries(value as object).forEach( ([key, value]) => {
                    switch(key) {
                        case 'Title': {
                            entry['content-headline'] = value;
                            break;
                        }
                        case 'Legend': {
                            entry['content-text'] = value;
                            break;
                        }

                        default: {
                            console.log(`# ERROR Unexpected tag: "${key}"\n# in: TechnicalDocumentation: 
                                \n#\t Benefits
                                \n#\t\t Benefit
                                `);
                            break;
                        }
                    }
                });
                result.push(entry);
            }
        });
        return result;
    }

    composeProducts(data : any) {
        let result : Array<any> = [];
        //SystemComponents or Accessories or RelatedProducts
        Object.entries(data as object).forEach( ([key, value]) => {
            let entry : any = {}
            if(key == 'SystemComponent' || key == 'Accessory' || key == 'RelatedProduct') {
                Object.entries(value as object).forEach( ([key, value]) => {
                    switch(key) {
                        case 'Title': {
                            entry['content-headline'] = value;
                            break;
                        }
                        case 'Legend': {
                            entry['content-text'] = value;
                            break;
                        }
                        case 'ProductNumber':
                        case 'Graphic':
                            break;

                        default: {
                            console.log(`# ERROR Unexpected tag: "${key}"\n# in: TechnicalDocumentation: 
                                \n#\t SystemComponents or Accesories or RelatedProducts
                                \n#\t\t SystemComponent or Accessory or RelatedProduct
                                `);
                            break;
                        }
                    }
                });
                result.push(entry);
            }
        });
        return result;
    }

    composeTechnicalData(data : any) {
        let result : Array<any> = [];
        //TechnicalData
        Object.entries(data as object).forEach( ([key, value]) => {
            let entry : any = {}
            //TODO: What about Variants?
            if(key == 'TechnicalDataElement') {
                Object.entries(value as object).forEach( ([key, value]) => {
                    switch(key) {
                        case 'Table': {
                            //TODO: Should we parse the table somehow?
                            entry['content-text'] = value;
                            break;
                        }
                        case 'Title':
                            break;

                        default: {
                            console.log(`# ERROR Unexpected tag: "${key}"\n# in: TechnicalDocumentation: 
                                \n#\t TechnicalData
                                \n#\t\t TechnicalDataElement
                                `);
                            break;
                        }
                    }
                });
                result.push(entry);
            }
        });
        return result;
    }

    composeOrderingInformations(data : any) {
        let result : Array<any> = [];
        //OrderingInformations
        Object.entries(data as object).forEach( ([key, value]) => {
            let entry : any = {}
            if(key == 'OrderingInformation') {
                //OrderingInformation
                Object.entries(value as object).forEach( ([key, value]) => {
                    switch(key) {
                        case 'Table': {
                            //TODO: Should we parse the table somehow?
                            entry['content-text'] = value;
                            break;
                        }
                        case 'Title':
                            break;

                        default: {
                            console.log(`# ERROR Unexpected tag: "${key}"\n# in: TechnicalDocumentation: 
                                \n#\t OrderingInformations
                                \n#\t\t OrderingInformation
                                `);
                            break;
                        }
                    }
                });
                result.push(entry);
            }
        });
        return result;
    }
}

export { Composer }