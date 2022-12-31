const configuracionModificar = JSON.parse(localStorage.getItem("asignatura"));

function cargarModal() {
  $("#modalUpdate").modal({ backdrop: "static", keyboard: false });
  $("#modalUpdate").modal("show");
  quitarDivModificar();
}

function imageChangedUpdate() {
  let selector = document.querySelector("#iconoUpdate");
  let divImage = document.querySelector("#imageSelectedUpdate");
  let selectedOption = selector.options[selector.selectedIndex];
  let image = selectedOption.getAttribute("meta-img");

  divImage.innerHTML = "<img src='" + image + "' style='width:100px;'>";
}

function update(id, imagen, icono, sonido) {
  cargarModal();
  imageChangedUpdate();
  updateConfiguracion(id, imagen, icono, sonido);
}

function updateConfiguracion(id, imagen, iconoBD, sonidoBD) {
  console.log("id" + id);
  console.log("imagenBD" + imagen);
  console.log("iconoBD" + iconoBD);
  console.log("sonidoBD" + sonidoBD);

  $("#formularioUpdate").on("submit", function (e) {
    e.preventDefault();
    onClickBotonModificar();
    let selector = document.querySelector("#iconoUpdate");
    let selectedOption = selector.options[selector.selectedIndex];

    var foto = $("#fotoUpdate")[0].files[0];
    var icono = selectedOption;
    console.log(icono);
    var sonido = $("#sonidoUpdate")[0].files[0];
    modificarConfiguracion(foto, sonido, icono.id);
  });

  function modificarConfiguracion(foto, sonido, icono) {
    const urlConfiguracion = "http://localhost:3000/api/v2/configuracion/";
    const urlAsignatura =
      "http://localhost:3000/api/v2/asignatura/descripcion/";
    let token = JSON.parse(localStorage.getItem("token"));

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
        } else if (icono == "Certificate.svg" && iconoBD != "Certificate.svg") {
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
  var boton = document.getElementById("botonModificar");
  var chargerModificar = document.getElementById("chargerModificar");
  chargerModificar.style.visibility = "hidden";
  chargerModificar.style.opacity = "0";
  boton.innerHTML = "Modificar Configuración";
  boton.disabled = false;
}
