const expresiones = {
  descripcion: /^[a-zA-ZÀ-ÿ\sZ0-9\_\-]{1,40}$/, // Letras y espacios, pueden llevar acentos.
};

const campos = {
  descripcion: false,
};

const asiganturaCrear = JSON.parse(localStorage.getItem("asignatura"));

//Abrir modal Crear
function abrirModalCrear() {
  $("#modalCrear").modal({ backdrop: "static", keyboard: false });
  $("#modalCrear").modal("show");
  var descripcionBien = document.getElementById("descripcionBien");
  descripcionBien.style.visibility = "hidden";
  quitarDivCrear();
}
//Fin modal Crear

//Crear Temas
$("#formularioCreate").on("submit", function (e) {
  e.preventDefault();
  const url = "http://localhost:3000/api/v2/tema/";
  var urlAsignatura = "http://localhost:3000/api/v2/asignatura/descripcion/";

  if (navigator.onLine) {
    server(url);
    server(urlAsignatura);

    var newDescripcion = $("#descripcion");

    if (!expresiones.descripcion.test(newDescripcion.val())) {
      var descripcionMal = document.getElementById("descripcionMal");
      descripcionMal.style.visibility = "visible";
      return;
    }

    agregar(newDescripcion.val());
  } else {
    $("#modalCrear").modal("hide");
    $("#internet").modal("show");
  }
});

function agregar(descripcion) {
  const url = "http://localhost:3000/api/v2/tema/";
  var urlAsignatura = "http://localhost:3000/api/v2/asignatura/descripcion/";

  let token = JSON.parse(localStorage.getItem("token"));

  onClickBotonCrear();

  if (navigator.onLine) {
    server(url);
    server(urlAsignatura);

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
              if (res[j].descripcion == descripcion) {
                var descripcionBien =
                  document.getElementById("descripcionBien");
                descripcionBien.style.visibility = "visible";
                find = true;
              }
            }

            if (find == false) {
              onClickBotonCrear();
              var data = { descripcion: descripcion };

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
            }
          })
          .finally(() => {
            quitarDivCrear();
          });
      });
  }
}
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
  var descripcionMal = document.getElementById("descripcionMal");
  descripcionMal.style.visibility = "hidden";

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
