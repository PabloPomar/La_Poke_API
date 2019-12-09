const express = require('express');

const router = express.Router();
const pokemon = require('../models/pokemon.model');
const usuario = require('../models/usuario.model');
const voto = require('../models/voto.model');

router.get('/', (req, res) => {
    res.send('Esto tendria que devolver todos los pokemon')
});


router.get('/lista', (req, res) =>{
    pokemon.find((err, docs)=> {
        if (!err){
            res.json(docs);
        }
        else {
            console.log("Error en reclamar la lista de pokemon: " + err);
        }
    });
});

router.get('/usuarios', (req, res) =>{
    usuario.find((err, docs)=> {
        if (!err){
            res.json(docs);
        }
        else {
            console.log("Error en reclamar la lista de usuarios: " + err);
        }
    });
});

router.get('/votos', (req, res) =>{
    voto.find((err, docs)=> {
        if (!err){
            res.json(docs);
        }
        else {
            console.log("Error en reclamar la lista de usuarios: " + err);
        }
    });
});


router.get('/especifico', (req, res) =>{
    pokemon.findOne({"id" :"001"}, (err, doc)=>{
        if (!err){
            res.send(doc);
        }
    });
});

router.get('/especifico2', (req, res) =>{
    pokemon.find({"name" : /.*A*./ }, (err, doc)=>{
        if (!err){
            res.send(doc);
        }
    });
});

router.get('/:postDesc', (req, res) =>{
    pokemon.findOne({"id" : req.params.postDesc}, (err, doc)=>{
        if (!err){
            res.send(doc);
        }
    });
});



router.get('/name/:nameLike', (req, res) =>{
    pokemon.find({"name" : {$regex: ".*" + req.params.nameLike + ".*"}}, (err, doc)=>{
        if (!err){
            res.send(doc);
        }
    });
});




router.get('/find/:_id', (req, res) =>{
    pokemon.findOne({"_id" : req.params._id}, (err, doc)=>{
        if (!err){
            res.send(doc);
        }
    });
});


router.get('/updateTest', async (req, res) =>{
    pokemon.findOne({"id" :"001"}, async (err, doc) => {
        if (!err) {
            doc.description = 'Testeando mas';
            await doc.save().then(
                res.json(doc)
            );

        }
    });
});

router.get('/updateTest2', async (req, res) =>{
    const doc = await pokemon.findOne({"id" :"001"});
    doc.description = 'testeando';
    await doc.save().then(res.json(doc));
});


module.exports = router;
