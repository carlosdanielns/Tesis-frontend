const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  CI: /^[a-zA-Z0-9]{11}$/, // 4 a 12 digitos.
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

  const urlEstudiante = "http://localhost:3000/api/v2/estudiante";

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
    if (!expresiones.nombre.test(newNombre.val())) {
      var nombreMal = document.getElementById("nombreMal");
      nombreMal.style.visibility = "visible";
      return;
    }

    if (!expresiones.CI.test(newCI.val())) {
      var CIMal = document.getElementById("CIMal");
      CIMal.style.visibility = "visible";
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
  var nombreMal = document.getElementById("nombreMal");
  nombreMal.style.visibility = "hidden";
  var CIMal = document.getElementById("CIMal");
  CIMal.style.visibility = "hidden";
  var CIBien = document.getElementById("comboMal");
  CIBien.style.visibility = "hidden";

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

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nombre":
      validarCampo(expresiones.nombre, e.target, "nombre");
      break;
    case "CI":
      validarCampo(expresiones.CI, e.target, "CI");
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  var nombreMal = document.getElementById("nombreMal");
  var CIMal = document.getElementById("CIMal");

  CIMal.style.visibility = "hidden";
  nombreMal.style.visibility = "hidden";

  if (expresion.test(input.value)) {
    campos[campo] = true;
  } else if (campo == "nombre") {
    nombreMal.style.visibility = "visible";
    campos[campo] = false;
  } else if (campo == "CI") {
    CIMal.style.visibility = "visible";
    campos[campo] = false;
  }
};

const inputs = document.querySelectorAll("#formularioCreate input");

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
});

function agregar(nombre, CI, anno) {
  onClickBotonCrear();

  const urlEstudiante = "http://localhost:3000/api/v2/estudiante";
  let token = JSON.parse(localStorage.getItem("token"));

  if (navigator.onLine) {
    server(urlEstudiante);
    fetch(urlEstudiante, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        var find = false;

        for (let j = 0; j < res.length && find == false; j++) {
          if (res[j].name == nombre && res[j].CI == CI) {
            var nombreBien = document.getElementById("nombreBien");
            nombreBien.style.visibility = "visible";
            var CIBien = document.getElementById("CIBien");
            CIBien.style.visibility = "visible";
            find = true;
          } else if (res[j].CI == CI) {
            var CIBien = document.getElementById("CIBien");
            CIBien.style.visibility = "visible";
            find = true;
          } else if (res[j].name == nombre) {
            var nombreBien = document.getElementById("nombreBien");
            nombreBien.style.visibility = "visible";
          }
        }

        if (find == false) {
          onClickBotonCrear();
          const data = {
            name: nombre,
            CI: CI,
            annoCurso: anno,
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
                "http://localhost:3000/api/v2/user/" +
                nameN[0] +
                "/" +
                CI +
                "/" +
                tipo;

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
      })
      .finally(() => {
        quitarDivCrear();
      });
  } else {
    $("#modalCrear").modal("hide");
    $("#internet").modal("show");
  }
}
