var express = require('express');
var router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://AgustinNoviello:6cZGgy55LuCpsTuc@gestionincidencias.mnhbam6.mongodb.net/?retryWrites=true&w=majority&appName=GestionIncidencias";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("'respond with a resource'");
});

/* GET users listing. */
router.post('/login', async function(req, res, next) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const response = await client;
    // Send a ping to confirm a successful connection
    await client.db("gestInc").collection("test_js").findOne({email: req.query.email});
    console.log((data) => res.json(data));
    res.send("correcto chavalin")
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

router.post('/register', async function(req, res, next) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log("concha");
    const userExist = await client
    .db("gestInc")
    .collection("test_js")
    .findOne({email: req.body.email});
    console.log(userExist);
    if(!userExist){
      const result = await client.db("gestInc").collection("test_js").insertOne({email: req.body.email,password: req.body.password});
      console.log(result);
    }else{
      res.send(JSON.stringify({res: "pepe"}));
    }
    /*const deletear = await client.db("gestInc").collection("test_js").deleteMany({ texto: 'hola mundo' });
    console.log(deletear);
    const updatear = await client.db("gestInc").collection("test_js").updateOne({ texto: "chau" },{$set: { texto: "hola"}});
    console.log(updatear);
    const trobar = await client.db("gestInc").collection("test_js").findOne({email: "agustin@gmail.com"});
    console.log(trobar);*/
    res.send("correcto chavalin")
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});


module.exports = router;
