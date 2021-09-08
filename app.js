var fs = require('fs');
var extractFirstPage = require('./extractFirstPage.js')
var path = require('path');
const {PDFDocument} = require('pdf-lib') 


fs.readdir('./notProcessedPDF', (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {

        // get current file name
        const name = path.parse(file).name;
        (
            async function () {
                let pdfDoc = await PDFDocument.load(fs.readFileSync(`./notProcessedPDF/${file}`));
                pdfBytes = await extractFirstPage( pdfDoc ,[1])
                fs.writeFileSync(`./firstPagePDF/${name}.pdf`, pdfBytes)

                let oldPath =  path.resolve('./notProcessedPDF', file);
                let newPath =  `./processedPDF/${file}`;

                fs.rename(oldPath, newPath, function (err) {
                    if (err) throw err
                    console.log('Successfully renamed - AKA moved!')
                  })

            }
        )()
      })
    }
  })

