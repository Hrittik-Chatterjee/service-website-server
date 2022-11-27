const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.use(cors())
app.use(express.json())



require('dotenv').config()

app.get('/', (req, res) => {
    res.send('simple node server running')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7isjbqc.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        const serviceCollection = client.db('doctorService').collection('services')
        const reviewCollection = client.db('doctorService').collection('reviews')
        const orderCollection = client.db('doctorService').collection('orders')
        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query)
            const services = await cursor.toArray()
            res.send(services)
        })

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const service = await serviceCollection.findOne(query)
            res.send(service)
        })
        
        app.get('/limited', async(req, res) => {
            const query = {};
            // sort in descending (-1) order by length
            const cursor = serviceCollection.find(query).limit(3);
            const limited=await cursor.toArray();
            res.send(limited)
        })

        //reviews api
        app.get('/reviews', async(req,res)=>{
            let query ={}
            if(req.query.email){
                query={
                    email:req.query.email
                }
            }
            const cursor =reviewCollection.find(query)
            const reviews =await cursor.toArray()
            res.send(reviews)
        })
        app.get('/reviews', async(req,res)=>{
            let query ={}
            if(req.query.service){
                query={
                    service:req.query.service
                }
            }
            const cursor =reviewCollection.find(query)
            const reviews =await cursor.toArray()
            res.send(reviews)
        })

        
        app.post ('/reviews', async(req,res)=>{
            const review =req.body
            const result = await reviewCollection.insertOne(review)
            res.send(result)
            
        })


        // orders api
        app.get('/orders', async (req, res)=>{
            let query={}
            if(req.query.email){
                query={
                   email: req.query.email
                }
            }
            const cursor = orderCollection.find(query)
            const orders= await cursor.toArray()
            res.send(orders)
        })


        app.post('/orders',async(req,res)=>{
            const order = req.body
            const resultorders = await orderCollection.insertOne(order)
            res.send(resultorders)
        })
    }
    finally {

    }
}

run().catch(err => console.log(err))

app.listen(port, () => {
    console.log(`simple node server running ${port}`)

})
