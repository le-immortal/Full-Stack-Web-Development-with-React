const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req, res, next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('Will send all the leader details to you!');
})
.post((req,res,next)=>{
    res.end('Will add the leader ' + req.body.name + 
    'with details: '+ req.body.description);
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('Put operation is not supported');
})
.delete((req,res,next)=>{
    res.end('Deleting all the leader');
});

leaderRouter.route('/:leaderId')
.all((req, res, next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('Will send details of the leader' + req.params.leaderId+' to you');
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation is not supported '+req.params.leaderId);
})
.put((req,res,next)=>{
    res.write('Update the leader'+ req.params.leaderId+'\n');
    res.end('Will update: '+ req.body.name +' with details '+ req.body.description);
})
.delete((req,res,next)=>{
    res.end('Deleting the leader' + req.body.name);
});

module.exports = leaderRouter;
