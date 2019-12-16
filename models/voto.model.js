const mongoose = require ('mongoose');

var votoSchema = new mongoose.Schema({

    id: {
        type: String,
    },

    id_pokemon: {
        type: String,

    },

    id_usuario: {
        type:String,
    },

    id_descipcion: {
        type: String,
    },


});

module.exports = mongoose.model('voto', votoSchema);
