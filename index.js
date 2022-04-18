const express = require('express');
const http =  require('http');
const app = express();
const server =  http.createServer(app);
const routes = require('./routes/Users');


if (process.env.NODE_ENV !== "production"){
    require('dotenv/config');
}

const { PORT } = process.env;

//motor de plantillas
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(__dirname + "/public"));

app.use(express.json());


routes(app);


server.listen(PORT, ()=>{
    console.log('Hola Mundo, puerto: ', PORT);
});