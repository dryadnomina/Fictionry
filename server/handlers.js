const { v4: uuidv4 } = require("uuid");
const { MongoClient} = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

//based on email, if user does not already exists creates a new user obj
const addUser = async (req, res) => {

    const client =  new MongoClient(MONGO_URI,options);

    try {

        await client.connect();
        const db = client.db('Fictionry');
        const newUser = {...req.body,_id:uuidv4()};

        const users =  await db.collection("users").find().toArray();
        console.log(users)
        const userExists = users.filter(obj => obj.email === newUser.email);

        if(userExists.length === 0){
            await db.collection("users").insertOne(newUser);
            res.status(201).json({status:201 , message:"New User Added"});
        }
        if(userExists.length > 0){
            res.status(400).json({status:400,message:'User already exists'})
        }
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({status:500 , message:"Unexpected problem has occured!"})
    }
    finally{
        client.close();
    }
    

};

//runs in user context, when user is authenticated - returns user obj based on email
const getUser = async (req, res) => {
    const {email} = req.body;
    const client =  new MongoClient(MONGO_URI,options);

    try {

        await client.connect();
        const db = client.db('Fictionry');

        const users =  await db.collection("users").find().toArray();
        console.log(users)
        const userExists = users.filter(obj => obj.email === email);

        if(userExists.length > 0){
        
            res.status(201).json({status:201 , data:userExists[0]});
        }
        if(userExists.length === 0){
            res.status(400).json({status:400,message:'User does not exist'})
        }
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({status:500 , message:"Unexpected problem has occured!"})
    }
    finally{
        client.close();
    }
    

};

//Update user,when user state changes, updates user obj- this handles changes in wishlist,reading,currently reading,and comments

module.exports ={addUser, getUser}

    