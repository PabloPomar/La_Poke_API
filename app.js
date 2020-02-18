const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
require('./models/db');

// Middlewares

app.use(cors());
app.use(bodyparser.json());


//Importar Rutas

const getRutas = require('./rutas/getRoutes');
const postRutas = require('./rutas/postRoutes');
const deleteRutas = require('./rutas/deleteRoutes');

app.use('/APIget', getRutas);
app.use('/APIpost', postRutas);
app.use('/APIdelete', deleteRutas);

// Rutas

app.get('/apiInit', (req, res) => {
   res.send('Bienvenido a casa')
});


// Escuchando al servidor

app.listen(3000, () => {
    console.log('Server iniciado en el puerto 3000');
});



