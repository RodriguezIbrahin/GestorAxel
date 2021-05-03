const app = require('express').Router();
const { Score } = require('../db.js');


app.get('/', (req, res) => {

	(async function (){

		try {

			const Nicks = await Score.findAndCountAll({ order: [['score', 'DESC']],offset: 0, limit: 3});
			
			res.status(200).send(Nicks);

		}
		catch (err){

			res.status(404).send(err)	

		}
	})()

});

app.post('/', (req, res) => {

	(async function (){

		try {

			const Nicks = await Score.create(req.body);
			
			res.status(200).send(Nicks);

		}
		catch (err){

			res.status(404).send(err)	

		}
	})()

});

app.get('/all', (req, res) => {

	(async function (){

		try {

			const Nicks = await Score.findAll();
			
			res.status(200).send(Nicks);

		}
		catch (err){

			res.status(404).send(err)	

		}
	})()

});


module.exports = app;