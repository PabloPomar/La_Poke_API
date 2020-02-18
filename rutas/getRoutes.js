const express = require('express');

const router = express.Router();
const pokemon = require('../models/pokemon.model');
const usuario = require('../models/usuario.model');
const voto = require('../models/voto.model');
const clave = require('../models/clave.model');

router.get('/', (req, res) => {
    res.send('Esto tendria que devolver todos los pokemon')
});



router.get('/lista', (req, res) =>{
    pokemon.find((err, docs)=> {
        if (!err){
            res.status(200);
            res.json(docs);
        }
        else {
            console.log("Error en reclamar la lista de pokemon: " + err);
            res.sendStatus(404);
        }
    });
});



router.get('/especifico', (req, res) =>{
    pokemon.findOne({"id" :"001"}, (err, doc)=>{
        if (!err){
            res.status(200);
            res.send(doc);
        }
    });
});




router.get('/especifico2', (req, res) =>{
    pokemon.find({"name" : /.*A*./ }, (err, doc)=>{
        if (!err){
            res.status(200);
            res.send(doc);
        } else {
            console.log("Error en reclamar pokemon: " + err);
            res.sendStatus(404);
        }
    });
});




router.get('/name/:nameLike', (req, res) =>{
    pokemon.find({"name" : {$regex: ".*" + req.params.nameLike + ".*"}}, (err, doc)=>{
        if (!err){
            if(doc.length === 0) {
                res.sendStatus(204);
            } else {
                res.status(200);
                res.send(doc);
            }

        } else {
            console.log("Error en reclamar pokemon: " + err);
            res.sendStatus(404);
        }
    });
});




router.get('/find/:_id', (req, res) =>{
    pokemon.findOne({"_id" : req.params._id}, (err, doc)=>{
        if (!err){
            res.status(200);
            res.send(doc);
        } else {
            console.log("No se encontro al pokemon: " + err);
            res.sendStatus(404);
        }
    });
});



//-----------------------------------------------Hasta aca era lo de regularidad------------------------------------

router.get('/usuarios', (req, res) =>{
    usuario.find((err, docs)=> {
        if (!err){
            res.status(200);
            res.json(docs);
        }
        else {
            console.log("Error en reclamar la lista de usuarios: " + err);
            res.sendStatus(404);
        }
    });
});



router.get('/votos', (req, res) =>{
    voto.find((err, docs)=> {
        if (!err){
            res.status(200);
            res.json(docs);
        }
        else {
            console.log("Error en reclamar la lista de votos: " + err);
            res.sendStatus(404);
        }
    });
});



router.get('/UserExist/:usuario', async (req, res) =>{
    usuario.findOne({"usuario" : req.params.usuario}, (err, doc)=>{
        if (!err){
            if(doc===null) {
                res.status(200);
                res.send(false);
            } else {
                res.status(200);
                res.send(true);
            }

        } else {
            console.log("Error al determinar tipo de ususario: " + err);
            res.sendStatus(400);
        }
    });
});

router.get('/ConfirmarUser/:usuario/:password', async (req, res) =>{
    usuario.findOne({"usuario" : req.params.usuario , "password" : req.params.password}, (err, doc)=>{
        if (!err){
            if(doc===null) {
                res.status(200);
                res.send(false);
            } else {
                res.status(200);
                res.send(true);
            }
        } else {
            console.log("Error al determinar si el usuario existe: " + err);
            res.sendStatus(400);
        }
    });
});




router.get('/YaPosteo/:id/:usuario', async (req, res) =>{
    pokemon.aggregate([{ $unwind: "$user_Description" }, { $match: { "user_Description.usuario": req.params.usuario , "id": req.params.id } } ], (err, doc)=>{
        if (!err){
            if(doc.length===0) {
                res.status(200);
                res.send(false);
            } else {
                res.status(200);
                res.send(true);
            }
        }  else {
            console.log("Error al determinar si el usuario posteo: " + err);
            res.sendStatus(400);
        }
    });
});



router.get('/UsuarioEspecifico/:usuario', async (req, res) =>{
    usuario.findOne({"usuario" : req.params.usuario}, (err, doc)=>{
        if (!err){
            res.status(200);
            res.send(JSON.stringify(doc.tipo));
        } else {
            console.log("Error al determinar el usuario: " + err);
            res.sendStatus(404);
        }
    });
});



router.get('/YaVoto/:id/:usuario/:idDesc', async (req, res) =>{
    voto.findOne({"id_usuario" : req.params.usuario, "id_pokemon" : req.params.id, "id_descipcion" : req.params.idDesc}, (err, doc)=>{
        if (!err){
            if(doc===null) {
                res.status(200);
                res.send(false);
            } else {
                res.status(200);
                res.send(true);
            }
        }  else {
            console.log("Error al determinar si el usuario ya voto: " + err);
            res.sendStatus(400);
        }
    });
});


router.get('/proxNum/:id', (req, res) =>{
    pokemon.findOne({"id" : req.params.id}, (err, doc)=>{
        if (!err){
            array = doc.user_Description;
            res.status(200);
            res.json(array.length);
        }
        else {
            console.log("Error al determinar el proximo numero: " + err);
            res.sendStatus(400);
        }
    });
});

router.get('/getClave', (req, res) =>{
    clave.findOne({"_id" :"5e01247cf5a31c32c829ffe2"}, (err, doc)=>{
        if (!err){
            res.status(200);
            res.json(doc.clave);
        }
        else {
            console.log("Error al determinar la clave: " + err);
            res.sendStatus(404);
        }
    });
});


module.exports = router;
