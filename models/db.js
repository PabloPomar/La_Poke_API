const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pokemon', {useNewUrlParser: true} , (err)=> {
    if(!err) {console.log('Conección a la base de datos de MongoDB lograda. Que empiece la pokemania')}
    else {console.log('Error al conectarse a la base de datos de MongoDB:' + err)}
});

