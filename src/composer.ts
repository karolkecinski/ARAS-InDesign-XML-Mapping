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
        let result : Array<any> = []
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
}

export { Composer }