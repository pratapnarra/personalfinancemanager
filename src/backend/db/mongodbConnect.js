const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config()




async function mongodbConnect() {
	// we'll add code here soon
    const uri = "mongodb+srv://babjipratap99:pratap99@cluster0.l9et6rs.mongodb.net/personalfinancemanagerdb?retryWrites=true&w=majority";
    // const client = new MongoClient(uri);

    mongoose.connect(uri)
    .then(()=>{
        console.log("Successfully Connected to MongoDB")
    })
    .catch((e)=>{
        console.log("Unable to connnect");
        console.log(e);
    })
    

    // try {
    //     // Connect to the MongoDB cluster
    //     await client.connect();
 
    //     // Make the appropriate DB calls
    //     await  listDatabases(client);
 
    // } catch (e) {
    //     console.error(e);
    // } finally {
    //     await client.close();
    // }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

mongodbConnect().catch(console.error);
module.exports = mongodbConnect;