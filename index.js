const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());
const path = require('path');
const cors = require("cors")

const PORT = process.env.PORT || 80;

app.use(cors());
app.use(express.json())

app.post('/create-file', (req, res) => {
  const timestamp = new Date().getTime();
  const fileName = `${timestamp}.txt`;
  const filePath = path.join("D://creating-file", fileName);
  const fileContent = timestamp.toString();

  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to create the file.');
    } else {
      res.status(200).send('File created successfully.');
    }
  });
});

const folderName = 'D://creating-file';

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
} catch (err) {
  console.error(err);
}



app.get('/list-files', (req, res) => {
    const directoryPath = path.join("D://creating-file");
  
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to retrieve the file list.');
      } else {
        res.status(200).json(files);
      }
    });
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
