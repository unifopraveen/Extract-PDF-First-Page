var fs = require('fs');
var extractFirstPage = require('./extractFirstPage.js')
var path = require('path');
const {PDFDocument} = require('pdf-lib') 


fs.readdir('./asas', (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {

        // get current file name
        const name = path.parse(file).name;
        (
            async function () {
                let pdfDoc = await PDFDocument.load(fs.readFileSync(`./asas/${file}`));
                pdfBytes = await extractFirstPage( pdfDoc ,[1])
                fs.writeFileSync(`./firstPagePDF/${name}.pdf`, pdfBytes)
            }
        )()
      })
    }
  })


//------------------------------------------------------------------------------------------------------------------


// fs.readdir('./asas', (err, files) => {
//     if (err)
//       console.log(err);
//     else {
//       console.log("\nCurrent directory filenames:");
//       files.forEach(file => {

//         // get current file name
//         const name = path.parse(file).name;
//         // get current file path
//         const filepath = path.resolve('./notProcessedPDF', file);

        

         
         
//                 //make local urls for pdf work
//                 let pdfDoc = await PDFDocument.load(fs.readFileSync(filepath));

//                 //make online urls for pdf work
//   		        // const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer())
//                 // const pdfDoc = await PDFDocument.load(existingPdfBytes)

//                 pdfBytes = extractFirstPage( pdfDoc ,[1])
//                 fs.writeFileSync(`./firstPagePDF/${name}.pdf`, pdfBytes)
             
          

         

//       })
//     }
//   })