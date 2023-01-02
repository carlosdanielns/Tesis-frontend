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

window.addEventListener("load", cargar);

function cargar() {
  const url = "http://localhost:3000/api/v2/asignatura";
  let token = JSON.parse(localStorage.getItem("token"));

  if (navigator.onLine) {
    server(url);
    fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        var select = document.getElementById("asignatura"); //Seleccionamos el select
        for (var i = 0; i < res.length; i++) {
          var option = document.createElement("option"); //Creamos la opcion
          option.innerHTML = res[i].descripcion; //Metemos el texto en la opción
          select.appendChild(option); //Metemos la opción en el select
        }
      });
  } else {
    $("#modalCrear").modal("hide");
    $("#internet").modal("show");
  }
}

$("#formularioCreate").on("submit", function (e) {
  e.preventDefault();

  const urlProfesor = "http://localhost:3000/api/v2/profesor";

  if (navigator.onLine) {
    server(urlProfesor);

    var newNombre = $("#nombre");
    var newCI = $("#CI");
    var newAsignatura;

    const selectElement = document.getElementById("asignatura");
    selectElement.addEventListener("onchange", asignatura());

    function asignatura() {
      newAsignatura = selectElement.options[selectElement.selectedIndex].text;
    }

    if (newAsignatura == "Seleccione una asignatura") {
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

    agregar(newNombre.val(), newCI.val(), newAsignatura);
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

  var nombreBien = document.getElementById("nombreBien");
  nombreBien.style.visibility = "hidden";
  var CIBien = document.getElementById("CIBien");
  CIBien.style.visibility = "hidden";

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

function agregar(nombre, CI, asignatura) {
  onClickBotonCrear();
  const urlProfesor = "http://localhost:3000/api/v2/profesor";
  let token = JSON.parse(localStorage.getItem("token"));

  if (navigator.onLine) {
    server(urlProfesor);
    fetch(urlProfesor, {
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
            console.log(CIBien);
            CIBien.style.visibility = "visible";
            console.log("entro en CI");
            find = true;
          } else if (res[j].name == nombre) {
            var nombreBien = document.getElementById("nombreBien");
            nombreBien.style.visibility = "visible";
            find = true;
          }
        }

        if (find == false) {
          onClickBotonCrear();
          const data = {
            name: nombre,
            CI: CI,
            asignatura: asignatura,
          };

          fetch(urlProfesor, {
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
              console.log(res);
              const CI = res.CI;
              const name = res.name;
              var nameSplit = name.split(" ");
              const tipo = "Profesor";
              const urlUser =
                "http://localhost:3000/api/v2/user/" +
                nameSplit[0] +
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
                  location.replace("/profesor/listado");
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
