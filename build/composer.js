"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Composer = void 0;
class Composer {
    composeHeader(data) {
        let result = {};
        Object.entries(data).forEach(([key, value]) => {
            switch (key) {
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
            result['lang'] = 'en_GB';
        });
        return result;
    }
    composeMarketingInformations(data) {
        let result = [];
        //MarketingInformations
        Object.entries(data).forEach(([key, value]) => {
            if (key != 'Title') {
                //MarketingInformation
                Object.entries(value).forEach(([key, value]) => {
                    //Left-/Right- MarketingSection:
                    if (key != 'Graphic') {
                        Object.entries(value).forEach(([key, value]) => {
                            //MarketingInformationContent
                            let entry = {};
                            Object.entries(value).forEach(([key, value]) => {
                                switch (key) {
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
    composeBenefits(data) {
        let result = [];
        //Benefits
        Object.entries(data).forEach(([key, value]) => {
            let entry = {};
            if (key == 'Benefit') {
                Object.entries(value).forEach(([key, value]) => {
                    switch (key) {
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
            }
            result.push(entry);
        });
        return result;
    }
}
exports.Composer = Composer;
