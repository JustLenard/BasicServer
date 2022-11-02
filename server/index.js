const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3002
const { Client } = require('pg')

let multer = require('multer')
let upload = multer({ dest: './' })

const connection = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
})

const invoice = [
	{
		id: 642,
		invoiceName: 'Dante 199901723081.pdf',
		invoiceNumber: '14399840',
		invoiceDate: '1/1/0001 12:00:00 AM',
		invoiceDueDate: '',
		currency: 'usd',
		value: 554.6,
		invoiceVATRateHeader: '0',
		invoiceTVAValue: 105.38,
		invoiceTotal: 659.98,
		providerComapnyName: 'asdfasdf',
		providerCUI: '1231243asdlf',
		clientComapnyName: 'SC Producton SRL',
		clientCUI: 'RO4528050',
		invoiceLines: [
			{
				Id: 463,
				NrCrt: 1,
				Denumire: '',
				Um: '',
				Cantitatea: 1,
				PretUnitar: 554.6,
				Valoarea: 554.6,
				ValoareaTva: 105.38,
				CotaTvalinii: 0.19,
				InvoiceId: 642,
			},
		],
	},
]

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

app.get('/api/invoices', (req, res) => {
	console.log('This is req', req)
	res.send(invoice)
})

app.post('/api/file', upload.single(['receivedFiles']), (req, res) => {
	// const  = req.params

	// console.log('This is res', JSON.stringify(res, null, 2))
	console.log(req.body)
	console.log(req.files)
	console.log(req.file)

	// console.log(req.params)

	// console.log(req)

	res.send('OK')
})

app.listen(port, () => {
	connection.connect((err) => {
		console.log(process.env.DATABASE_URL)
		console.log(`listening to port ${port}`)
	})
})
