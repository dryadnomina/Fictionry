const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const port = 8000
const {addUser, getUser} =require('./handlers')
express()

    .use(express.json())
    .use(helmet())
    .use(morgan('tiny'))

    .get('/hello', (req, res) => {
        res.status(200).json({status:200, message:'hi!'})
    })

    .post('/add-user',addUser)
    .get('/get-user',getUser)

    .listen(port, () => {
    console.log(`Listening on port ${port}`)
    });