function eliminar(id, rol) {
  const token = JSON.parse(localStorage.getItem("token"));
  const urlUserRol = "http://localhost:3000/api/v2/user/rol/";
  if (rol == "Administrador") {
    fetch(urlUserRol + "Administrador", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resCantidadAdmin) => resCantidadAdmin.json())
      .then((resCantidadAdmin) => {
        if (resCantidadAdmin == 1) {
          $("#eliminarAdministrador").modal({
            backdrop: "static",
            keyboard: false,
          });
          $("#eliminarAdministrador").modal("show");
        } else {
          $("#eliminado").modal({
            backdrop: "static",
            keyboard: false,
          });
          $("#eliminado").modal("show");
          quitarDivEliminar();
        }
      });
  } else {
    $("#eliminado").modal({
      backdrop: "static",
      keyboard: false,
    });
    $("#eliminado").modal("show");
    quitarDivEliminar();
  }

  localStorage.setItem("id", JSON.stringify(id));
}

function eliminarCorrecto() {
  onClickBotonEliminar();
  const token = JSON.parse(localStorage.getItem("token"));
  var id = JSON.parse(localStorage.getItem("id"));
  //TODO:Este metodo es para obtener todos los estudiante y guardar el seleccionado
  const urlUser = "http://localhost:3000/api/v2/user/";

  if (navigator.onLine) {
    server(urlUser);

    fetch(urlUser + id, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resDeleteUsuario) => resDeleteUsuario.json())
      .then((resDeleteUsuario) => {
        if (
          resDeleteUsuario.status == 401 ||
          resDeleteUsuario.statusCode == 401
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
        location.replace("/usuario/listado");
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
