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
  for (let i= 0; i<localStorage.length; i++) {
    lstotoken = localStorage.getItem(localStorage.key(i))
    lstotoken = JSON.parse(lstotoken)
    if (lstotoken['token']) {
      res.render('confirmacion', {"confirmacion": 2 });
    }
  }  
  res.render('login');
})

app.get('/register.ejs', (req, res) => {
  res.render('register');
})

app.post('/', (req, res) => {
  let user = req.body.user;
  let pass = req.body.password;
  let data = {"password": pass };
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
        updatedjson = localStorage.getItem(user);
        updatedjson = JSON.parse(updatedjson);
        let token = require("randomstring");
        updatedjson['token'] = token.generate(10);
        localStorage.setItem(user,JSON.stringify(updatedjson));
  			confirmacion = 1;
  		}
  	}
  }

  res.render('confirmacion', {"confirmacion": confirmacion });
})

app.get('/logout.ejs', (req, res) => {
  for (let i= 0; i<localStorage.length; i++) {
    lstotoken = localStorage.getItem(localStorage.key(i));
    lstotoken = JSON.parse(lstotoken);
    delete lstotoken['token'];
    localStorage.setItem(localStorage.key(i), JSON.stringify(lstotoken));
  }
  res.render('index');
})



app.post("/token", function(req, res){
  
  user = req.headers['user'];
  password = req.headers['password'];

  for (let i= 0; i<localStorage.length; i++) {
  	if (user == localStorage.key(i)) {
  		let data = JSON.parse(localStorage.getItem(user));
      res.send("Password "+data['password']);
      res.send("Password "+password);
  		if (password == data['password']) {
        updatedjson = localStorage.getItem(user);
        updatedjson = JSON.parse(updatedjson);
        let token = require("randomstring");
        updatedjson['token'] = token.generate(10);
        localStorage.setItem(user,JSON.stringify(updatedjson));
        return res.send(updatedjson);
  		}
      return res.send("Contraseña incorrecta");
  	}
  }
  return res.send("Usuario no encontrado");


})

app.listen(4000, () => console.log('Example app listening on port 4000!'));
