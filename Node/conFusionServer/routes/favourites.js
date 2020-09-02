const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');
const Fav = require('../models/favourite');

const favouriteRouter = express.Router();

favouriteRouter.use(bodyParser.json());

favouriteRouter.route('/')
.options(cors.corsWithOptions, (req,res)=>{res.sendStatus(200)})
.get(cors.corsWithOptions,authenticate.verifyUser, (req, res, next)=>{
    Fav.findOne({user: req.user._id})
    .populate('user')
    .populate('dishes')
    .then((favourites)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favourites);
    }, (err) => {
        console.log('Then Error');
        
        next(err)})
    .catch((err) => {
        console.log('Catch Error');
        
        next(err)});
})
.post(cors.cors, authenticate.verifyUser, (req, res, next)=>{
    Fav.findOne({user: req.user._id})
    .then((favourite)=>{       
        if(favourite){
            for(var i=0; i< req.body.length; i++){
                if(favourite.dishes.indexOf(req.body[i]._id) === -1){
                    favourite.dishes.push(req.body[i]._id);          
                }
            }
            favourite.save()
            .then((favourite)=>{
                Fav.findById(favourite._id)
                .populate('user')
                .populate('dishes')
                .then((favourites) => {
                    console.log('Favourite Created ', favourite);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favourite);
                })
            }, (err) => next(err)); 
        }
        else {
            Fav.create({'user': req.user._id, "dishes": req.body})
            .then((favourite)=>{
                console.log('favourite Created ', favourite);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favourite);
            }, (err) => next(err));
        }
    },(err)=>{next(err)})
    .catch((err)=> {
        console.log('Not here');
        
        next(err)});
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next)=>{
    console.log("Hi");
    
    Fav.findOneAndRemove({"user": req.user._id})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => {
        console.log("could not find");
        
        next(err)});
});

favouriteRouter.route('/:dishId')
.options(cors.corsWithOptions, (req,res)=>{res.sendStatus(200)})
.get(cors.corsWithOptions,authenticate.verifyUser, (req, res, next)=>{
    Fav.findOne({user: req.user._id})
    .then((favourites) => {
        if(!favourites){
            res.statusCode= 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json({"exists": false, "favourites": favourites});

        }
        else{
            if(favourites.dish.indexOf(req.params.dishId) < 0){
                res.statusCode= 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json({"exists": false, "favourites": favourites});
            }
            else{
                res.statusCode= 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json({"exists": true, "favourites": favourites});
            }
        }
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next)=>{
    Fav.findOne({user: req.user._id})
    .then((favourite)=>{
        if(favourite){
            if(favourite.dishes.indexOf(req.params.dishId) === -1){
                favourite.dishes.push(req.params.dishId)
                favourite.save()
                Fav.findById(favourite._id)
                .populate('user')
                .populate('dishes')
                .then((favourites) => {
                    console.log('Favourite Created ', favourite);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favourite);
                }, (err) => next(err))
            }
        }
        else{
            Fav.create({'user': req.user._id, "dishes":req.params.dishId})
            .then((favourite) => {
                console.log('favourite Created ', favourite);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favourite);
            }, (err) => next(err))
        }
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favourites/'+ req.params.dishId);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Fav.findOne({user: req.user._id})
    .then((favourite) => {
        if (favourite) {            
            index = favourite.dishes.indexOf(req.params.dishId);
            if (index >= 0) {
                favourite.dishes.splice(index, 1);
                favourite.save()
                .then((favourite) => {
                    Fav.findById(favourite._id)
                    .populate('user')
                    .populate('dishes')
                    .then((favourite) => {
                        console.log('favourite Deleted ', favourite);
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favourite);    
                    })
                }, (err) => next(err));
            }
            else {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                err.status = 404;
                return next(err);
            }
        }
        else {
            err = new Error('favourites not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = favouriteRouter;