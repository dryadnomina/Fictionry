const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const port = 8000
const {addUser, getUser, updateUser} =require('./handlers')
express()

    .use(express.json())
    .use(helmet())
    .use(morgan('tiny'))

    .post('/add-user',addUser)
    .post('/find-user',getUser)
    // .get('/get-book/:bookId',getBook)
    .patch('/update-user',updateUser)
    .listen(port, () => {
    console.log(`Listening on port ${port}`)
    });