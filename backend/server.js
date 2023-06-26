const express = require('express')
const routes = require('./routes/routes');
const cors = require('cors')

const app = express()
// conexão ao banco de dados
const conn = require('./db/conn')

// chamada dos models
// const User = require('./models/User');

const Product = require('./models/Product');

const Supplier = require('./models/Supplier');

const Unit = require('./models/Unit');

const Category = require('./models/Category');



// Config JSON response
app.use(express.json())

// Solve CORS
// app.use(cors({ credentials: true, origin: 'http://localhost:8000' }))
app.use(cors())

// Public folder for images
app.use(express.static('public'))

// chamada da rota
app.use(routes);

// start app
conn
.sync()
.then( ()=>{
    app.listen(3000, ()=>{
        console.log('App rodando')
    })
})
.catch( (err) => console.log(err))




