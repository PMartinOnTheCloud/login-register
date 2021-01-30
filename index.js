const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');



app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/login.ejs', (req, res) => {
  res.render('login');
})

app.get('/register.ejs', (req, res) => {
  res.render('register');
})

app.post('/', (req, res) => {
  let user = req.body.user;
  let pass = req.body.password;
  let data = {"password": pass, "token": ""};
  localStorage.setItem(user,JSON.stringify(data));
  res.render('index');
})

app.post('/confirmacion.ejs', (req, res) => {
  let user = req.body.user;
  let pass = req.body.password;
  let confirmacion = 0;

  for (let i= 0; i<localStorage.length; i++) {
  	if (user == localStorage.key(i)) {
  		let data = JSON.parse(localStorage.getItem(user));
  		if (pass == data['password']) {
  			confirmacion = 1;
  		}
  	}
  }

  res.render('confirmacion', {"confirmacion": confirmacion });
})

app.listen(4000, () => console.log('Example app listening on port 4000!'));
