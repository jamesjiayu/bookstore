import express from 'express'
import { Book } from '../models/bookModel'
const router=express.Router()
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({})
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

//{"title":"t1", "author":"a1", "publishYear":2000 }
router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400)
                .send({ message: ' require title,author,publish Year' })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook)
        return res.status(201).send(book)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        return res.status(200).json(book)
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400)
                .send({ message: 'require title,author,publish Year' })
        }
        const { id } = req.params
        const result = await Book.findByIdAndUpdate(id, req.body)// body? 
        if (!result) {
            return res.status(404).json({ message: 'not found the book' })
        }
        return res.status(200).json({ message: "update ok" })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const {id}=req.params
        const result=Book.findByIdAndDelete(id)
        if(!result){
            return res.status(404).json({message: "cant find id"})
        }
        return res.status(200).json({message:'deleted successfully'})
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

export default router