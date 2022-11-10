const express =require('express')
const cors =require('cors')
const app = express()
const port =process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');
const e = require('express');
require('dotenv').config()

app.get('/',(req,res)=>{
    res.send('simple node server running')
})

// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASSWORD)
// username: dbService1
// password: dKhqHtxdECUaE0ze



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7isjbqc.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){
        try{
            const userCollection = client.db('doctorService').collection('users')
            const user = {
                name :'testing test',
                email :'testing@gmail.com'
            }
            const result = await userCollection.insertOne(user)
            console.log(result)
        }
        finally{

        }
}

run().catch(err => console.log(err))



app.use(cors())
app.use(express.json())



app.listen(port, ()=>{
    console.log(`simple node server running ${port}`)

})
