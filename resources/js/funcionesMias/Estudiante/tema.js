window.addEventListener("load", ver);

var colorRojo = "colorRojo";
var colorVerde = "colorVerde";
var colorNaranja = "colorNaranja";
var buttonDiv = "buttonDiv";

function ver() {
  var dataFromlocalStorage = JSON.parse(localStorage.getItem("asignaturaData"));

  var divPrincipal = document.getElementById("divPrincipal");
  for (
    var j = 0;
    j <
    dataFromlocalStorage.asignatura.cursos[
      dataFromlocalStorage.asignatura.cursos.length - 1
    ].temas.length;
    j++
  ) {
    var descripcion = document.createElement("h1");
    var nombre = document.createTextNode(
      dataFromlocalStorage.asignatura.cursos[
        dataFromlocalStorage.asignatura.cursos.length - 1
      ].temas[j].descripcion
    );
    descripcion.appendChild(nombre);
    divPrincipal.appendChild(descripcion);

    var div = document.createElement("div");
    div.setAttribute("id", "nivelDiv");
    for (
      var w = 0;
      w <
      dataFromlocalStorage.asignatura.cursos[
        dataFromlocalStorage.asignatura.cursos.length - 1
      ].temas[j].niveles.length;
      w++
    ) {
      var button = document.createElement("button");
      button.setAttribute("id", "buttonDiv");
      var nombre = document.createTextNode(
        dataFromlocalStorage.asignatura.cursos[
          dataFromlocalStorage.asignatura.cursos.length - 1
        ].temas[j].niveles[w].descripcion
      );
      button.appendChild(nombre);
      div.appendChild(button);
      divPrincipal.appendChild(div);
    }
  }
  eventoButton();
}

function eventoButton() {
  var button = document.querySelectorAll("button");

  for (var index = 0; index < button.length; index++) {
    var btn = button[index].addEventListener("click", valores);
  }

  function valores(btn) {
    var botonTocado = btn.target.id;

    const urlNivel = "http://localhost:3000/api/v2/nivel/";
    let token = JSON.parse(localStorage.getItem("token"));

    fetch(urlNivel, {
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
              nivel: resFindAll[i],
              i: i,
            };
          }
        }
        localStorage.setItem("nivelBD", JSON.stringify(data));

        location.replace("/estudiante/pregunta");
      });
  }
}

const botonRegresar = document.getElementById("regresar");
botonRegresar.addEventListener("click", regresar);

function regresar() {
  location.replace("/estudiante/asignatura");
}
