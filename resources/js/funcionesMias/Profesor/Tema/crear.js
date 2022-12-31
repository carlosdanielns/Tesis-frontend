const asiganturaCrear = JSON.parse(localStorage.getItem("a"));

//Abrir modal Crear
function abrirModalCrear() {
  $("#modalCrear").modal({ backdrop: "static", keyboard: false });
  $("#modalCrear").modal("show");
  quitarDivCrear();
}
//Fin modal Crear

//Crear Temas
$("#formularioCreate").on("submit", function (e) {
  e.preventDefault();
  onClickBotonCrear();
  const url = "http://localhost:3000/api/v2/tema/";
  let token = JSON.parse(localStorage.getItem("token"));
  var urlAsignatura = "http://localhost:3000/api/v2/asignatura/descripcion/";

  //Aqui obtengo la asignatura por la cual el profesor hizo login
  fetch(urlAsignatura + asiganturaCrear, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resFindDescripcion) => resFindDescripcion.json())
    .then((resFindDescripcion) => {
      var newDescripcion = $("#descripcion");
      var data = { descripcion: newDescripcion.val() };

      fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
        .then((resPost) => resPost.json())
        .then((resPost) => {
          const urlAddTema =
            "http://localhost:3000/api/v2/asignatura/" +
            resFindDescripcion._id +
            "/tema/" +
            resPost._id;

          fetch(urlAddTema, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json, text/plain, */*",
              Authorization: `Bearer ${token}`,
            },
          })
            .then((resAdd) => resAdd.json())
            .then((resAdd) => {
              if (resAdd.status == 401 || resAdd.statusCode == 401) {
                $("#modal401").modal({
                  backdrop: "static",
                  keyboard: false,
                });
                $("#modal401").modal("show");
              }
            })
            .finally(() => {
              quitarDivCrear();
              location.replace("/tema/listado");
            });
        });
    });
});
// Fin Crear Temas

function onClickBotonCrear() {
  var boton = document.getElementById("botonInsertar");
  var chargerInsertar = document.getElementById("chargerInsertar");
  chargerInsertar.style.visibility = "visible";
  chargerInsertar.style.opacity = "100";
  boton.innerHTML = "  Procesando...";
  boton.disabled = true;
}

function quitarDivCrear() {
  var boton = document.getElementById("botonInsertar");
  var chargerInsertar = document.getElementById("chargerInsertar");
  chargerInsertar.style.visibility = "hidden";
  chargerInsertar.style.opacity = "0";
  boton.innerHTML = "Insertar Tema";
  boton.disabled = false;
}

var formulario = document.getElementById("formularioCreate");
var close = document.getElementById("close");

close.addEventListener("click", function () {
  formulario.reset();
});
