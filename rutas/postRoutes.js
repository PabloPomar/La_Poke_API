const express = require('express');

const router = express.Router();
const pokemon = require('../models/pokemon.model');
const usuario = require('../models/usuario.model');
const voto = require('../models/voto.model');
const userDescription = require('../models/userDescription.model');
//var ObjectID = require('mongodb').ObjectID;

router.get('/', (req, res) => {
    res.send('Post Funcionando');
});

router.post('/updateDescription', async (req, res) =>{
    pokemon.findOne({ _id: req.body._id }, async (err, doc) => {
        if (!err) {
            res.status(200);
            doc.description = req.body.description;
            await doc.save().then(
                res.json(doc))
        }
        else {
            console.log("Error al actualizar descripcion de pokemon: " + err);
            res.sendStatus(404);
        }

    });
});


router.post('/updateDescription2', async (req, res) =>{
    pokemon.findOne({ "id": req.body.id }, async (err, doc) => {
        if (!err) {
            res.status(200);
            doc.description = req.body.description;
            await doc.save().then(
                res.json(doc))
        }
        else {
            console.log("Error al actualizar descripcion de pokemon: " + err);
            res.sendStatus(404);
        }

    });
});

router.post('/updateTest2', async (req, res) =>{
    const doc = await pokemon.findOne({"id" :"001"});
    doc.description = 'testeando';
    await doc.save().then(res.json(doc));
});




//----------------------------------------Hasta aca la regularidad-------------------------------------------------------


router.post('/agregarUserDesc', async (req, res) =>{
    desc = new userDescription;
    desc.idDescripcion = req.body.idDescripcion;
    desc.usuario = req.body.usuario;
    desc.descripcion = req.body.descripcion;
    desc.likes = 0;
    desc.fecha = new Date();
    desc.dislike = 0;
    pokemon.findOne({ "id": req.body.idPokemon }, async (err, doc) => {
        if (!err) {
            res.status(201);
            doc.user_Description.push(desc);
            await doc.save().then(
                res.json(doc))
        }
        else {
            console.log("Error al actualizar descripcion de usuario pokemon: " + err);
            res.sendStatus(404);
        }

    });
});



router.post('/agregarUsuario', async (req, res) =>{
    newUser =  new usuario;
    newUser.usuario = req.body.usuario;
    newUser.password = req.body.password;
    newUser.tipo = "usuario";
    newUser.save(function (err) {
        if (err) {
            res.sendStatus(400);
            console.log("Error al agregar usuario: " + err);
        } else {
            res.status(200);
        }
        // saved!
    });
    res.json(newUser);
});


router.post('/agregarVoto', async (req, res) =>{
    newVoto =  new voto;
    newVoto.id_pokemon = req.body.idpokemon;
    newVoto.id_descipcion = req.body.iddescipcion;
    newVoto.id_usuario = req.body.idusuario;
    newVoto.save(function (err) {
        if (err){
            res.sendStatus(400);
            console.log("Error al agregar voto: " + err);
        } else {
            res.status(201);
        }
        // saved!
    });
    res.json(newVoto);
});


router.get('/aumentarLike/:id/:idDesc', async (req, res) =>{
    pokemon.updateOne( {id: req.params.id, "user_Description.idDescripcion": parseInt(req.params.idDesc)} , {$inc:{"user_Description.$.likes":1}} , (err)=>{
        if (!err){
            res.status(200);
        } else {
            res.sendStatus(404);
            console.log("Error al aumentar likes: " + err);
        }
    });
});

router.get('/aumentarDislike/:id/:idDesc', async (req, res) =>{
    pokemon.updateOne( {id: req.params.id, "user_Description.idDescripcion":  parseInt(req.params.idDesc)} , {$inc:{"user_Description.$.dislike":1}} , (err)=>{
        if (!err){
            res.status(200);
        } else {
            res.sendStatus(404);
            console.log("Error al aumentar dislikes: " + err);
        }
    });
});


module.exports = router;
