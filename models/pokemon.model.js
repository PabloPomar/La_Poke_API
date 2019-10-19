const mongoose = require ('mongoose');

var pokemonSchema = new mongoose.Schema({

    id: {
      type: String
    },

    name: {
        type: String,

    },

    img : {
        type:String,
    },

    type : {
       type: Array,
    },

    description : {
        type: String,
    },


});

module.exports = mongoose.model('pokemon', pokemonSchema);
