import fs from 'fs';
import xml2json from 'xml2json';

function mapper(data : Buffer, filename : string) {
    const json : {} = xml2json.toJson(data, { object: true });
    console.dir(json, {depth : null, colors: true});

    const stringifiedJson   = JSON.stringify(json);
    const xml               = xml2json.toXml(stringifiedJson);
    save(xml, filename);
}

function load(file : string) {
    console.log(__dirname);
    fs.readFile(file, (err, data) => {
        mapper(data, file);
    })
}

function save(xml : string, filename : string) {
    fs.writeFile('PARSED_' + filename, xml, {} , (err) => {
        if (err) {
          console.log("err");
        } else {
          console.log("Xml file successfully updated.");
        }
    });
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

