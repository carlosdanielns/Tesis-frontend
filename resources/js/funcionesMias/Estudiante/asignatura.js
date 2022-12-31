window.addEventListener("load", cargarAsignatura);

function cargarAsignatura() {
  const urlAsignatura = "http://localhost:3000/api/v2/asignatura/";
  let token = JSON.parse(localStorage.getItem("token"));

  fetch(urlAsignatura, {
    method: "get",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resFindAll) => resFindAll.json())
    .then((resFindAll) => {
      var divAsignaturas = document.getElementById("divAsignaturas");
      var div = document.createElement("div");
      div.setAttribute("id", "asignaturasDiv");
      for (var i = 0; i < resFindAll.length; i++) {
        var button = document.createElement("button");
        //button.className = "btn btn-outline-light btn-lg px-5 mt-0";
      button.setAttribute("id", "buttonDiv");
        

        var nombre = document.createTextNode(resFindAll[i].descripcion);
        button.appendChild(nombre);
        div.appendChild(button);
        divAsignaturas.appendChild(div);
      }

      eventoButton();
    });
}

function eventoButton() {
  const urlAsignatura = "http://localhost:3000/api/v2/asignatura/";
  let token = JSON.parse(localStorage.getItem("token"));

  var button = document.querySelectorAll("button");
  for (var index = 0; index < button.length; index++) {
    var btn = button[index].addEventListener("click", valores);
  }

  console.log(button);

  function valores(btn) {
    var botonTocado = btn.target.id;
    console.log(botonTocado);

    fetch(urlAsignatura, {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resFindAll) => resFindAll.json())
      .then((resFindAll) => {
        for (var i = 0; i < resFindAll.length; i++) {
          if (resFindAll[i].descripcion == btn.target.outerText) {
            var data = {
              asignatura: resFindAll[i],
              i: i,
            };

            console.log(data);
          }
        }

        // Lo parseamos a texto para guardarlo en el localStorage
        localStorage.setItem("asignaturaData", JSON.stringify(data));

        location.replace("/estudiante/temas");
      });
  }
}


const botonRegresar = document.getElementById("regresar");
botonRegresar.addEventListener("click", regresar);

function regresar() {
  location.replace("/login");
}