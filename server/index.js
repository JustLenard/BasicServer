const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3002
const { Client } = require('pg')
const { moreInvoices, moreRawInvoices } = require('./data.js')
const fs = require('fs')

let multer = require('multer')
let upload = multer({ dest: './' })

const connection = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
})

app.use(cors())
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json(''))

app.get('/api/credits', (req, res) => {
	console.log('This is req', req.headers.authorization)
	console.log('This is req', req.headers.cookie)

	console.log('This is req', req.body)
	res.send({ amount: 200 })
})

app.delete('/api/delete', (req, res) => {
	const toDelete = req.body
	res.send('OK')
	const sqlDelete = `DELETE FROM products WHERE idProduct IN (${toDelete.join()})`
	connection.query(sqlDelete, (err, result) => {
		if (err) console.log(err)
	})
})

app.put('/api/put', (req, res) => {
	console.log(req)

	// res.send('YOu reached the server. Good shit')
	res.status(200).send('f you')
})

app.post('/api/insert', (req, res) => {
	const FrontEndObj = req.params
	res.send('OK')

	const sqlInsert = `INSERT INTO products (sku, name, price, type, size, weight, height, length, width) VALUES ('${FrontEndObj.productSku}', 
	'${FrontEndObj.productName}', ${FrontEndObj.productPrice}, '${FrontEndObj.productType}', ${FrontEndObj.productSize}, ${FrontEndObj.productWeight}, 
	${FrontEndObj.productHeight}, ${FrontEndObj.productLength}, ${FrontEndObj.productWidth});`

	connection.query(
		sqlInsert,

		(err, result) => {
			console.log(err)
		}
	)
})

app.put('/api/CreditManagement/subtractCredits', upload.none(), (req, res) => {
	console.log('what the hell man')
	console.log(req.body)
	res.send('hey')

	// res.send(moreRawInvoices(2))
})

app.get('/api/Invoice', (req, res) => {
	// console.log('This is req', req)
	//
	// console.log('why the fuck those this route works')
	// res.send(moreInvoices(20))
	// console.log('This is message')
	res.send(moreRawInvoices(10))
})

app.post('/api/file', upload.single(['receivedFiles']), (req, res) => {
	console.log(req.body)
	console.log(req.file)
	res.send('OK')
})

app.post('/api/Invoice/export', upload.none(), (req, res) => {
	console.log(req.body)

	// const stream = fs.createReadStream('../assets/connor.png')
	// const stream = fs.createReadStream('assets/connor.png')
	const stream = fs.createReadStream('assets/csv.csv')

	// console.log('This is stream', stream
	// stream.on('data', (data) => {
	// 	var chunk = data.toString()
	// 	console.log(chunk)
	// })

	// res.send('thefuck')
	stream.pipe(res)
})

app.listen(port, () => {
	connection.connect((err) => {
		console.log(process.env.DATABASE_URL)
		console.log(`listening to port ${port}`)
	})
})
