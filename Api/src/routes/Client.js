const app = require('express').Router();
const { Client, Invoice } = require('../db.js');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const { AUTH_SECRET } = process.env;



//SingUp

app.post('/singup', (req, res) => {
    
    bcrypt.hash( req.body.DNI , 10 , function( err ,  hash )  { 

        if(err){ res.status(404).send(err) }

        else (async function (){

            try {

                const NewClient = await Client.create({ ...req.body, Password: hash});

                res.status(200).send(NewClient);
    
            }
            catch (err){ res.status(404).send(err) }

        })()

    });

});


//SingIn

app.post('/singin', (req, res) => {

    (async function (){

        try {

            const ClientSingIn = await Client.findOne({ where: { DNI: req.body.DNI }})

            if(!ClientSingIn){ res.status(404).send({menssage: "Usuario no existente"})}

            else bcrypt.compare( req.body.Password, ClientSingIn.Password ,  function ( err ,  result )  { 
            
                if(result){
    
                    JWT.sign({IsAdmin: ClientSingIn.IsAdmin, DNI: ClientSingIn.DNI }, AUTH_SECRET, function( error, token ){
    
                        if(error) { res.status(500).send( { error } );}
    
                        else{ res.status(200).send( { IsAdmin: ClientSingIn.IsAdmi, token , DNI: ClientSingIn.DNI} );}
    
                    })
                }
                else res.status(404).send({menssage: "Contraseña incorrecta"})
            });

        }
        catch (err){ res.status(404).send(err) }

    })()

});


//Get all Invoices for client singin

app.get('/', (req, res) => {

	let token = req.headers.authorization.split(' ')[1];

	JWT.verify( token, AUTH_SECRET, function ( error, decoded ){

		error ? res.status(404).send( { message: error} ) :

        (async function (){

            try {
    
                const ClientInvoices = await Invoice.findAll({ where: { clientDNI: decoded.DNI } });

                res.status(201).send(ClientInvoices);
    
            }
            catch (err){ res.status(404).send(err) }

        })()

	});
	
});


module.exports = app;