const temaCrear = JSON.parse(localStorage.getItem("temaId"));
console.log(temaCrear);

//Abrir modal Crear
function abrirModalCrear() {
  var nota5 = document.getElementById("nota5");
  nota5.setAttribute("max", 100);
  nota5.setAttribute("min", 1);

  var tiempoDuracion = document.getElementById("tiempoDuracion");
  tiempoDuracion.setAttribute("max", 1440);
  tiempoDuracion.setAttribute("min", 10);
  $("#modalCrear").modal({ backdrop: "static", keyboard: false });
  $("#modalCrear").modal("show");
  quitarDivCrear();
}
//Fin modal Crear

//Crear Nivel
$("#formularioCreate").on("submit", function (e) {
  const url = "http://localhost:3000/api/v2/nivel/";
  let token = JSON.parse(localStorage.getItem("token"));

  e.preventDefault();
  onClickBotonCrear();
  var newDescripcion = $("#descripcion");
  var newNota5 = $("#nota5");
  var newtiempoDuracion = $("#tiempoDuracion");
  console.log(newtiempoDuracion);

  var data = {
    descripcion: newDescripcion.val(),
    nota5: newNota5.val(),
    tiempoDuracion: newtiempoDuracion.val(),
  };

  console.log(data);
  fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((resPostNivel) => resPostNivel.json())
    .then((resPostNivel) => {
      const urlAddNivel =
        "http://localhost:3000/api/v2/tema/" +
        temaCrear.id +
        "/nivel/" +
        resPostNivel._id;
      console.log(urlAddNivel);
      fetch(urlAddNivel, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resAddNivel) => resAddNivel.json())
        .then((resAddNivel) => {
          if (resAddNivel.status == 401 || resAddNivel.statusCode == 401) {
            $("#modal401").modal({
              backdrop: "static",
              keyboard: false,
            });
            $("#modal401").modal("show");
          }
        })
        .finally(() => {
          quitarDivCrear();
          location.replace("/nivel/listado");
        });
    });
});
// Fin Crear Nivel

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
  boton.innerHTML = "Insertar Nivel";
  boton.disabled = false;
}

var formulario = document.getElementById("formularioCreate");
var close = document.getElementById("close");

close.addEventListener("click", function () {
  formulario.reset();
});
