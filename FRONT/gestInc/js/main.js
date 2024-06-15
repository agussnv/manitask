/**
 * Asynchronously creates a request to the specified URL using the Requester class and renders the response data on a table in the HTML document.
 *
 * @return {Promise<void>} A Promise that resolves when the table is successfully rendered, or rejects with an error message.
 */

/*async function createReq() {
  const r1 = new Requester();
   const tableBody = document.getElementById("tableBody");
  try {
    const p = document.createElement("p");
    p.innerHTML = "Cargando...";
    p.style.cssText = "color: red; font-size: 20px; font-weight: bold;";
    tableBody.appendChild(p);
    const req = await r1.request("https://jsonplaceholder.typicode.com/todos");
    drawOnTable(req);
  } catch (error) {
    tableBody.innerHTML = "";
    const p = document.createElement("p");
    p.innerHTML = "Error: " + error + ".";
    p.style.cssText = "color: red; font-size: 20px; font-weight: bold;";
    tableBody.appendChild(p);
  }
}*/

document.addEventListener('DOMContentLoaded', function() {
  //MENU DROP DEL NAV
  const dropbtn = document.querySelector('.dropbtn')
  const dropNoti = document.querySelector('.dropbtn_Noti')
  const arrow = document.querySelector('.arrow')
  const dropcontent = document.querySelector('.dropdown-content')
  const dropcontentNoti = document.querySelector('.dropdown-content_Noti')

  dropbtn.addEventListener('click',function(){
    arrow.classList.toggle('arrow-rotate');
    dropcontent.classList.toggle('show');
  })

  dropNoti.addEventListener('click',function(){
    dropcontentNoti.classList.toggle('show');
  })
});

//Notificacion de tasker
async function notificationTask() {
  let r1 = new Requester();
  let rest = await r1.userRequest({_id: getCookie('id')}, "http://localhost:3000/users/getOneUser")
  console.log(rest);
  //Tareas del usuario obtenido
  let tasks = rest.user.tasks;
  console.log(tasks);
  let restTasker = await r1.getTaskersRequest({tasks: tasks}, "http://localhost:3000/users/getTaskers")
  console.log(restTasker);
  if(restTasker.res == 1){
    document.getElementById("iconNoti").src = "svg/notificacionON.svg";
  }else{
    document.getElementById("iconNoti").src = "svg/notificacionOFF.svg";
  }
  return restTasker;
};

async function showTaskers(){
  let res = await notificationTask();
  let tasks = res.tasks;
  let r1 = new Requester();
  const listadoContain = document.getElementById("tasker_container");
  //HABRIA Q HACER UN FOR DENTRO DE UN FOR, PRIMER FOR = TASKS, Y SEGUNDO FOR = TASKERS
  for(const task of tasks){
    for(const element of task.tasker) {
      let item = document.createElement("li");
      item.className = "taskerItem";
      let textoTasker = document.createElement("p");
      textoTasker.className = "taskerName";
      //COMO CAMBIAMOS EL REQUESTER, EL REQUESTRE AGARRA SIEMPRE EL GetCookie("id") y por eso siempre retorna "Agustin"
      let taskerName = await r1.taskerRequest({id: element}, "http://localhost:3000/users/getOneTasker")
      console.log(taskerName);
      textoTasker.innerHTML = '<span style="font-weight: bold;">' + taskerName.user.username + '</span> se inscribió a tu tarea <span style="font-weight: bold;">' + task.title + "</span>";
      let btncontain = document.createElement("div");
      btncontain.className = "taskerOptions";
      let btnaccept = document.createElement("button");
      btnaccept.innerHTML = "ACEPTAR";
      let btnrefuse = document.createElement("button");
      btnrefuse.innerHTML = "RECHAZAR";
      
      btncontain.append(btnaccept, btnrefuse);
      item.append(textoTasker, btncontain);
      listadoContain.appendChild(item);
    }
  }
}

function drawOnTable(res){
  svgTime = "<svg xmlns='http://www.w3.org/2000/svg' width='25px' height='25px' viewBox='0 0 24 24' fill='none'><g id='SVGRepo_bgCarrier' stroke-width='0'/><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'/><g id='SVGRepo_iconCarrier'> <path d='M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z' stroke='#000000' stroke-width='1.3' stroke-linecap='round' stroke-linejoin='round'/> <path d='M12 6V12' stroke='#000000' stroke-width='1.3' stroke-linecap='round' stroke-linejoin='round'/> <path d='M16.24 16.24L12 12' stroke='#000000' stroke-width='1.3' stroke-linecap='round' stroke-linejoin='round'/> </g></svg>"
  svgDollar = "<svg xmlns='http://www.w3.org/2000/svg' width='25px' height='25px' viewBox='0 0 24 24' role='img' aria-labelledby='dolarIconTitle' stroke='#000000' stroke-width='1.3' stroke-linecap='square' stroke-linejoin='miter' fill='none' color='#000000'><g id='SVGRepo_bgCarrier' stroke-width='0'/><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'/><g id='SVGRepo_iconCarrier'> <title id='dolarIconTitle'>Dolar</title> <path d='M12 4L12 6M12 18L12 20M15.5 8C15.1666667 6.66666667 14 6 12 6 9 6 8.5 7.95652174 8.5 9 8.5 13.140327 15.5 10.9649412 15.5 15 15.5 16.0434783 15 18 12 18 10 18 8.83333333 17.3333333 8.5 16'/></g></svg>"
  const esquema = document.getElementById("esquema");
  esquema.innerHTML = "";
  res.forEach((element) => {
    const contenedor = document.createElement("div");
    contenedor.className="test";

    const title = document.createElement("h2");
    title.id="title";
    const desc = document.createElement("p");
    desc.id="desc";

    const timeContain = document.createElement("div");
    timeContain.className="flex vertical-center";
    timeContain.innerHTML=svgTime;
    const time = document.createElement("span");
    time.id="time";

    const dollarContain = document.createElement("div");
    dollarContain.className="flex vertical-center";
    dollarContain.innerHTML=svgDollar;
    const dollar = document.createElement("span");
    dollar.id="cash";

    const footer = document.createElement("div");
    footer.className = "flex vertical-center space-between";
    const author = document.createElement("span");
    author.id="author";
    author.innerHTML = "Author: ";
    const button = document.createElement("a");
    button.className = "botonaction nolink";
    button.innerHTML = "View Task";
    button.href = "http://127.0.0.1:3001/FRONT/gestInc/test.html?id=" + element._id;

    title.innerHTML = element.title;
    desc.innerHTML = element.desc;
    time.innerHTML = element.time;
    dollar.innerHTML = element.price;
    author.innerHTML += element.user.name;

    timeContain.appendChild(time);
    dollarContain.appendChild(dollar);
    footer.appendChild(author);
    footer.appendChild(button);
    contenedor.appendChild(title);
    contenedor.appendChild(desc);
    contenedor.appendChild(timeContain);
    contenedor.appendChild(dollarContain);
    contenedor.appendChild(footer);
    esquema.appendChild(contenedor);
  })
}

async function createRegisterRequest(data) {
  const r1 = new Requester();
  //Hacemos un request a la ruta /register y le enviamos los parámetros que le hemos enviado desde los inputs
  let rest = await r1.postRequest(
    {username: data.username, email: data.email,password: data.password},
    "http://localhost:3000/users/register");
  //establecemos los avisos que se mostrarán dependiendo del retorno de la ruta /register que se guardará en la variable rest
  if(rest.res == 1){
    document.getElementById("diverror").style.display = "flex";
    document.getElementById("diverror2").style.display = "none";
    document.getElementById("divok").style.display = "none";
  }else if(rest.res == 2){
    document.getElementById("diverror").style.display = "none";
    document.getElementById("diverror2").style.display = "flex";
    document.getElementById("divok").style.display = "none";
  }else{
    document.getElementById("diverror").style.display = "none";
    document.getElementById("diverror2").style.display = "none";
    document.getElementById("divok").style.display = "flex";
  }
}

async function createLoginRequest(data){
  const contenedor = document.createElement("div");
  const r1 = new Requester();
  let rest = await r1.postRequest({
    email: data.email,
    password: data.password
  },"http://localhost:3000/users/login");
  if(rest.res == 1){
    document.getElementById("diverror").style.display = "flex";
  }else{
    //location.href='home.html'
    const p = document.createElement("p");
    p.innerHTML = rest.user.username;
    contenedor.appendChild(p);
    //printUserInformation(rest.user);
    document.getElementById("diverror").style.display = "none";
  }
}

async function login(){
  let email = document.getElementById("email").value;
  let pass = document.getElementById("password").value;

  let requester = new Requester();
  let rest = await requester.loginRequest({
    email: email,
    password: pass
  },"http://localhost:3000/users/login");
  if(rest.res == 1){
    document.getElementById("diverror").style.display = "flex";
  }else if(rest.res == 0){
    //document.cookie = "???; max-age=0"; //BORRAR COOKIES QUE SEAN IGUAL AL PRIMER PARÁMETRO
    document.cookie = "id="+rest.user;
    document.cookie = "username="+rest.name;
    location.href='home.html';
  }
}

async function createResetPasswordRequest(data){
  const r1 = new Requester();
  let rest = await r1.postRequest({
    email: data.email,
    password1: data.password1,
    password2: data.password2
  },"http://localhost:3000/users/reset");
  //Lo mismo que los anteriores casos, dependiendo del caso retorna 1, 2 u otro
  if(rest.res == 1){
  document.getElementById("diverror").style.display = "flex";
    document.getElementById("diverror2").style.display = "none";
  }else if(rest.res == 2){
    document.getElementById("diverror2").style.display = "flex";
    document.getElementById("diverror").style.display = "none";
  }else{
    document.getElementById("diverror").style.display = "none";
    document.getElementById("diverror2").style.display = "none";
    document.getElementById("divok").style.display = "flex";
  }
}

async function createDeleteRequest(data){
  const r1 = new Requester();
  let rest = await r1.postRequest({
    email: data.email,
    password: data.password,
    deletemsg: data.deletemsg
  },"http://localhost:3000/users/delete");
  if(rest.res == 1){ //email/password incorrecta
    document.getElementById("diverror").style.display = "flex";
    document.getElementById("diverror2").style.display = "none";
    document.getElementById("divok").style.display = "none";
  }else if(rest.res == 2){ //deletemsg equivocada
    document.getElementById("diverror2").style.display = "flex";
    document.getElementById("diverror").style.display = "none";
    document.getElementById("divok").style.display = "none";
  }else{ //correcto
    document.getElementById("diverror2").style.display = "none";
    document.getElementById("diverror").style.display = "none";
    document.getElementById("divok").style.display = "flex";
  }
}

//Con el max-age=0 eliminamos las cookies donde guardamos la información del usuario dentro del cliente.
async function logout(){
  document.cookie = "id=; max-age=0";
  document.cookie = "username=; max-age=0";
  let requester = new Requester();
  let rest = await requester.logoutRequest({},"http://localhost:3000/users/logout");
  console.log(rest.res);
  location.href='login.html';
}

//Comprobar si la cookie(id) existe dentro de la base de datos, en caso que exista retorna 1 y una alerta, en caso contrario hace logOut y borra las cookies.
async function autenticar(){
  let requester = new Requester();
  let rest = await requester.cookiesRequest({cookie: getCookie("id")},"http://localhost:3000/users/autenticar");
  console.log(rest);
  if(rest.res == 1){
    alert("La cookie existe en la BBDD");
  }else{
    logout();
  }
}

//Función para conseguir la cookie con el nombre enviado por parámetro
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

async function datosUsuari(){
  let username = document.getElementById("username");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let requester = new Requester();
  let rest = await requester.cookiesRequest({cookie: getCookie("id")},"http://localhost:3000/users/autenticar");
  username.value = rest.username;
  email.value = rest.email;
  password.value = rest.password;
}

//Agarra la cookie mediante la función getCookie y la agrega al H1 del home.html
function welcomeName(){
  const name = getCookie("username");
  const welcome = document.getElementById("nombre").innerHTML;
  document.getElementById("nombre").innerHTML = welcome + name;
}

function buttonName(){
  const name = getCookie("username");
  const usuario = document.getElementById("usuario").innerHTML;
  document.getElementById("usuario").innerHTML = usuario + name;
}

//Comprobar si ya existe una cookie, en caso de existir e ir al login.html, te redirige al home
function isLogged(){
  if(document.cookie){
    location.href='home.html';
  }
}

//Comprobar si existe cookie, en caso de que no redirige al login.html y te saca del home o profile.
function isNotLogged(){
  if(!document.cookie){
    location.href='login.html';
  }
}

async function addtask(){
  let requester = new Requester();
  let rest = await requester.taskRequest({
    user: getCookie("id"),
    title: document.getElementById("title").value,
    desc: document.getElementById("description").value,
    time: document.getElementById("time").value,
    price: document.getElementById("price").value
  },"http://localhost:3000/users/addtask");
  if(rest.res == 1){
    alert("añadida")
    location.href='home.html';
  }else if(rest.res != 1){
    alert(rest.res);
  }
}

async function getMyTasks(){
  let r1 = await new Requester();
  let res = await r1.userRequest({_id: getCookie("id")}, "http://localhost:3000/users/getmytasks")
}

async function getTasks(){
  const r1 = await new Requester();
  let req = await r1.postRequest({}, "http://localhost:3000/users/gettasks")
  showAllTasks(req.tasks);
}

function showAllTasks(res){
  svgTime = "<svg xmlns='http://www.w3.org/2000/svg' width='25px' height='25px' viewBox='0 0 24 24' fill='none'><g id='SVGRepo_bgCarrier' stroke-width='0'/><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'/><g id='SVGRepo_iconCarrier'> <path d='M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z' stroke='#000000' stroke-width='1.3' stroke-linecap='round' stroke-linejoin='round'/> <path d='M12 6V12' stroke='#000000' stroke-width='1.3' stroke-linecap='round' stroke-linejoin='round'/> <path d='M16.24 16.24L12 12' stroke='#000000' stroke-width='1.3' stroke-linecap='round' stroke-linejoin='round'/> </g></svg>"
  svgDollar = "<svg xmlns='http://www.w3.org/2000/svg' width='25px' height='25px' viewBox='0 0 24 24' role='img' aria-labelledby='dolarIconTitle' stroke='#000000' stroke-width='1.3' stroke-linecap='square' stroke-linejoin='miter' fill='none' color='#000000'><g id='SVGRepo_bgCarrier' stroke-width='0'/><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'/><g id='SVGRepo_iconCarrier'> <title id='dolarIconTitle'>Dolar</title> <path d='M12 4L12 6M12 18L12 20M15.5 8C15.1666667 6.66666667 14 6 12 6 9 6 8.5 7.95652174 8.5 9 8.5 13.140327 15.5 10.9649412 15.5 15 15.5 16.0434783 15 18 12 18 10 18 8.83333333 17.3333333 8.5 16'/></g></svg>"
  const esquema = document.getElementById("esquema");
  esquema.innerHTML = "";
  res.forEach((element) => {
    const contenedor = document.createElement("div");
    contenedor.className="test";

    const title = document.createElement("h2");
    title.id="title";
    const desc = document.createElement("p");
    desc.id="desc";

    const timeContain = document.createElement("div");
    timeContain.className="flex vertical-center";
    timeContain.innerHTML=svgTime;
    const time = document.createElement("span");
    time.id="time";

    const dollarContain = document.createElement("div");
    dollarContain.className="flex vertical-center";
    dollarContain.innerHTML=svgDollar;
    const dollar = document.createElement("span");
    dollar.id="cash";

    const footer = document.createElement("div");
    footer.className = "flex vertical-center space-between";
    const author = document.createElement("span");
    author.id="author";
    author.innerHTML = "Author: ";
    const button = document.createElement("a");
    button.className = "botonaction nolink";
    button.innerHTML = "View Task";
    button.href = "http://127.0.0.1:3001/FRONT/gestInc/task.html?id=" + element._id;

    title.innerHTML = element.title;
    desc.innerHTML = element.desc;
    time.innerHTML = element.time;
    dollar.innerHTML = element.price;
    author.innerHTML += element.user.name;

    timeContain.appendChild(time);
    dollarContain.appendChild(dollar);
    footer.appendChild(author);
    footer.appendChild(button);
    contenedor.appendChild(title);
    contenedor.appendChild(desc);
    contenedor.appendChild(timeContain);
    contenedor.appendChild(dollarContain);
    contenedor.appendChild(footer);
    esquema.appendChild(contenedor);
  })
}



function getParameterByName(name) {
  var regex = new RegExp("[?]" + name + "=([^]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

async function mostrarDataTask(){
  let r1 = new Requester();
  let rest = await r1.taskIDRequest({_id: getParameterByName('id')}, "http://localhost:3000/users/findTask")
  console.log(rest.res);
  document.getElementById("title").innerHTML += rest.res.title;
  document.getElementById("desc").innerHTML += rest.res.desc;
  document.getElementById("price").innerHTML += rest.res.price + " €";
  document.getElementById("user").innerHTML += rest.res.user.name;
}

async function acceptTask() {
  let r1 = new Requester();
  let rest = await r1.taskIDRequest({_id: getParameterByName('id')}, "http://localhost:3000/users/findTask")

  const taskID = getParameterByName('id');
  const userTask = rest.res.user.id;
  const taskerID = getCookie('id');
  console.log("Task ID: " + taskID) //la notificación que se le envíe al usuario será para la task con esta ID
  console.log("User Task ID: " + userTask) //se deberá enviar notificación a este usuario
  console.log("Tasker ID: " + taskerID) //el tasker que se le enviará al usuario como candidato

  let rest2 = await r1.taskerRequest({_id: taskID, user: userTask, tasker: taskerID}, "http://localhost:3000/users/sendCandidate");
  if (rest2.res == 1){
    alert("Tasker añadido con éxito");
  }else if (rest2.res == 0){
    alert("Error");
  }else if(rest2.res == -1){
    alert("No puedes ser tasker de tu propia task")
  }else if(rest2.res == -2){
    alert("Ya te has inscrito a esta task");
  }
}