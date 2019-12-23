const mongoose = require ('mongoose');


var claveSchema = new mongoose.Schema({

    clave : {
        type: String,
    },

});

module.exports = mongoose.model('clave', claveSchema);
