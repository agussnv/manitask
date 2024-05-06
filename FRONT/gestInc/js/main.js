/**
 * Asynchronously creates a request to the specified URL using the Requester class and renders the response data on a table in the HTML document.
 *
 * @return {Promise<void>} A Promise that resolves when the table is successfully rendered, or rejects with an error message.
 */
async function createReq() {
  const r1 = new Requester();
  // const tableBody = document.getElementById("tableBody");
  try {
    // const p = document.createElement("p");
    // p.innerHTML = "Cargando...";
    // p.style.cssText = "color: red; font-size: 20px; font-weight: bold;";
    // tableBody.appendChild(p);
    const req = await r1.request("https://jsonplaceholder.typicode.com/todos");
    // drawOnTable(req);
  } catch (error) {
    // tableBody.innerHTML = "";
    // const p = document.createElement("p");
    // p.innerHTML = "Error: " + error + ".";
    // p.style.cssText = "color: red; font-size: 20px; font-weight: bold;";
    // tableBody.appendChild(p);
  }
}

async function createRegisterRequest(data) {
  const r1 = new Requester();
  let rest = await r1.postRequest(
    {email: data.email,password: data.password},
    "http://localhost:3002/users/register");
  if(rest.res == "pepe")
    alert("benjamin");
}

/**
 * Renders the books data on a table in the HTML document.
 *
 * @param {Array} books - An array of book objects to be displayed on the table
 */
// function drawOnTable(books) {
//   const tableBody = document.getElementById("tableBody");
//   tableBody.innerHTML = "";
//   books.forEach((book) => {
//     const r = document.createElement("tr");
//     const c1 = document.createElement("td");
//     const c2 = document.createElement("td");
//     const c3 = document.createElement("td");
//     const c4 = document.createElement("td");
//     c1.innerHTML = book.id;
//     c2.innerHTML = book.userId;
//     c3.innerHTML = book.title;
//     if (book.completed) {
//       c4.style.backgroundColor = "lightgreen";
//     } else {
//       c4.style.backgroundColor = "red";
//     }

//     c2.onclick = () => {
//       let userId = prompt("Enter new user ID");
//       userId != null ? (book.userId = userId) : "";
//       c2.innerHTML = book.userId;
//     };
//     c3.onclick = () => {
//       let newTitle = prompt("Enter new title");
//       book.title = newTitle;
//       c3.innerHTML = book.title;
//     };
//     c4.onclick = () => {
//       if (book.completed) {
//         c4.style.backgroundColor = "red";
//       } else {
//         c4.style.backgroundColor = "lightgreen";
//       }
//       book.completed = !book.completed;
//       console.log(book);
//     };
//     r.appendChild(c1);
//     r.appendChild(c2);
//     r.appendChild(c3);
//     r.appendChild(c4);
//     tableBody.appendChild(r);
//   });
// }
