const configuracionModificar = JSON.parse(localStorage.getItem("asignatura"));

function cargarModal() {
  var imagenBienUpdate = document.getElementById("imagenBienUpdate");
  imagenBienUpdate.style.visibility = "hidden";

  var comboBienUpdate = document.getElementById("comboBienUpdate");
  comboBienUpdate.style.visibility = "hidden";

  var sonidoBienUpdate = document.getElementById("sonidoBienUpdate");
  sonidoBienUpdate.style.visibility = "hidden";

  var imageSelectedUpdate = document.getElementById("imageSelectedUpdate");
  imageSelectedUpdate.style.visibility = "hidden";

  $("#modalUpdate").modal({ backdrop: "static", keyboard: false });
  $("#modalUpdate").modal("show");
  quitarDivModificar();
}

function validarExtensionArchivoUpdate() {
  var fileInput = document.getElementById("fotoUpdate");
  console.log(fileInput);
  var filePath = fileInput.value;
  var allowedExtensions = /\.(jpg|jpeg|png)$/i;
  if (!allowedExtensions.exec(filePath)) {
    var imagenMalUpdate = document.getElementById("imagenMalUpdate");
    imagenMalUpdate.style.visibility = "visible";

    fileInput.value = "";
    return false;
  } else {
    var imagenMalUpdate = document.getElementById("imagenMalUpdate");
    imagenMalUpdate.style.visibility = "hidden";
    return true;
  }
}

function validarExtensionArchivoSonidoUpdate() {
  var fileInput = document.getElementById("sonidoUpdate");
  console.log(fileInput);
  var filePath = fileInput.value;
  var allowedExtensions = /(\.wav|\.mp3)$/i;
  if (!allowedExtensions.exec(filePath)) {
    var sonidoMalUpdate = document.getElementById("sonidoMalUpdate");
    sonidoMalUpdate.style.visibility = "visible";

    fileInput.value = "";
    return false;
  } else {
    var sonidoMalUpdate = document.getElementById("sonidoMalUpdate");
    sonidoMalUpdate.style.visibility = "hidden";
    return true;
  }
}

function imageChangedUpdate() {
  let selector = document.querySelector("#iconoUpdate");
  let seleccioneIcono = selector.options[selector.selectedIndex].text;

  if (seleccioneIcono == "Seleccione un icono") {
    var imageSelectedUpdate = document.getElementById("imageSelectedUpdate");
    imageSelectedUpdate.style.visibility = "hidden";
  } else {
    var imageSelectedUpdate = document.getElementById("imageSelectedUpdate");
    imageSelectedUpdate.style.visibility = "visible";

    console.log("aqui");
    var comboBienUpdate = document.getElementById("comboBienUpdate");
    comboBienUpdate.style.visibility = "hidden";

    let divImage = document.querySelector("#imageSelectedUpdate");
    let selectedOption = selector.options[selector.selectedIndex];
    let image = selectedOption.getAttribute("meta-img");

    divImage.innerHTML = "<img src='" + image + "' style='width:100px;'>";
  }
}
imageChangedUpdate();
function update(id, imagen, icono, sonido) {
  cargarModal();

  updateConfiguracion(id, imagen, icono, sonido);
}

function updateConfiguracion(id, imagen, iconoBD, sonidoBD) {
  $("#formularioUpdate").on("submit", function (e) {
    e.preventDefault();

    let selector = document.querySelector("#iconoUpdate");
    let selectedOption = selector.options[selector.selectedIndex].text;
    let selectedOptionIcono = selector.options[selector.selectedIndex];

    var icono;

    if (selectedOption == "Seleccione un icono") {
      var comboMalUpdate = document.getElementById("comboMalUpdate");
      comboMalUpdate.style.visibility = "visible";
      return;
    } else {
      icono = selectedOptionIcono;
    }
    var foto = $("#fotoUpdate")[0].files[0];

    console.log(icono);
    var sonido = $("#sonidoUpdate")[0].files[0];
    modificarConfiguracion(foto, sonido, icono.id);
  });

  function modificarConfiguracion(foto, sonido, icono) {
    onClickBotonModificar();
    const urlConfiguracion = "http://localhost:3000/api/v2/configuracion/";
    const urlAsignatura =
      "http://localhost:3000/api/v2/asignatura/descripcion/";
    let token = JSON.parse(localStorage.getItem("token"));

    if (navigator.onLine) {
      server(urlAsignatura);
      server(urlConfiguracion);

      fetch(urlAsignatura + configuracionModificar, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resFindByDescripcion) => resFindByDescripcion.json())
        .then((resFindByDescripcion) => {
          if (resFindByDescripcion.configuracion.length != 0) {
            eliminarUpdate(
              token,
              urlConfiguracion,
              resFindByDescripcion.configuracion[0]._id,
              resFindByDescripcion._id
            );
          }

          var formDataUpdate = new FormData();

          var iconoNew;
          if (icono == iconoBD) {
            iconoNew = icono;
          } else if (icono != iconoBD) {
            iconoNew = icono;
          } else if (
            icono == "Certificate.svg" &&
            iconoBD != "Certificate.svg"
          ) {
            iconoNew = iconoBD;
          }
          formDataUpdate.append("file", foto);
          formDataUpdate.append("icono", iconoNew);

          fetch(urlConfiguracion, {
            method: "post",
            body: formDataUpdate,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((resCreate) => resCreate.json())
            .then((resCreate) => {
              const urlSonido =
                "http://localhost:3000/api/v2/sonido/" + resCreate._id;
              var formDataSonidoUpdate = new FormData();

              formDataSonidoUpdate.append("file", sonido);

              fetch(urlSonido, {
                method: "put",
                body: formDataSonidoUpdate,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
                .then((resUpdate) => resUpdate.json())
                .then((resUpdate) => {
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
                      quitarDivModificar();
                      location.replace("/profesor/configuracion");
                    });
                });
            });
        });
    } else {
      $("#modalUdpate").modal("hide");
      $("#internet").modal("show");
    }
  }
}

function eliminarUpdate(
  token,
  urlConfiguracion,
  configuracionId,
  asignaturaID
) {
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
        Accept: "application/json, text/plain, */ /*",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resEliminarConfiguracion) => resEliminarConfiguracion.json())
      .then((resEliminarConfiguracion) => {
        var urlAsignatura =
          "http://localhost:3000/api/v2/asignatura/" +
          asignaturaID +
          "/configuracion/" +
          configuracionId;

        fetch(urlAsignatura, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */ /*",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resDelete) => resDelete.json())
          .then((resDelete) => {
            if (resDelete.status == 401 || resDelete.statusCode == 401) {
              $("#modal401").modal({
                backdrop: "static",
                keyboard: false,
              });
              $("#modal401").modal("show");
            } else if (resDelete.status != 500 || resDelete.statusCode != 500) {
            }
          });
      });
  } else {
    $("#modalCrear").modal("hide");
    $("#internet").modal("show");
  }
}

function onClickBotonModificar() {
  var boton = document.getElementById("botonModificar");
  boton.innerHTML = "  Procesando...";
  boton.disabled = true;
  var chargerModificar = document.getElementById("chargerModificar");
  chargerModificar.style.visibility = "visible";
  chargerModificar.style.opacity = "100";
}

function quitarDivModificar() {
  var imagenMalUpdate = document.getElementById("imagenMalUpdate");
  imagenMalUpdate.style.visibility = "hidden";

  var comboMalUpdate = document.getElementById("comboMalUpdate");
  comboMalUpdate.style.visibility = "hidden";

  var sonidoMalUpdate = document.getElementById("sonidoMalUpdate");
  sonidoMalUpdate.style.visibility = "hidden";

  var boton = document.getElementById("botonModificar");
  var chargerModificar = document.getElementById("chargerModificar");
  chargerModificar.style.visibility = "hidden";
  chargerModificar.style.opacity = "0";
  boton.innerHTML = "Modificar Configuración";
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
