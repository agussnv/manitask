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

async function createGetUsersRequest(){
  const r1 = new Requester();
  const tableBody = document.getElementById("tablebody");
  //Hacemos una llamada a la ruta de /getusers
  let req = await r1.postRequest({},"http://localhost:3006/users/getusers");
  console.log(req)
  /*la variable donde guardamos el retorno de /getusers la enviamos a la función drawOnTable donde
  la imprimirá dentro de una tabla en el archivo html*/
  drawOnTable(req.users);
  if(req.res == 1){
    document.getElementById("diverror").style.display = "flex";
  }else{
    document.getElementById("diverror").style.display = "none";
  }
}

 function drawOnTable(res) {
   const tableBody = document.getElementById("tableBody");
   tableBody.innerHTML = "";
   res.forEach((element) => {
    //creamos los diferentes elementos donde se mostrará la información
     const r = document.createElement("tr");
     const c1 = document.createElement("td");
     const c2 = document.createElement("td");
     const c3 = document.createElement("td");
     /*añadimos al archivo html el username, email y password
     que conseguimos a través del retorno de la ruta de /getusers*/
     c1.innerHTML = element.username;
     c2.innerHTML = element.email;
     c3.innerHTML = element.password;
     //y unimos las 3 columnas a la fila 'r'
     r.appendChild(c1);
     r.appendChild(c2);
     r.appendChild(c3);
     tableBody.appendChild(r);
    });
  }

async function createRegisterRequest(data) {
  const r1 = new Requester();
  //Hacemos un request a la ruta /register y le enviamos los parámetros que le hemos enviado desde los inputs
  let rest = await r1.postRequest(
    {username: data.username, email: data.email,password: data.password},
    "http://localhost:3006/users/register");
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
  },"http://localhost:3006/users/login");
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
  },"http://localhost:3006/users/login");
  if(rest.res == 1){
    document.getElementById("diverror").style.display = "flex";
  }else if(rest.res == 0){
    //document.cookie = "???; max-age=0"; //BORRAR COOKIES QUE SEAN IGUAL AL PRIMER PARÁMETRO
    document.cookie = "id="+rest.user;
    document.cookie = "username="+rest.name;
    location.href='home.html';
  }
}

function drawOnTable(res) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  res.forEach((element) => {
  //creamos los diferentes elementos donde se mostrará la información
    const r = document.createElement("tr");
    const c1 = document.createElement("td");
    const c2 = document.createElement("td");
    const c3 = document.createElement("td");
    /*añadimos al archivo html el username, email y password
    que conseguimos a través del retorno de la ruta de /getusers*/
    c1.innerHTML = element.username;
    c2.innerHTML = element.email;
    c3.innerHTML = element.password;
    //y unimos las 3 columnas a la fila 'r'
    r.appendChild(c1);
    r.appendChild(c2);
    r.appendChild(c3);
    tableBody.appendChild(r);
  });
}

//FUNCIÓN PARA RECOGER EL REST.USER Y COMPARARLO CON DOCUMENT.COOKIE PERO NO SE COMO AGARRAR EL REST.USER SIN LLAMAR AL LOGIN CADA VEZ QUE QUIERE TESTEARCOOKIES
/*async function testCookies(){
  let email = document.getElementById("email").value;
  let pass = document.getElementById("password").value;

  let requester = new Requester();
  let rest = await requester.loginRequest({
    email: email,
    password: pass
  },"http://localhost:3006/users/login");
  if(rest.res == 1){
    alert("erroreerr");
  }else if(rest.res == 0){
    alert(document.cookie);
    if(rest.user == document.cookie){
      alert("mismo usuario que el guardado en las cookies");
    }else{
      alert("diferente usuario");
    }
  }
}

async function printUserInformation(data){
  console.log("informacion usuario:")
  console.log(data);
  const r1 = new Requester();
  let rest = await r1.loginRequest({
    _id: data
  },"http://localhost:3006/users/user");
  console.log("--- main.js ---")
  console.log(rest.user);
}*/

async function createResetPasswordRequest(data){
  const r1 = new Requester();
  let rest = await r1.postRequest({
    email: data.email,
    password1: data.password1,
    password2: data.password2
  },"http://localhost:3006/users/reset");
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
  },"http://localhost:3006/users/delete");
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

async function logout(){
  document.cookie = "id=; max-age=0";
  document.cookie = "username=; max-age=0";
  let requester = new Requester();
  let rest = await requester.logoutRequest({},"http://localhost:3006/users/logout");
  console.log(rest.res);
  location.href='login.html';
}

async function autenticar(){
  let requester = new Requester();
  let rest = await requester.request({},"http://localhost:3006/users/autenticar");
}

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

function welcomeName(){
  const name = getCookie("username");
  const original = document.getElementById("nombre").innerHTML;
  const nom = document.getElementById("nombre").innerHTML = original + name;
}

function isLogged(){
  if(document.cookie){
    location.href='home.html';
    alert("Ya existe una sesión abierta")
  }
}