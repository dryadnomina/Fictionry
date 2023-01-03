const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const port = 8000
const {addUser, getUser, updateUser} =require('./handlers')
express()

    .use(express.json())
    .use(helmet())
    .use(morgan('tiny'))

    .use(
        cors({
            origin: ["http://localhost:3000", "https://fictionry-d9yt.onrender.com"],
        })
    )
    .post('/add-user',addUser)
    .post('/find-user',getUser)
    .patch('/update-user',updateUser)
    .listen(port, () => {
    console.log(`Listening on port ${port}`)
    });