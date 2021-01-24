# MappingCreator
Using this script, all the mapping folders can be created from the command line<br>
## Steps to use the script:
### 1. Clone this repository and install dependencies
```
git clone https://github.com/ddutta98/MappingCreator.git
npm i
```
### 2. Set up Google Sheets API <br>
* Go to http://www.console.developers.google.com, set up a new project and select that project<br>
* Go to **Enable APIs and Services** and add the **Google Sheets API**<br>
* On the **API Overview** page, click on **Create Credentials**<br>
* Choose **Google Sheets API**, **Web Server as API** source and **Application Data**<br>
* Click on **'What Credentials Do I Need'**<br>
* Give a name for the service account and email (this email will be required for accessing google sheets)<br>
* For **Role**, choose **Project/Editor**(or Viewer)<br>
* Save the JSON file which has all the credentials<br>
(If the project is used locally, save the file in root dir of the project, name it **keys.json**<br>
If it is used on server, copy the **client email** and **private key** and set them as config variables, then use that value in index.js<br>
e.g for Local:
```
const keys = require('./keys.json');
const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);
```
### 3. Share Google Sheet with Service Mail
* Go to the Google Sheet and share it with the email generated (**service_acc_name@app_name.iam.gserviceaccount.com**) in step 1 (saved as **client_email** in credentials json file)

### 4 . Add Spreadsheet ID and Sheet Name to index.js
* Copy the spreadsheet id(*docs.google.com/spreadsheets/d/**1kNKMVPlnVFX6ATDrJSeFLJqG8vJkz5tYH5MwWyVKwoc**/edit#gid=0*) and sheet name (**Sheet1, Sheet2, Mexico1**,etc)
* (Until the process is generalized), paste the id for **spreadsheetId** and sheet name for **range** 
```
async function getRowDetails(cl, rowNo) {
    const gsapi = google.sheets({ version: 'v4', auth: cl });
    const opt = {
        spreadsheetId: '1kNKMVPlnVFX6ATDrJSeFLJqG8vJkz5tYH5MwWyVKwoc',
        range: 'Sheet1'
    };
```

### 5. Add Your Email
* Got to *source_code_templates/datasource.js* and add your email at:
```
 mappedBy: '',
 
```
### 6. Running the script
* Go to the Google sheet, and choose the **row number** for which you want to create the mapping <br>
You can specify the folder name as an argument, or leave it, whereby the **name** column from the Google Sheet will be used as the folder name<br>
*Note: Try ro specify a folder name for sources which have many rows with identical names e.g Mexico)*
* Run the script
```
npm index.js 100 civil-tenders-mexico
or
npm index.js 100
```
