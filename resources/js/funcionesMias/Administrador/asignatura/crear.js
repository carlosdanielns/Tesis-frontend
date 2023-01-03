const expresiones = {
  descripcion: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
};

const campos = {
  descripcion: false,
};

//Abrir modal Crear
function abrirModalCrear() {
  $("#modalCrear").modal({ backdrop: "static", keyboard: false });
  $("#modalCrear").modal("show");
  var descripcionBien = document.getElementById("descripcionBien");
  descripcionBien.style.visibility = "hidden";
  quitarDivCrear();
}
//Fin modal Crear

function borrarCreate() {
  var comboMal = document.getElementById("comboMal");
  comboMal.style.visibility = "hidden";
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("formularioCreate")
    .addEventListener("submit", agregarAsignatura);
});

function agregarAsignatura(e) {
  e.preventDefault();
  const urlAsignatura = "http://localhost:3000/api/v2/asignatura";

  if (navigator.onLine) {
    server(urlAsignatura);
    var newDescripcion = $("#descripcion");

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

    if (!expresiones.descripcion.test(newDescripcion.val())) {
      var descripcionMal = document.getElementById("descripcionMal");
      descripcionMal.style.visibility = "visible";
      return;
    }

    agregar(newDescripcion.val(), newAnno);
  } else {
    $("#modalCrear").modal("hide");
    $("#internet").modal("show");
  }
}

function onClickBotonCrear() {
  var boton = document.getElementById("botonInsertar");
  var chargerInsertar = document.getElementById("chargerInsertar");
  chargerInsertar.style.visibility = "visible";
  chargerInsertar.style.opacity = "100";
  boton.innerHTML = "Procesando...";
  boton.disabled = true;
}

function quitarDivCrear() {
  var descripcionMal = document.getElementById("descripcionMal");
  descripcionMal.style.visibility = "hidden";
  var comboBien = document.getElementById("comboBien");
  comboBien.style.visibility = "hidden";
  var comboMal = document.getElementById("comboMal");
  comboMal.style.visibility = "hidden";

  var boton = document.getElementById("botonInsertar");
  var chargerInsertar = document.getElementById("chargerInsertar");
  chargerInsertar.style.visibility = "hidden";
  chargerInsertar.style.opacity = "0";
  boton.innerHTML = "Insertar Asignatura";
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
    case "descripcion":
      validarCampo(expresiones.descripcion, e.target, "descripcion");
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  var descripcionMal = document.getElementById("descripcionMal");
  var descripcionBien = document.getElementById("descripcionBien");
  descripcionBien.style.visibility = "hidden";
  descripcionMal.style.visibility = "hidden";

  if (expresion.test(input.value)) {
    campos[campo] = true;
  } else {
    descripcionMal.style.visibility = "visible";
    campos[campo] = false;
  }
};

const inputs = document.querySelectorAll("#formularioCreate input");

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
});

function agregar(descripcion, anno) {
  const urlAsignatura = "http://localhost:3000/api/v2/asignatura";
  let token = JSON.parse(localStorage.getItem("token"));
  onClickBotonCrear();

  if (navigator.onLine) {
    server(urlAsignatura);
    fetch(urlAsignatura, {
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
          if (res[j].descripcion == descripcion && res[j].anno == anno) {
            var descripcionBien = document.getElementById("descripcionBien");
            descripcionBien.style.visibility = "visible";
            find = true;
          }
        }

        if (find == false) {
          onClickBotonCrear();

          const data = {
            descripcion: descripcion,
            anno: anno,
          };

          fetch(urlAsignatura, {
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
              location.replace("/asignatura/listado");
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
