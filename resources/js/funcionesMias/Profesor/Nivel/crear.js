const expresiones = {
  descripcion: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
};

const campos = {
  descripcion: false,
};

const temaCrear = JSON.parse(localStorage.getItem("temaId"));

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

  var descripcionBien = document.getElementById("descripcionBien");
  descripcionBien.style.visibility = "hidden";
  var notaBien = document.getElementById("notaBien");
  notaBien.style.visibility = "hidden";
  var timepoDuracionBien = document.getElementById("timepoDuracionBien");
  timepoDuracionBien.style.visibility = "hidden";
  quitarDivCrear();
}
//Fin modal Crear

//Crear Nivel
$("#formularioCreate").on("submit", function (e) {
  e.preventDefault();
  const url = "http://localhost:3000/api/v2/nivel/";

  if (navigator.onLine) {
    server(url);
    var newDescripcion = $("#descripcion");
    var newNota5 = $("#nota5");
    var newtiempoDuracion = $("#tiempoDuracion");

    if (!expresiones.descripcion.test(newDescripcion.val())) {
      var descripcionMal = document.getElementById("descripcionMal");
      descripcionMal.style.visibility = "visible";
      return;
    }

    agregar(newDescripcion.val(), newNota5.val(), newtiempoDuracion.val());
  } else {
    $("#modalCrear").modal("hide");
    $("#internet").modal("show");
  }
});

function agregar(descripcion, nota5, tiempoDuracion) {
  const url = "http://localhost:3000/api/v2/nivel/";
  let token = JSON.parse(localStorage.getItem("token"));

  onClickBotonCrear();

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
        var find = false;
        for (let j = 0; j < res.length && find == false; j++) {
          if (
            res[j].descripcion == descripcion &&
            res[j].nota5 == nota5 &&
            res[j].tiempoDuracion == tiempoDuracion
          ) {
            var descripcionBien = document.getElementById("descripcionBien");
            descripcionBien.style.visibility = "visible";
            var notaBien = document.getElementById("notaBien");
            notaBien.style.visibility = "visible";
            var timepoDuracionBien =
              document.getElementById("timepoDuracionBien");
            timepoDuracionBien.style.visibility = "visible";
            find = true;
          }
        }

        if (find == false) {
          onClickBotonCrear();
          var data = {
            descripcion: descripcion,
            nota5: nota5,
            tiempoDuracion: tiempoDuracion,
          };

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
                  if (
                    resAddNivel.status == 401 ||
                    resAddNivel.statusCode == 401
                  ) {
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
        }
      })
      .finally(() => {
        quitarDivCrear();
      });
  }
}

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
  var descripcionMal = document.getElementById("descripcionMal");
  descripcionMal.style.visibility = "hidden";

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
  console.log(e);
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

  var descripcionBien = document.getElementById("descripcionBien");
  descripcionBien.style.visibility = "hidden";
  var notaBien = document.getElementById("notaBien");
  notaBien.style.visibility = "hidden";
  var timepoDuracionBien = document.getElementById("timepoDuracionBien");
  timepoDuracionBien.style.visibility = "hidden";

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
