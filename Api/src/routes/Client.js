const app = require('express').Router();
const { Client, Invoice, Payment, Product} = require('../db.js');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const { AUTH_SECRET } = process.env;


//SingIn

app.post('/singin', (req, res) => {

    (async function (){

        try {

            const ClientSingIn = await Client.findOne({ where: { DNI: req.body.DNI }})

            if(!ClientSingIn){ res.status(404).send({menssage: "Usuario no existente"})}

            else bcrypt.compare( req.body.Password, ClientSingIn.Password ,  function ( err ,  result )  { 
            
                if(result){
    
                    JWT.sign({IsAdmin: ClientSingIn.IsAdmin, DNI: ClientSingIn.DNI }, AUTH_SECRET, function( error, token ){
    
                        if(error) { res.status(500).send({message: "Hubo un Error"})}
    
                        else{ res.status(200).send( { IsAdmin: ClientSingIn.IsAdmi, token , DNI: ClientSingIn.DNI} );}
    
                    })
                }
                else res.status(404).send({menssage: "Contraseña incorrecta"})
            });

        }
        catch (err){ res.status(404).send({message: "Hubo un Error"}) }

    })()

});


//Get all Invoices for client singin

app.get('/invoices', (req, res) => {

	JWT.verify( req.headers.authorization.split(' ')[1], AUTH_SECRET, function ( error, decoded ){

		error ? res.status(404).send({message: "Hubo un Error"}) :

        (async function (){

            try {
    
                const ClientInvoices = await Invoice.findAll({ where: { clientDNI: decoded.DNI },  include: [Payment, Product] });

                res.status(201).send(ClientInvoices);
    
            }
            catch (err){ res.status(404).send({message: "Hubo un Error"}) }

        })()

	});
	
});


module.exports = app;