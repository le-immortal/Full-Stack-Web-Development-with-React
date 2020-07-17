const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';

const connect = mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true});

connect.then((db)=>{
    console.log('Connected to the server');

    Dishes.create({
        name: 'Uthapizza',
        description: 'test'
    })
    .then((dish)=>{
        console.log(dish);
        return Dishes.findByIdAndUpdate(dish._id, {
            $set:{
                description: "Updated test"
            }
            },{
                new:true
            }).exec();
    })
    .then((dish)=>{
        console.log(dish);

        dish.comments.push({
            rating:5,
            comment: 'Good one',
            author:'Kuch Bhi'
        });
        return dish.save();
    })
    .then((dish)=>{
        console.log(dish);
        
        
        return Dishes.deleteMany({});
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch((err)=>{
        console.log(err);
        
    })
    
});