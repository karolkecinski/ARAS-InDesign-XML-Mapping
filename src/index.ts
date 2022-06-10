import fs from 'fs';
import xml2json from 'xml2json';
import xml2js from 'xml2js';

function mapper(json : {}, filename : string) {
    

    save(json, filename);
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

load('test.xml')

