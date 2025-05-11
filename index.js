const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const user = require('./models/user');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/crudd',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log('connected...',))
.catch(err => console.log('not connected...',err));

app.post('/user',async(req, res)=>{
    try{
        const user = new User(req.body());
        await user.save();
        res.status(201).send(user);
    }catch(err){
        res.status(400).send(err);
    }
});

app.get('/user',async(req, res)=>{
    try{
        const user = await user.find();
        res.status(201).send(user);
    }catch(err){
        res.status(500).send(err);
    }
});

app.put('/user/:id',async(req, res)=>{
    try{
        const user = await user.findByIdAndUpdate(req.params.id, req.body,{new:true});
        res.status(200).send(user);
    }catch(err){
        res.status(500).send(err);
    }
});

app.delete('/user/:id',async(req, res)=>{
    try{
        const user = await user.findByIdAndDelete(req.params.id);
        res.status(200).send(user);
    }catch(err){
        res.status(500).send(err);
    }
});

const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
});


