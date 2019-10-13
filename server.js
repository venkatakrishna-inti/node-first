const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended : true }))

app.use(bodyParser.json());

const dbconfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.connect(dbconfig.url, {
	useNewUrlParser : true,
	useUnifiedTopology : true
})
.then((res) => {
	console.log("successfully connected to databse");
})
.catch((err) => {
	console.log("error whole connecting databse",err);
	process.exit();
});


app.get('/', (req, res) => {
	res.json({
		"message" : "wellcome to node" 
	})
});

require('./app/routes/note.routes')(app);

app.listen(3000, () => {
	console.log("node server liste on 3000 port");
})