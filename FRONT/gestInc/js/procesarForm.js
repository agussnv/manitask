function getParameterByName(name) {
    var regex = new RegExp("[?]" + name + "=([^]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

async function mostrarTitleTask(){
    let r1 = new Requester();
    let rest = await r1.taskIDRequest({_id: getParameterByName('id')}, "http://localhost:3000/users/findTask")
    console.log(rest.res);
    document.getElementById("title").innerHTML += rest.res.title;
    document.getElementById("desc").innerHTML += rest.res.desc;
    document.getElementById("price").innerHTML += rest.res.price + " €";
    document.getElementById("user").innerHTML += rest.res.user.name;
  }