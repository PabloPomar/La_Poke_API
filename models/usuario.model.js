const mongoose = require ('mongoose');

var usuarioSchema = new mongoose.Schema({

    id: {
        type: String,
    },

    usuario: {
        type: String,

    },

    password: {
        type:String,
    },

    tipo: {
        type: String,
    },


});

module.exports = mongoose.model('usuario', usuarioSchema);
