const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3002
const { Client } = require('pg')

const connection = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
})

console.log('f')
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/get', (req, res) => {
	const sqlSelect = `SELECT * FROM products;`
	connection.query(sqlSelect, (err, result) => {
		res.send(result)
	})
})

app.delete('/api/delete', (req, res) => {
	const toDelete = req.body
	res.send('OK')
	const sqlDelete = `DELETE FROM products WHERE idProduct IN (${toDelete.join()})`
	connection.query(sqlDelete, (err, result) => {
		if (err) console.log(err)
	})
})

app.post('/api/insert', (req, res) => {
	const FrontEndObj = req.body
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

app.listen(port, () => {
	connection.connect((err) => {
		console.log(process.env.DATABASE_URL)
		console.log(`listening to port ${port}`)
	})
})
