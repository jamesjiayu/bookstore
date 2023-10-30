import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from 'mongoose'
import { Book } from "./models/bookModel.js"
import booksRoute from "./routes/booksRoute.js"
import cors from 'cors'
const app = express()
app.use(cors())
// app.use(cors({
//     origin:'http://localhost:3000/', 
//     methods:['GET','PUT','DELETE','POST'],
//     allowedHeaders:['Content-Type']
// }))
app.use(express.json()) // Express 4.16+ has built-in middleware for parsing request bodies. The app is using app.use(express.json()) to parse JSON request bodies.
app.get("/", (req, res) => {
    return res.send('ok')
})
app.use('/books',booksRoute)
mongoose.connect(mongoDBURL)
    .then(() => {
        console.log(`connected to DB`);
        app.listen(PORT, () => {
            console.log(`app listen to port :${PORT}`);
        })
    })
    .catch(err => console.log(err))
