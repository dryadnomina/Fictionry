const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const port = 8000
// const {getAllBooks} =require('./handlers')
express()

    .use(express.json())
    .use(helmet())
    .use(morgan('tiny'))

    .get('/hello', (req, res) => {
        res.status(200).json({status:200, message:'hi!'})
    })

    // .get('/all-books',getAllBooks)


    .listen(port, () => {
    console.log(`Listening on port ${port}`)
    });