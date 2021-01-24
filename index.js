const { google } = require('googleapis');
const keys = require('./keys.json');
//GETTING STRING TEMPLATES FOR CODE IN EACH FILE
const datasource_code = require('./source_code_templates/datasource');
const mapping_code = require('./source_code_templates/mapping');
const listing_test_code = require('./source_code_templates/listing-test');
const detail_test_code = require('./source_code_templates/detail-test');
const fs = require('fs');
const request = require('request');

//Command : node index.js sheetRowNo foldername //foldername is optional
//By default, the name column is used for foldername, but if it is insufficient  folder name can be specified as cl arg
//e.g. node index.js 100 hospital-de-guadalajara

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);
client.authorize(function (err) {
    if (err) {
        console.log(err);
        return;
    }
    else {
        //FUNCTIONALITY STARTS HERE
        let rowNo = process.argv[2];
        let foldername = process.argv[3];
        //This function returns details for a particular row no
        let rowDetails = getRowDetails(client, rowNo);

        rowDetails.then(function (result) {

            //Getting folder name from name, if not specified from cmd 
            if (!foldername)
                foldername = getFolderName(result.name);
            variablename = getVariableName(result.name);

            //Getting the code as string for each file from template folder 
            //arg variablename is used to generate proper variable names accross files
            //arg foldername is used for import statement 
            datsource = (datasource_code.datasource(result, variablename));
            mapping = (mapping_code.mapping(foldername, variablename));
            listing_test = (listing_test_code.listing_test(foldername, variablename));
            detail_test = (detail_test_code.detail_test(foldername, variablename));


            // CREATE  PARENT DIRECTORY USING FOLDER NAME VALUE
            let dir = `./${foldername}`;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            // CREATING MOCKS DIRECTORY
            let mockdir = `./${foldername}/__mocks__`;
            if (!fs.existsSync(mockdir)) {
                fs.mkdirSync(mockdir);
            }

            //CREATING DATASOURCE, MAPPING AND TEST FILES
            createFile(`${foldername}/${foldername}.datasource.ts`, datsource);
            createFile(`${foldername}/${foldername}.mapping.ts`, mapping);
            createFile(`${foldername}/${foldername}-listing.test.ts`, listing_test);
            createFile(`${foldername}/${foldername}-detail.test.ts`, detail_test);

            // CREATING __mocks__ FILES AND GETTING HTML FROM LIST AND CONTRACT URLS
            // Not getting proper HTML to string for some files, but working for most
            createFile(`${foldername}/__mocks__/listing.html`, '');
            getHTML(result.listingPage, `${foldername}/__mocks__/listing.html`);

            if (result.sampleContractUrl) {
                createFile(`${foldername}/__mocks__/detail.html`, '');
                getHTML(result.sampleContractUrl, `${foldername}/__mocks__/detail.html`);
            }
        })
    }
});

async function getRowDetails(cl, rowNo) {
    const gsapi = google.sheets({ version: 'v4', auth: cl });
    // spreadsheetIds = [];
    //To generalize for all sheets, all sheet Ids can be stored in this array
    //e.g ['mexico'=>'awgwwe2we','brazil'=>'wdwvwvwwrg2']
    //and country and sheet names(range) can be used as command line arguments
    const opt = {
        spreadsheetId: '1kNKMVPlnVFX6ATDrJSeFLJqG8vJkz5tYH5MwWyVKwoc',
        range: 'Sheet1'
    };
    let data = await gsapi.spreadsheets.values.get(opt);// all rows
    let columnNames = data.data.values[0];//column headers
    let rowArray = getEntireRow(columnNames, rowNo, data.data.values);//get required row
    let json = { ...rowArray };
    return json;
}

//FUNCTION TO GET ALL DETAILS FROM ONE ROW AS KEY-VALUE PAIRS
// returns ['name'=>'brazil hospital','listingPage'=>'www.abc.com.list',............]
function getEntireRow(colNames, rowNo, data) {

    let row = [];
    colNames.forEach((colName) => {
        var col = data[0].indexOf(colName);
        if (col != -1) {
            row[colName] = data[rowNo - 1][col];
        }

    });
    return row;
}

//GENERATE A SUITABLE NAME FROM THE name COLUMN : Intuition -> replace spaces with '_'
function getFolderName(str) {
    str = str.toLowerCase();
    newstr = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i] == '\n')
            continue;
        else if (str[i] === ' ' && (str[i + 1] == '-' || str[i + 1] == '_' || str[i - 1] == '-' || str[i - 1] == '_'))
            continue;
        else if (str[i] === ' ')
            newstr = newstr.concat('_');
        else
            newstr = newstr.concat(str[i]);
    }
    return newstr;
}

//GENERATE A SUITABLE VARIABLE NAME FROM THE name COLUMN : Intuition -> get first word from name, replace '-'s (if present) with '_' to avoid illegal variable names
function getVariableName(str) {
    str = str.toUpperCase();
    newstr = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i] == '\n')
            continue;
        else if (str[i] === ' ')
            break;
        else if (str[i] == '-')
            newstr = newstr.concat('_');
        else
            newstr = newstr.concat(str[i]);
    }
    return newstr;
}
//GENERATE THE FILE WITH CONTENT
function createFile(path, content) {
    fs.writeFile(path, content, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });
}

// WRITE HTML TO FILES : SEND A RERQUEST TO URL, AND WRITE RESPONSE CHUNKS TO LISTING AND DETAIL FILES
function getHTML(url, path) {
    request({
        uri: url,
    }, function (error, response, body) {
        fs.appendFile(path, body, function (err) {
            if (err) {
                // append failed
            } else {
                // done
            }
        })
    });

}