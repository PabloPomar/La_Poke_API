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




//----------------------------------------Hasta aca la regularidad-------------------------------------------------------


router.post('/agregarUserDesc', async (req, res) =>{
    pokemon.findOne({ "id": req.body.id }, async (err, doc) => {
        if (!err) {
            doc.user_Description.push(req.body.user_Description);
            await doc.save().then(
                res.json(doc))
        }
        else {
            console.log("Error al actualizar descripcion de usuario pokemon: " + err);
        }

    });
});


router.get('/agregarUserDescTest', async (req, res) =>{
    desc = new userDescription;
    desc.idDescripcion = 4;
    desc.usuario = "alberto";
    desc.descripcion = "Test pasado";
    desc.likes = 2;
    desc.dislikes = 1;
    pokemon.findOne({ "id": "003" }, async (err, doc) => {
        if (!err) {
            doc.user_Description.push(desc);
            await doc.save().then(
                res.json(doc))
        }
        else {
            console.log("Error al actualizar descripcion de usuario pokemon: " + err);
        }

    });
});

router.post('/agregarUsuario', async (req, res) =>{
    newUser =  new usuario;
    newUser.usuario = req.body.usuario;
    newUser.password = req.body.password;
    newUser.tipo = "usuario";
    newUser.save(function (err) {
        if (err) console.log("Error al agregar usuario: " + err);
        // saved!
    });
    res.json(newUser);
});


router.post('/agregarUsuarioTest', async (req, res) =>{
    newUser =  new usuario;
    newUser.usuario = "Fulano";
    newUser.password = "contraseña";
    newUser.tipo = "usuario";
    newUser.save(function (err) {
        if (err) console.log("Error al agregar usuario: " + err);
        // saved!
    });
    res.json(newUser);
});


router.post('/agregarVoto', async (req, res) =>{
    newVoto =  new voto;
    newVoto.id_pokemon = req.body.id_pokemon;
    newVoto.id_descipcion = req.body.id_descipcion;
    newVoto.id_usuario = req.body.id_usuario;
    newVoto.save(function (err) {
        if (err) console.log("Error al agregar voto: " + err);
        // saved!
    });
    res.json(newVoto);
});


router.post('/agregarVotoTest', async (req, res) =>{
    newVoto =  new voto;
    newVoto.id_pokemon = "001";
    newVoto.id_descipcion = "1";
    newVoto.id_usuario = "nadieImportante";
    newVoto.save(function (err) {
        if (err) console.log("Error al agregar voto: " + err);
        // saved!
    });
    res.json(newVoto);
});


router.get('/BorrarUserDesc', async (req, res) =>{
    pokemon.updateOne({ "id": req.body.id } , { $pull: {"user_Description": { "idDescripcion" : req.body.idDescripcion} } }, async (err, doc) => {
        if (!err) {
            console.log("Borrado");
            res.send(doc);
        }
        else {
            console.log("Error al borrar descripcion: " + err);
        }

    });
});

router.get('/BorrarUserDescTest', async (req, res) =>{
    pokemon.updateOne({ "id": "003" } , { $pull: {"user_Description": { "idDescripcion" : 4} } }, async (err, doc) => {
        if (!err) {
            console.log("Borrado");
            res.send(doc);
        }
        else {
            console.log("Error al borrar descripcion: " + err);
        }

    });
});



module.exports = router;
