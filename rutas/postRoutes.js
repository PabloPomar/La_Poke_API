const express = require('express');

const router = express.Router();
const pokemon = require('../models/pokemon.model');


router.post('/updateDescription', async (req, res) =>{
    pokemon.findOne({ _id: req.body._id }, async (err, doc) => {
        if (!err) {
            doc.description = req.body.description;
            await doc.save().then(
                res.json(doc))
        }
        else {
            console.log("Error al actualizar descripcion de pokemon: " + err);
        }

    });
});


router.post('/updateDescription2', async (req, res) =>{
    pokemon.findOne({ "id": req.body.id }, async (err, doc) => {
        if (!err) {
            doc.description = req.body.description;
            await doc.save().then(
                res.json(doc))
        }
        else {
            console.log("Error al actualizar descripcion de pokemon: " + err);
        }

    });
});

router.post('/updateTest2', async (req, res) =>{
    const doc = await pokemon.findOne({"id" :"001"});
    doc.description = 'testeando';
    await doc.save().then(res.json(doc));
});


module.exports = router;
