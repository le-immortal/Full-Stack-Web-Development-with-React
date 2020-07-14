const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req, res, next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('Will send all the promotion details to you!');
})
.post((req,res,next)=>{
    res.end('Will add the promotion ' + req.body.name + 
    'with details: '+ req.body.description);
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('Put operation is not supported');
})
.delete((req,res,next)=>{
    res.end('Deleting all the promotions');
});

promoRouter.route('/:promoId')
.all((req, res, next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('Will send details of the promotion' + req.params.promoId+' to you');
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation is not supported '+req.params.promoId);
})
.put((req,res,next)=>{
    res.write('Update the promotion'+ req.params.promoId+'\n');
    res.end('Will update: '+ req.body.name +' with details '+ req.body.description);
})
.delete((req,res,next)=>{
    res.end('Deleting the promotion' + req.body.name);
});

module.exports = promoRouter;
