const express = require('express');
const app = express();
var path = require('path');
var bodyParser = require('body-parser');
var download = require('download-pdf');

var count = 0;
 
var listOfPdf = [];
function getPdf() {
	listOfPdf.forEach((url)=> {
		//count++;
		//get options
		var options = {
    		directory: "./pdf/",
    		filename: getName(url)
		}
		pdf2 = `${url}`.toString();
		//download pdf
		download(pdf2, options, function(err){
    		if (err) throw err
    		console.log("pdf has been downloaded...")
		})
	});
}

function ready(link) {
	return listOfPdf.push(link);
}
//https://s3-us-west-2.amazonaws.com/display-templates/PDF/10ft_EZ_Pillar.pdf
function getName(url) {
	return url.split('/').pop();
}


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/pdf', (req, res) => {
  console.log(req.body.pdf)
  ready(req.body.pdf);
  
  getPdf();
  //res.send(`PDF is:${req.body.pdf}`); if you want to show on page html
});


 
app.listen(4000)