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

//cambiar a get
/*router.post('/login', async function(req, res, next) {
  try {
    await client.connect();
    //buscamos un usuario que coincida el correo con la contraseña introducidos, en caso de encontrar coincidencia, retorna 1, en caso de que no, retorna 0
    const userExist = await client
    .db("gestInc")
    .collection("test_js")
    .findOne({email: req.body.email, password: req.body.password});
    if(!userExist){
      res.send(JSON.stringify({res: 1}))
    }else{
      console.log("UserJSON REGISTROS:");
      console.log(userExist);
      req.session.loggedIn = userExist._id;
      res.send(JSON.stringify({res: 0, user: req.session.loggedIn}));
    }
  } finally {
    //Cerramos la comunicación con el cliente
    await client.close();
  }
});*/

router.post('/login', async function(req, res, next) {
  try {
    await client.connect();
    //buscamos un usuario que coincida el correo con la contraseña introducidos, en caso de encontrar coincidencia, retorna 1, en caso de que no, retorna 0
    const userExist = await client
    .db("gestInc")
    .collection("test_js")
    .findOne({email: req.body.email, password: req.body.password});
    if(userExist){
      req.session.loggedIn = userExist._id;
      req.session.user = userExist.username;
      res.send(JSON.stringify({res: 0, name: req.session.user, user: req.session.loggedIn}));
    }else{
      res.send(JSON.stringify({res: 1}))
    }
  } finally {
    //Cerramos la comunicación con el cliente
    await client.close();
  }
});

//Logout
//Destruye la sesión.
router.post('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});

/*router.post('/user', async function(req, res, next) {
  try {
    await client.connect();
    //buscamos un usuario que coincida el correo con la contraseña introducidos, en caso de encontrar coincidencia, retorna 1, en caso de que no, retorna 0
    const userExist = await client
    .db("gestInc")
    .collection("test_js")
    .findOne({_id: req});
    if(!userExist){
      res.send(JSON.stringify({res: 1}))
    }else{
      console.log("---- UserJSON Información ----");
      console.log(userExist);
      req.session.loggedIn = userExist;
      res.send(JSON.stringify({res: 0, user: req.session.loggedIn}));
    }
  } finally {
    //Cerramos la comunicación con el cliente
    await client.close();
  }
});*/

router.post('/register', async function(req, res, next) {
  try {
    //Conectamos con el cliente
    await client.connect();
    //Buscamos dentro de la colección "test_js" que se encuentra dentro de la base de datos "gestInc" un usuario con el valor del input 'username'
    const userExist = await client
    .db("gestInc")
    .collection("test_js")
    .findOne({username: req.body.username});
    //Lo mismo en el anterior, pero en otra variable diferente
    const emailExist = await client
    .db("gestInc")
    .collection("test_js")
    .findOne({email: req.body.email});
    /*En caso que no exista ni usuario ni email identicos a los introducidos, se creará un usuario con los valores de los inputs enviados
    y en caso de que exista uno u otro, devolvera 1 o 2 dependiendo del tipo de error*/
    if(!userExist && !emailExist){
      const result = await client.db("gestInc").collection("test_js").insertOne({username: req.body.username, email: req.body.email,password: req.body.password});
      res.send(JSON.stringify({res: 0}));
    }else if(emailExist){
      res.send(JSON.stringify({res: 1}));
    }else if(userExist){
      res.send(JSON.stringify({res: 2}));
    }
  } finally {
    //Nos aseguramos que pase lo que pase, se cierre la conexión con el cliente
    await client.close();
  }
});

router.post('/reset', async function(req, res, next) {
  try {
    await client.connect();
    const userExist = await client
    .db("gestInc")
    .collection("test_js")
    .findOne({email: req.body.email});
    console.log((data) => res.json(data));
    const contrasena = req.body.password1;
    console.log(contrasena);
    const same = req.body.password1 == req.body.password2;
    if(!userExist){
      console.log("1");
      res.send(JSON.stringify({res: 1}))
    }else if(!same){
      console.log("2");
      res.send(JSON.stringify({res: 2}))
    }else{
      console.log("3");
      res.send(JSON.stringify({res: 0}))
      const updatear = await client
      .db("gestInc")
      .collection("test_js")
      .updateOne({ email: req.body.email},{$set: {password: contrasena}});
    }
  } finally {
    await client.close();
  }
});

router.post('/delete', async function(req, res, next) {
  try {
    await client.connect();
    const userExist = await client
    .db("gestInc")
    .collection("test_js")
    .findOne({email: req.body.email, password: req.body.password});
    console.log((data) => res.json(data));
    /*guardamos la nueva contraseña en una constante y en caso de que el input en 'deletemsg'
    sea igual a "delete account", se guardará un true dentro de la constante 'ok'*/
    const contrasena = req.body.password1;
    const ok = req.body.deletemsg == "delete account";
    /*si el usuario no existe, retorna 1. si 'deletemsg' no es igual a "delete account", retorna 2.
    En caso de que no se cumpla ninguna de estas condiciones retorna 0 y se eliminan los usuarios
    que encuentre con el email del input*/
    if(!userExist){
      res.send(JSON.stringify({res: 1}))
    }else if(!ok){
      res.send(JSON.stringify({res: 2}))
    }else{
      res.send(JSON.stringify({res: 0}))
      const deletear = await client
      .db("gestInc")
      .collection("test_js")
      .deleteMany({ email: req.body.email});
    }
  } finally {
    await client.close();
  }
});

router.post('/getusers', async function(req, res, next) {
  try {
    //esperamos a que se conecte con el cliente
    await client.connect();
    try{
      //con .find sin parámetro, nos retorna todos los elementos dentro de la colección
      const users = await client
      .db("gestInc")
      .collection("test_js")
      .find().toArray();
      console.log(users);
      /*en caso de que users sea mayor a 0, significa que hay al menos 1 usuario
      y enviamos tanto 0 o 1 dependiendo el caso y los usuarios*/
      if(users.length > 0){
        res.send(JSON.stringify({res: 0, users: users}));
      }else{
        res.send(JSON.stringify({res: 1, users: users}));
      }
    }catch (error){
      console.log(error);
    }
  } finally {
    await client.close();
  }
});

module.exports = router;

/*const deletear = await client.db("gestInc").collection("test_js").deleteMany({ texto: 'hola mundo' });
    console.log(deletear);
    const updatear = await client.db("gestInc").collection("test_js").updateOne({ texto: "chau" },{$set: { texto: "hola"}});
    console.log(updatear);
    const trobar = await client.db("gestInc").collection("test_js").findOne({email: "agustin@gmail.com"});
    console.log(trobar);*/