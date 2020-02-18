const express = require('express');
const router = express.Router();
const pokemon = require('../models/pokemon.model');
const usuario = require('../models/usuario.model');
const voto = require('../models/voto.model');
const userDescription = require('../models/userDescription.model');


/* El borrado de descripciones intente hecerlo con delete pero por algun motivo no pude hacerlo con router.delete
* Intente durante 5 horas hace rque funcionara con delete pero al final lo deje con post por que de todos modos estas
* actualizando un documento, no borrandolo */

router.post('/BorrarUserDesc', async (req, res) =>{
    pokemon.updateOne({ "id": req.body.idPokemon } , { $pull: {"user_Description": { "idDescripcion" : req.body.idDescripcion} } }, async (err, doc) => {
        if (!err) {
            res.status(200);
            console.log("Borrado");
            res.send(doc);
        }
        else {
            res.sendStatus(404);
            console.log("Error al borrar descripcion: " + err);
        }

    });
});




router.delete('/BorrarVotos' + '/:idPokemon' + '/:idDescripcion' , async (req, res) =>{
    voto.deleteMany({"id_pokemon": req.params.idPokemon , "id_descipcion" :  req.params.idDescripcion}, async (err, doc) => {
        if (!err) {
            res.status(200);
            console.log("Votos Borrados");
        }
        else {
            res.sendStatus(404);
            console.log("Error al borrar descripcion: " + err);
        }

    })
});


module.exports = router;
