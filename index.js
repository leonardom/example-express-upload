'use strict'

//use strict habilita algumas coisas (checagens no codigo)

const express = require('express')
const multer = require('multer')
const fs = require('fs')

const upload = multer({ dest : 'uploads/'})

const app = express();

app.get('/', (req, res) => {
res.send('hello wolrd')
})

app.post('/', upload.single('file'), (req, res) => {
	// req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
	
	let guardar = Math.random() <= 0.5

	if (guardar) {
		res.json(req.file);
	} else {
		fs.unlink('./uploads/${req.file.filename}', (err) => {
			if (err) throw err

			res.json({deleted : true})
		})
	}
})

app.post('/photos/upload', upload.array('photos', 12), (req, res) => {
	// req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
	res.end('Thanks for uploading')
})

app.listen(8080)




