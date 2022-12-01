

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
        const newUser = {...req.body,_id:uuidv4(), library:{}, reviews:{}};

        const users =  await db.collection("users").find().toArray();
        console.log(users)
        const userExists = users.filter(obj => obj.email === newUser.email);

        if(userExists.length === 0){
            await db.collection("users").insertOne(newUser);
            res.status(201).json({status:201 , message:"New User Added", data: newUser});
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

    const client =  new MongoClient(MONGO_URI,options);
    const {email} = req.body;
    console.log(req.body)
    console.log(email)
    try {

        await client.connect();
        const db = client.db('Fictionry');

        const users =  await db.collection("users").find().toArray();
        console.log(users)
        const userExists = users.filter(obj => obj.email === email);

        if(userExists.length > 0){
        
            res.status(200).json({status:200 , data:userExists[0]});
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

//Update user,when user state changes, updates user obj- this handles changes in wishlist,reading,currently reading,and user reviews
const updateUser = async (req, res) => {
    const client =  new MongoClient(MONGO_URI,options);
    try {
        
        await client.connect();
        
        const db = client.db('Fictionry');
        const updatedUser = req.body;
        const {_id} = req.body;
        const allUsers =  await db.collection("users").find().toArray();
        console.log(allUsers)
        const userCheck = allUsers.filter(obj => obj["_id"] === updatedUser["_id"]);
        console.log(userCheck)
        const query = {_id :_id}
        console.log(query)
        if(userCheck.length > 0){
            const result = await db.collection("users").replaceOne(query, updatedUser, {upsert: true});
            console.log(result)
            res.status(200).json({status:200, message: 'user updated'})
        }
        if(userCheck.length === 0){
            res.status(400).json({status:400, message:'User not found!'})
        }
        }
        catch(err){
            console.log(err);
            res.status(500).json({status:500, message:'something went wrong!'})
        }
        finally{
            client.close();
        }
};



module.exports ={addUser, getUser,updateUser}

    