var fs = require('fs');
var extractFirstPage = require('./extractFirstPage.js')
var path = require('path');
const {PDFDocument} = require('pdf-lib') 
const chalk = require('chalk');


setInterval(()=>{
fs.readdir('./notProcessedPDF', (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {

        // get current file name
        const name = path.parse(file).name;
        (
            async function () {
                
                try{
                  let pdfNode = fs.readFileSync(`./notProcessedPDF/${file}`)
                   let pdfDoc = await PDFDocument.load(pdfNode);
                   pdfBytes = await extractFirstPage( pdfDoc ,[1], name)
                  fs.writeFileSync(`./firstPagePDF/${name}.pdf`, pdfBytes)

                  let oldPath =  path.resolve('./notProcessedPDF', file);
                  let newPath =  `./processedPDF/${file}`;

                  fs.rename(oldPath, newPath, function (err) {
                    if (err) console.log(chalk.yellow(`Error moving ${name} to processedPDF folder`))
                    console.log(chalk.white(`Success ${name}`))
                  })
                }catch(e){
                  console.log(chalk.red(`Failed to load. Will move ${name} to the errorPDF folder`))
                  let oldPathFailed =  path.resolve('./notProcessedPDF', file);
                  let newPathFailed =  `./errorPDF/${file}`;

                  fs.rename(oldPathFailed, newPathFailed, function (err) {
                      if (err) console.log(chalk.yellow(`Error moving ${name} to errorPDF folder`))
                    })
                }
            }
        )()
      })
    }
  })

},30000)


