const configuracionCrear = JSON.parse(localStorage.getItem("asignatura"));
console.log(configuracionCrear);

//Abrir modal Crear
function abrirModalCrear() {
  var imagenBien = document.getElementById("imagenBien");
  imagenBien.style.visibility = "hidden";

  var comboBien = document.getElementById("comboBien");
  comboBien.style.visibility = "hidden";

  var sonidoBien = document.getElementById("sonidoBien");
  sonidoBien.style.visibility = "hidden";

  var imageSelected = document.getElementById("imageSelected");
  imageSelected.style.visibility = "hidden";

  $("#modalCrear").modal({ backdrop: "static", keyboard: false });
  $("#modalCrear").modal("show");
  quitarDivCrear();
}
//Fin modal Crear

function validarExtensionArchivo() {
  var fileInput = document.getElementById("foto");
  console.log(fileInput);
  var filePath = fileInput.value;
  var allowedExtensions = /\.(jpg|jpeg|png)$/i;
  if (!allowedExtensions.exec(filePath)) {
    var imagenMal = document.getElementById("imagenMal");
    imagenMal.style.visibility = "visible";

    fileInput.value = "";
    return false;
  } else {
    var imagenMal = document.getElementById("imagenMal");
    imagenMal.style.visibility = "hidden";
    return true;
  }
}

function validarExtensionArchivoSonido() {
  var fileInput = document.getElementById("sonido");
  console.log(fileInput);
  var filePath = fileInput.value;
  var allowedExtensions = /(\.wav|\.mp3)$/i;
  if (!allowedExtensions.exec(filePath)) {
    var sonidoMal = document.getElementById("sonidoMal");
    sonidoMal.style.visibility = "visible";

    fileInput.value = "";
    return false;
  } else {
    var sonidoMal = document.getElementById("sonidoMal");
    sonidoMal.style.visibility = "hidden";
    return true;
  }
}

function imageChanged() {
  let selector = document.querySelector("#icono");
  let seleccioneIcono = selector.options[selector.selectedIndex].text;

  if (seleccioneIcono == "Seleccione un icono") {
    var imageSelected = document.getElementById("imageSelected");
    imageSelected.style.visibility = "hidden";
  } else {
    var imageSelected = document.getElementById("imageSelected");
    imageSelected.style.visibility = "visible";

    var comboBien = document.getElementById("comboBien");
    comboBien.style.visibility = "hidden";

    console.log(selector);
    let divImage = document.querySelector("#imageSelected");
    let selectedOption = selector.options[selector.selectedIndex];

    let image = selectedOption.getAttribute("meta-img");

    divImage.innerHTML = "<img src='" + image + "' style='width:100px;'>";
  }
}
imageChanged();

$("#formularioCreate").on("submit", function (e) {
  e.preventDefault();
  let selector = document.querySelector("#icono");
  let selectedOption = selector.options[selector.selectedIndex].text;
  let selectedOptionIcono = selector.options[selector.selectedIndex];
  console.log(selectedOption);
  var icono;

  if (selectedOption == "Seleccione un icono") {
    var comboMal = document.getElementById("comboMal");
    comboMal.style.visibility = "visible";
    return;
  } else {
    icono = selectedOptionIcono;
  }

  var foto = $("#foto")[0].files[0];

  var sonido = $("#sonido")[0].files[0];

  if (foto == undefined && sonido == undefined) {
    crearConfiguracion("", "", icono.id);
  } else if (foto == undefined) {
    crearConfiguracion("", sonido, icono.id);
  } else if (sonido == undefined) {
    crearConfiguracion(foto, "", icono.id);
  } else crearConfiguracion(foto, sonido, icono.id);
});

function crearConfiguracion(foto, sonido, icono) {
  onClickBotonCrear();
  const urlConfiguracion = "http://localhost:3000/api/v2/configuracion/";
  const urlAsignatura = "http://localhost:3000/api/v2/asignatura/descripcion/";
  let token = JSON.parse(localStorage.getItem("token"));

  if (navigator.onLine) {
    server(urlAsignatura);
    server(urlConfiguracion);

    fetch(urlAsignatura + configuracionCrear, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resFindByDescripcion) => resFindByDescripcion.json())
      .then((resFindByDescripcion) => {
        if (resFindByDescripcion.configuracion.length != 0) {
          console.log("entro en el eliminar configuracion");
          eliminando(
            token,
            urlConfiguracion,
            resFindByDescripcion.configuracion[0]._id,
            resFindByDescripcion._id
          );
        }
        var formData = new FormData();
        console.log(foto);
        formData.append("file", foto);
        formData.append("icono", icono);

        fetch(urlConfiguracion, {
          method: "post",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resCreate) => resCreate.json())
          .then((resCreate) => {
            console.log(resCreate);
            const urlSonido =
              "http://localhost:3000/api/v2/sonido/" + resCreate._id;
            var formDataSonido = new FormData();
            formDataSonido.append("file", sonido);

            fetch(urlSonido, {
              method: "put",
              body: formDataSonido,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((resUpdate) => resUpdate.json())
              .then((resUpdate) => {
                console.log(resUpdate);
                var urlAsignatura =
                  "http://localhost:3000/api/v2/asignatura/" +
                  resFindByDescripcion._id +
                  "/configuracion/" +
                  resCreate._id;

                fetch(urlAsignatura, {
                  method: "post",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                  .then((resAgregarConfi) => resAgregarConfi.json())
                  .then((resAgregarConfi) => {
                    console.log(resAgregarConfi);
                    if (
                      resAgregarConfi.status == 401 ||
                      resAgregarConfi.statusCode == 401
                    ) {
                      $("#modal401").modal({
                        backdrop: "static",
                        keyboard: false,
                      });
                      $("#modal401").modal("show");
                    } else if (
                      resAgregarConfi.status != 401 ||
                      resAgregarConfi.statusCode != 401
                    ) {
                    }
                  })
                  .finally(() => {
                    quitarDivCrear();
                    location.replace("/profesor/configuracion");
                  });
              });
          });
      });
  } else {
    $("#modalCrear").modal("hide");
    $("#internet").modal("show");
  }
}

function eliminando(token, urlConfiguracion, configuracionId, asignaturaID) {
  console.log(token);
  console.log(urlConfiguracion);
  console.log(configuracionId);
  console.log(asignaturaID);

  if (navigator.onLine) {
    server(urlConfiguracion);
    fetch(urlConfiguracion + configuracionId, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resEliminarConfiguracion) => resEliminarConfiguracion.json())
      .then((resEliminarConfiguracion) => {
        console.log(resEliminarConfiguracion);
        var urlAsignatura =
          "http://localhost:3000/api/v2/asignatura/" +
          asignaturaID +
          "/configuracion/" +
          configuracionId;

        fetch(urlAsignatura, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resDelete) => resDelete.json())
          .then((resDelete) => {
            console.log(resDelete);
            if (resDelete.status == 401 || resDelete.statusCode == 401) {
              $("#modal401").modal({
                backdrop: "static",
                keyboard: false,
              });
              $("#modal401").modal("show");
            }
          });
      });
  } else {
    $("#modalCrear").modal("hide");
    $("#internet").modal("show");
  }
}

var formulario = document.getElementById("formularioCreate");
var close = document.getElementById("close");

close.addEventListener("click", function () {
  formulario.reset();
});

function onClickBotonCrear() {
  var boton = document.getElementById("botonInsertar");
  boton.innerHTML = "  Procesando...";
  boton.disabled = true;
  var chargerInsertar = document.getElementById("chargerInsertar");
  chargerInsertar.style.visibility = "visible";
  chargerInsertar.style.opacity = "100";
}

function quitarDivCrear() {
  var imagenMal = document.getElementById("imagenMal");
  imagenMal.style.visibility = "hidden";

  var comboMal = document.getElementById("comboMal");
  comboMal.style.visibility = "hidden";

  var sonidoMal = document.getElementById("sonidoMal");
  sonidoMal.style.visibility = "hidden";

  var boton = document.getElementById("botonInsertar");
  var chargerInsertar = document.getElementById("chargerInsertar");
  chargerInsertar.style.visibility = "hidden";
  chargerInsertar.style.opacity = "0";
  boton.innerHTML = "  Insertar Configuración";
  boton.disabled = false;
}

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
