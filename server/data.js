const invoice = {
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
}

const rawInvoiceLine = [
	{
		NrCrt: 'string',
		Denumire: 'string',
		Um: 'string',
		Cantitatea: 'string',
		PretUnitar: 'string',
		Valoarea: 'string',
		ValoareaTva: 'string',
		CotaTvalinii: 'string',
	},
]

const rawInvoice = {
	CurrencyCode: 'string',
	Company: 'string',
	AncoraTotal: 'string',
	Client: 'string',
	Cuiclient: 'string',
	Cuifurnizor: 'string',
	DataDocument: 'string',
	DataScadenta: 'string',
	Furnizor: 'string',
	NumarDocument: '1',
	TotalDocument: '1',
	ValoareDocument: '1',
	ValoareTvadocument: '1',
	VatrateHeader: '1',
	DenumireDocument: 'string',

	StatusInvoice: 'Processed',

	InvoiceLines: rawInvoiceLine,
}

const moreInvoices = (amount) => {
	const arr = []
	for (let i = 0; i < amount; i++) {
		const newInv = {
			...invoice,
			id: i,
			invoiceName: i,
			invoiceLines: invoice.invoiceLines.map((invoice) => {
				return { ...invoice }
			}),
		}
		arr.push(newInv)
	}
	return arr
}

const moreRawInvoices = (amount) => {
	const arr = []
	for (let i = 0; i < amount; i++) {
		const newInv = {
			...rawInvoice,
			Id: i,
			DenumireDocument: i,
			InvoiceLines: rawInvoice.InvoiceLines.map((rawInvoice) => {
				return { ...rawInvoice }
			}),
		}
		arr.push(newInv)
	}
	return arr
}

module.exports = { invoice, moreInvoices, moreRawInvoices }
