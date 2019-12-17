const mongoose = require ('mongoose');

var userDescriptionSchema = new mongoose.Schema({

    idDescripcion: {
        type: Number
    },

    usuario: {
        type: String,

    },

    descripcion: {
        type:String,
    },

    likes: {
        type: Number,
    },
    fecha: {
        type: Date,
    },
    dislikes: {
        type: Number,
    },


});



module.exports = mongoose.model('user_description', userDescriptionSchema);
