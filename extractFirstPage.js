const {PDFDocument} = require('pdf-lib') 
const fetch = require('node-fetch');
var fs = require('fs');



    async function extractFirstPage(pdfDoc, selectedPgsArray, pdfName) {

        if (!(Array.isArray(selectedPgsArray))){ 
            throw Error("The pages to be selected is to be in the form of an array")
        }    

        //create a new pdf consisting of only the selected pages
        const pdfDocNew = await PDFDocument.create()
        const pages = pdfDoc.getPages()

        if(selectedPgsArray.every((j) => j<1 || j>pages.length )){
            throw Error("!!! Invalid Page Number - Extract pages from PDF")
        }

        //Matching the zero index
        selectedPgsArray = selectedPgsArray.map((v,i)=> {return(v-1) })

        const selectedPgs = await pdfDocNew.copyPages(pdfDoc, selectedPgsArray) 
        for(let pg of  selectedPgs){
            pdfDocNew.addPage(pg)
        }
        const pdfBytes = await pdfDocNew.save()
        return pdfBytes
    }

    
    module.exports = extractFirstPage


