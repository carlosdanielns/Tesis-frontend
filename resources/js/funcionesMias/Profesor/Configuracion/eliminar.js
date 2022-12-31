const profesorDelete = JSON.parse(localStorage.getItem("asignatura"));

function eliminar(id) {
  $("#eliminado").modal({
    backdrop: "static",
    keyboard: false,
  });
  $("#eliminado").modal("show");
  quitarDivEliminar();
}

function eliminarCorrecto() {
  onClickBotonEliminar();
  const token = JSON.parse(localStorage.getItem("token"));
  const urlAsignatura = "http://localhost:3000/api/v2/asignatura/descripcion/";
  const url = "http://localhost:3000/api/v2/asignatura/";

  if (navigator.onLine) {
    server(urlAsignatura);
    server(url);

    fetch(urlAsignatura + profesorDelete, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */ /*",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resByDescripcion) => resByDescripcion.json())
      .then((resByDescripcion) => {
        var urlDeleteConfiguracion =
          "http://localhost:3000/api/v2/configuracion/";

        fetch(urlDeleteConfiguracion + resByDescripcion.configuracion[0]._id, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */ /*",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resEliminarConfiguracion) => resEliminarConfiguracion.json())
          .then((resEliminarConfiguracion) => {
            var idAsignatura = resByDescripcion._id;
            fetch(
              url +
                idAsignatura +
                "/configuracion/" +
                resByDescripcion.configuracion[0]._id,
              {
                method: "delete",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json, text/plain, */ /*",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
              .then((resDeleteConfAsignatura) => resDeleteConfAsignatura.json())
              .then((resDeleteConfAsignatura) => {
                if (
                  resDeleteConfAsignatura.status == 401 ||
                  resDeleteConfAsignatura.statusCode == 401
                ) {
                  $("#modal401").modal({
                    backdrop: "static",
                    keyboard: false,
                  });
                  $("#modal401").modal("show");
                }
              })
              .finally(() => {
                quitarDivEliminar();
                location.replace("/profesor/configuracion");
              });
          });
      });
  } else {
    $("#eliminado").modal("hide");
    $("#internet").modal("show");
  }
}

function onClickBotonEliminar() {
  var boton = document.getElementById("si");
  var chargerEliminar = document.getElementById("chargerEliminar");

  chargerEliminar.style.visibility = "visible";
  chargerEliminar.style.opacity = "100";
  boton.innerHTML = "";
  boton.disabled = true;
}

function quitarDivEliminar() {
  var boton = document.getElementById("si");
  var chargerEliminar = document.getElementById("chargerEliminar");

  chargerEliminar.style.visibility = "hidden";
  chargerEliminar.style.opacity = "0";
  boton.innerHTML = "Sí";
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
