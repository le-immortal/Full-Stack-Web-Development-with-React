const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Leaders = require('../models/leaders');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get((req,res,next)=>{
    Leaders.find({})
    .then((Leaders)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Leaders);
    },(err)=>{next(err)})
    .catch((err)=>{ next(err)});
})
.post((req,res,next)=>{
    Leaders.create(req.body)
    .then((Leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Leader);
    },(err)=>{next(err)})
    .catch((err)=>{ next(err)});
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('Put operation is not supported');
})
.delete((req,res,next)=>{
    Leaders.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    },(err)=>{next(err)})
    .catch((err)=>{next(err)});
});

leaderRouter.route('/:promoId')
.get((req,res,next)=>{
    Leaders.findById(req.params.promoId)
    .then((Leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Leader); 
    },(err)=> next(err))
    .catch((err)=> next(err));
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation is not supported '+req.params.promoId);
})
.put((req,res,next)=>{
    Leaders.findByIdAndUpdate(req.params.promoId,{
        $set: req.body
    },{new:true})
    .then((Leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Leader); 
    },(err)=> next(err))
    .catch((err)=> next(err));
})
.delete((req,res,next)=>{
    Leaders.findByIdAndRemove(req.params.promoId)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp); 
    },(err)=> next(err))
    .catch((err)=> next(err));
});

module.exports = leaderRouter;
