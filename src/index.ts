import fs from 'fs';
import xml2json from 'xml2json';
import xml2js from 'xml2js';

function mapper(data : Buffer, filename : string) {
    const json : {} = xml2json.toJson(data, { object: true });
    console.dir(json, {depth : null, colors: true});

    let builder     = new xml2js.Builder();
    const xml       = builder.buildObject(json)
    console.dir(xml, {depth : null, colors: true});

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

