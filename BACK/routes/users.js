var express = require('express');
var router = express.Router();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://AgustinNoviello:6cZGgy55LuCpsTuc@gestionincidencias.mnhbam6.mongodb.net/?retryWrites=true&w=majority&appName=GestionIncidencias";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  if (!client.isConnected()) {
    await client.connect();
    console.log("Conectado a la base de datos");
  }
  return client.db(dbName);
}

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
//Destruye la sesión en caso de existir.
router.post('/logout', function (req, res) {
  if (req.session.loggedIn) {
    req.session.destroy(function(err) {
      if (err) {
        console.error("Session destruction error:", err);
        res.status(500).send(JSON.stringify({ res: "log out failed" }));
      } else {
        console.log("Sesión destruida");
        res.send(JSON.stringify({ res: "log out success" }));
      }
    });
  } else {
    res.send(JSON.stringify({ res: "No existe ninguna sesión" }));
  }
});

//Comprueba si la cookie guardada existe dentro de la BBDD,
//si existe retorna un 1 y la información de usuario (ya que en otra función extra que añadí me hará falta),
//en caso contrario retorna 0.
/*router.post('/autenticar', async function(req, res, next) {
  try {
    await client.connect();
    const userExist = await client
    .db("gestInc")
    .collection("test_js")
    .findOne({_id: new ObjectId(req.body._id)});
    if(userExist){
      res.send(JSON.stringify({res: 1, username: userExist.username, email: userExist.email, password: userExist.password}));
    }else{
      res.send(JSON.stringify({res: 0}));
    }
  } finally {
    //Cerramos la comunicación con el cliente
    await client.close();
  }
});*/


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

router.post('/addtask', async function(req, res, next) {
  try {
    await client.connect();
    const db = client.db("gestInc");
    const usersCollection = db.collection("test_js");
    const tasksCollection = db.collection("tasks");
    //buscamos un usuario que coincida el correo con la contraseña introducidos, en caso de encontrar coincidencia, retorna 1, en caso de que no, retorna 0
    const userId = new ObjectId(req.body._id);
    const userExist = await usersCollection.findOne({_id: userId});
    if(userExist){
      const addTask = await tasksCollection.insertOne(
        {title: req.body.title,
          desc: req.body.desc,
          time: req.body.time,
          price: req.body.price,
          user: {id: req.body._id,
            name: userExist.username,
            email: userExist.email}}
          );
      const addUserArrayTasks = await usersCollection.updateOne(
        {_id : userId},
        {$push : {tasks: addTask.insertedId} }
      );
      res.send(JSON.stringify({res: 1, task: addTask}));
    }else{
      res.send(JSON.stringify({res: 0}));
    }
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).send(JSON.stringify({ res: 0, error: error.message }));
  } finally {
    //Cerramos la comunicación con el cliente
    await client.close();
  }
});

router.post('/gettasks', async function(req, res, next){
  try{
    await connectClient();
    const db = client.db("gestInc");
    const usersCollection = db.collection("test_js");
    const tasksCollection = db.collection("tasks");
    try{
      const tasks = await tasksCollection.find().toArray();
      if(tasks.length > 0){
        res.send(JSON.stringify({res: 0, tasks: tasks}));
      } else {
        res.send(JSON.stringify({res: 1, tasks: tasks}));
      }
    } catch(error) {
      console.log(error);
      res.status(500).send({ res: 2, message: 'Error fetching tasks' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ res: 3, message: 'Error connecting to database' });
  }
});

router.post("/findTask", async (req, res) => {
  console.log("PEPE: " + req.body._id)
  await client.connect();
  const taskExist = await client
  .db("gestInc")
  .collection("tasks")
  .findOne({_id: new ObjectId(req.body._id)})
  if(taskExist){
    res.send({res: taskExist});
  }else{
    console.log("No existe");
  }
})

router.post("/sendCandidate", async (req, res) => {
  await client.connect();
  const db = client.db("gestInc");
  const usersCollection = db.collection("test_js");
  const tasksCollection = db.collection("tasks");

  const taskId = new ObjectId(req.body._id);
  const authorTaskId = new ObjectId(req.body.user);
  const taskerId = new ObjectId(req.body.tasker);
  let taskers = await usersCollection.findOne({_id: authorTaskId});
  console.log(taskers);

  let taskerExist = await tasksCollection.findOne({_id: taskId, tasker: taskerId});

  if(!authorTaskId.equals(taskerId)){
    if(taskerExist == null){
      console.log("Task ID: " + taskId) //la notificación que se le envíe al usuario será para la task con esta ID
      console.log("User Task ID: " + authorTaskId) //se deberá enviar notificación a este usuario
      console.log("Tasker ID: " + taskerId) //el tasker que se le enviará al usuario como candidato
      await client.connect();
      const taskExist = await tasksCollection.findOne({_id: taskId})
      if(taskExist){
        tasksCollection.updateOne({_id: taskId}, {$push: {tasker: taskerId}});
        res.send({res: 1});
      }else{
        res.send({res: 0});
      }
    }else{
      res.send({res: -2})
    }
  }else{
    res.send({res: -1});
  }
});

async function connectClient() {
  if (!client.isConnected) {
    try {
      await client.connect();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      throw error;
    }
  }
  return client;
}

router.post('/getOneUser', async function(req, res, next) {
  try {
    //esperamos a que se conecte con el cliente
    await connectClient();
    const db = client.db("gestInc");
    const usersCollection = db.collection("test_js");
    const tasksCollection = db.collection("tasks");
    try{
      //con .find sin parámetro, nos retorna todos los elementos dentro de la colección
      const user = await usersCollection.findOne({_id: new ObjectId(req.body._id)}/*, {projection: {tasks: 1}}*/);
      /*let tasks = user.tasks;
      tasks.forEach((element) =>{
        console.log("Tasks: "+ element);
      })*/
      /*en caso de que users sea mayor a 0, significa que hay al menos 1 usuario
      y enviamos tanto 0 o 1 dependiendo el caso y los usuarios*/
      if(user){
        res.send(JSON.stringify({res: 1, user: user}));
      }else{
        res.send(JSON.stringify({res: 0, user: user}));
      }
    }catch (error){
      console.log(error);
    }
  } catch(error) {
    res.send(JSON.stringify({res: 0, error: error.message}))
  } finally {
    //await client.close();
  }
});

async function buscarTasker(element, tasksCollection){
  console.log("TAREA FUNCTION: " + element)
  let task = tasksCollection.find({_id: new ObjectId(element)});
  //console.log("Taskers: " + task);
  return task;
}

router.post('/getTaskers', async function(req, res, next) {
  try {
    let existeTasker = false;
    let taskers;
    let task;
    await connectClient();
    const db = client.db("gestInc");
    const tasksCollection = db.collection("tasks");
    try{
      let tasks = req.body.tasks;
      for (const element of tasks) {
        console.log("Tasks: "+ element);
        task = await tasksCollection.findOne({_id: new ObjectId(element)});
        if (task.tasker != null && task.tasker.length > 0) {
          tasks = task;
          taskers = task.tasker;
          existeTasker = true;
        } else {
          console.log("TaskName: '" + task.title + "' don't have taskers");
        }
      }
      
      if(existeTasker){
        //buscar usuario con ID encontrada en taskers
        res.send(JSON.stringify({res: 1, taskers: taskers, task: tasks}));
      }else{
        res.send(JSON.stringify({res: 0}));
      }

    }catch (error){
      console.log(error);
    }
  } catch(error) {
    res.send(JSON.stringify({res: 0, error: error.message}))
  } finally {
    //await client.close();
  }
});

router.get('/FRONT/gestInc/addTask.html', (req, res) => {
  const title = req.query.title;
  console.log("Title:", title);
  res.send("Received title: " + title); // Envía una respuesta al cliente
});

module.exports = router;