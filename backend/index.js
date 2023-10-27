import express from "express"
import {PORT,mongoDBURL} from "./config.js"
import mongoose from 'mongoose'
import { Book } from "./models/bookModel.js"
const app=express()
app.get("/",(req,res)=>{
    return res.send('ok')
})
app.post('/books',async(req,res)=>{
try {
    if(!req.body.title|| !req.body.author || !req.body.publishYear){
        returnres.status(400)
        .send({message:' require title,author,publish Year'})
    }
    const newBook={
        title: req.body.title,
        author: req.body.author,
        publishYear:req.body.publishYear
    }
    const book= await Book.create(newBook)
    return res.status(201).send(book)
} catch (error) {
    console.log(error.message);
    res.status(500).send({message:error.message})
}
})
mongoose.connect(mongoDBURL)
.then(()=>{
    console.log(`connected to DB`);
    app.listen(PORT, ()=>{
        console.log(`app listen to port :${PORT}`);
    })
})
.catch(err=>console.log(err))
