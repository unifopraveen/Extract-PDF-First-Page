const {PDFDocument} = require('pdf-lib') 
const fetch = require('node-fetch');
var fs = require('fs');



    async function modifyPdf(pdfUrl, selectedPgsArray, pdf) {
        //make online urls for pdf work
  		// const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer())
        // const pdfDoc = await PDFDocument.load(existingPdfBytes)

        if (!(Array.isArray(selectedPgsArray))){ 
            throw Error("The pages to be selected is to be in the form of an array")
        }
                
        //make local urls for pdf work
        const pdfDoc = await PDFDocument.load(fs.readFileSync(pdfUrl)); 

        //create a new pdf consisting of only the selected pages
        const pdfDocNew = await PDFDocument.create()
         const pages = pdfDoc.getPages()


            if(selectedPgsArray.every((j) => j<1 || j>pages.length )){
                throw Error("!!! Invalid Page Number - Extract pages from PDF")
            }

        //Matching the zero index
        selectedPgsArray = selectedPgsArray.map((v,i)=> {return(v-1}) 

        const selectedPgs = await pdfDocNew.copyPages(pdfDoc, selectedPgsArray) 
        for(let pg of  selectedPgs){
            pdfDocNew.addPage(pg)
        }
        const pdfBytes = await pdfDocNew.save()
        // fs.writeFileSync('one.pdf', pdfBytes)
    }

    modifyPdf('D:/training/pdf1/eee.pdf',{pages:[1,2,3]})
    // modifyPdf('https://pdf-lib.js.org/assets/with_cropbox.pdf',[0,1])