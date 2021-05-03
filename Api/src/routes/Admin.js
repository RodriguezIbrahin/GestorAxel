const app = require('express').Router();
const { Client, Invoice, Product, Payment} = require('../db.js');
const bcrypt = require('bcrypt');

//SingUp

app.post('/singup', (req, res) => {
    
    bcrypt.hash( req.body.DNI , 10 , function( err ,  hash )  { 

        if(err){ res.status(404).send(err) }

        else (async function (){

            try {

                const NewClient = await Client.create({ ...req.body, Password: hash});

                res.status(200).send(NewClient);
    
            }
            catch (err){ res.status(404).send({message: "Hubo un Error"}) }

        })()

    });

});

//Create Ivoices

app.post('/invoices', (req, res) => {

    (async function (){

        try {
                
            const NewInvoices = await Invoice.create(req.body);

                
            const NewProducts = await Promise.all( req.body.Products.map( async product => { 

                return NewProduct = await Product.create({...product, invoiceNumber: req.body.Number});

            }))

            res.status(201).send({Invoices: NewInvoices, Products: NewProducts});
    
        }
        catch (err){ res.status(404).send({message: "Hubo un Error"}) }

    })()
	
});


//Create Payment

app.post('/payments', (req, res) => {

    (async function (){

        try {
            
            const ClientInvoice= await Invoice.findOne({ where: { Number: req.body.invoiceNumber } });

            if( ClientInvoice.Total <= ClientInvoice.Balance || ClientInvoice.Status === "Paid" ){ res.status(201).send({message: "Factura Pagada"}) }

            if( ClientInvoice.Total < parseInt(ClientInvoice.Balance) + parseInt(req.body.Amount)){ res.status(201).send({message: `El pago excede el total, se requiere ${ClientInvoice.Total - ClientInvoice.Balance}`}) }

            else {

                const NewPayment = await Payment.create(req.body);

                if(parseInt(ClientInvoice.Total) === parseInt(ClientInvoice.Balance) + parseInt(req.body.Amount)) {

                    const UpdateInvoice = await Invoice.update({Balance: parseInt(ClientInvoice.Balance) + parseInt(req.body.Amount), Status: "Paid"},{ where: { Number: req.body.invoiceNumber }} )
                }

                else { 
                    const UpdateInvoice = await Invoice.update({Balance: parseInt(ClientInvoice.Balance) + parseInt(req.body.Amount)},{ where: { Number: req.body.invoiceNumber }} )
                }

                res.status(201).send(NewPayment);
            }
    
        }
        catch (err){ res.status(404).send({message: "Hubo un Error"}) }

    })()
	
});

//Get one Invoice for Number

app.get('/invoices:Number', (req, res) => {

    (async function (){

        try {
    
            const InvoiceForNumber = await Invoice.findOne({ where: { Number: req.params.Number },  include: [Payment, Product] });

            res.status(201).send(InvoiceForNumber);
    
        }
        catch (err){ res.status(404).send({message: "Hubo un Error"}) }

    })()

});



module.exports = app;