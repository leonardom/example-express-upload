'use strict'

// http://transfer.sh
// enviar arquivos temporariamente (5 dias)

const express = require('express')
const Busboy = require('busboy')
const fs = require('fs')
const request = require('request')

const app = express();

app.get('/', (req, res) => {
	res.send('hello wolrd')
})

app.post('/', (req, res) => {
	let upload = new Busboy({headers: req.headers})
  let files = []
  let counter = 0;

  upload.on('file', (field, stream, name) => {
  	counter++

  	stream.pipe(request.put(`https://transfer.sh/${name}`, (err, response) => {
  		if (err) throw err

  		files.push(response.body.trim())

  		counter--

	  	if (counter === 0) {
	  		res.json(files)  		
	  	}
  		
  	}))
  })

  //liga request no upload (budboy)
  req.pipe(upload)

})

app.listen(8080)