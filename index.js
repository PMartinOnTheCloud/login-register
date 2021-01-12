const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');



app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login.ejs', (req, res) => {
  res.render('login');
});

app.get('/register.ejs', (req, res) => {
  res.render('register');
});

app.post('/', (req, res) => {
  let user = req.body.user;
  let pass = req.body.password;
  localStorage.setItem(user,pass);
  res.render('index');
});

app.post('/confirmacion.ejs', (req, res) => {
  let user = req.body.user;
  let pass = req.body.password;
  let confirmacion = 0;
  if (localStorage[user] == pass) {
  	confirmacion = 1;
  }

  res.render('confirmacion', {data: {"confirmacion": confirmacion}});
});



app.listen(4000, () => console.log('Example app listening on port 4000!'));