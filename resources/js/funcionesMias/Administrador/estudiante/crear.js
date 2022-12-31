const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  CI: /^.{11}$/, // 4 a 12 digitos.
};

const campos = {
  nombre: false,
  CI: false,
};

//Abrir modal Crear
function abrirModalCrear() {
  $("#modalCrear").modal({ backdrop: "static", keyboard: false });
  $("#modalCrear").modal("show");
  var nombreBien = document.getElementById("nombreBien");
  nombreBien.style.visibility = "hidden";
  var CIBien = document.getElementById("CIBien");
  CIBien.style.visibility = "hidden";
  quitarDivCrear();
}
//Fin modal Crear

function borrar() {
  var comboMal = document.getElementById("comboMal");
  comboMal.style.visibility = "hidden";
}

$("#formularioCreate").on("submit", function (e) {
  e.preventDefault();
  onClickBotonCrear();

  const urlEstudiante = "http://localhost:3000/api/v2/estudiante";
  let token = JSON.parse(localStorage.getItem("token"));

  if (navigator.onLine) {
    server(urlEstudiante);

    var newNombre = $("#nombre");
    var newCI = $("#CI");

    const selectElement = document.getElementById("anno");
    selectElement.addEventListener("onchange", anno());

    function anno() {
      newAnno = selectElement.options[selectElement.selectedIndex].text;
    }

    if (newAnno == "Seleccione un Año") {
      var comboMal = document.getElementById("comboMal");
      comboMal.style.visibility = "visible";
      return;
    }

    agregar(newNombre.val(), newCI.val(), newAnno);
  } else {
    $("#modalCrear").modal("hide");
    $("#internet").modal("show");
  }
});

function onClickBotonCrear() {
  var boton = document.getElementById("botonInsertar");
  var chargerInsertar = document.getElementById("chargerInsertar");
  chargerInsertar.style.visibility = "visible";
  chargerInsertar.style.opacity = "100";
  boton.innerHTML = "Procesando...";
  boton.disabled = true;
}

function quitarDivCrear() {
  /*var nombreBien = document.getElementById("nombreBien");
  nombreBien.style.visibility = "hidden";
  var nombreMal = document.getElementById("nombreMal");
  nombreMal.style.visibility = "hidden";
  var CIBien = document.getElementById("CIBien");
  CIBien.style.visibility = "hidden";
  var CIMal = document.getElementById("CIMal");
  CIMal.style.visibility = "hidden";
  var CIBien = document.getElementById("comboMal");
  CIBien.style.visibility = "hidden";*/

  var boton = document.getElementById("botonInsertar");
  var chargerInsertar = document.getElementById("chargerInsertar");
  chargerInsertar.style.visibility = "hidden";
  chargerInsertar.style.opacity = "0";
  boton.innerHTML = "Insertar Estudiante";
  boton.disabled = false;
}

var formulario = document.getElementById("formularioCreate");
var close = document.getElementById("close");

close.addEventListener("click", function () {
  formulario.reset();
});

function server(url) {
  var source = new EventSource(url);
  var isOpen = false;

  source.addEventListener(
    "message",
    function (e) {
      console.log(e.data);
    },
    false
  );

  source.addEventListener(
    "open",
    function (e) {
      // Server up
      console.log("El server esta corriendo");
      isOpen = true;
    },
    false
  );

  source.addEventListener(
    "error",
    function (e) {
      if (!isOpen && source.readyState == EventSource.CONNECTING) {
        // Server down
        $("#serverCaido").modal("show");
      } else if (source.readyState == EventSource.CLOSED) {
        // Server error
      }
      isOpen = false;
    },
    false
  );
}

function agregar() {
  const data = {
    name: newNombre.val(),
    CI: newCI.val(),
    annoCurso: newAnno,
  };

  fetch(urlEstudiante, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      const CI = res.CI;
      const name = res.name;
      var nameN = name.split(" ");
      const tipo = "Estudiante";
      const urlUser =
        "http://localhost:3000/api/v2/user/" + nameN[0] + "/" + CI + "/" + tipo;

      fetch(urlUser, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status == 401 || res.statusCode == 401) {
            $("#modal401").modal({
              backdrop: "static",
              keyboard: false,
            });
            $("#modal401").modal("show");
          }
        })
        .finally(() => {
          quitarDivCrear();
          location.replace("/estudiante/listado");
        });
    });
}
