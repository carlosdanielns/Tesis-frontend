function eliminar(id, CI) {
  $("#eliminado").modal({
    backdrop: "static",
    keyboard: false,
  });
  $("#eliminado").modal("show");
  quitarDivEliminar();
  localStorage.setItem("id", JSON.stringify(id));
  localStorage.setItem("CI", JSON.stringify(CI));
}

function eliminarCorrecto() {
  onClickBotonEliminar();
  var id = JSON.parse(localStorage.getItem("id"));
  var CI = JSON.parse(localStorage.getItem("CI"));
  const token = JSON.parse(localStorage.getItem("token"));
  const urlUser = "http://localhost:3000/api/v2/user/";

  if (navigator.onLine) {
    server(urlUser);

    fetch(urlUser, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resUserCI) => resUserCI.json())
      .then((resUserCI) => {
        var isExist = false;
        var posicionUser;
        for (let i = 0; i < resUserCI.length && isExist == false; i++) {
          if (CI == resUserCI[i].CI) {
            posicionUser = i;
            isExist == true;
          }
        }

        //TODO: este metoodo es para el eliminar el usuario
        const url =
          "http://localhost:3000/api/v2/user/" + resUserCI[posicionUser]._id;
        fetch(url, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resUserDelete) => resUserDelete.json())
          .then((resUserDelete) => {
            //TODO: metodo para eliminar el estudiante
            fetch("http://localhost:3000/api/v2/estudiante/" + id, {
              method: "delete",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json, text/plain, */*",
                Authorization: `Bearer ${token}`,
              },
            })
              .then((resEstudianteDelete) => resEstudianteDelete.json())
              .then((resEstudianteDelete) => {
                if (
                  resEstudianteDelete.status == 401 ||
                  resEstudianteDelete.statusCode == 401
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
                location.replace("/estudiante/listado");
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
  boton.innerHTML = "S??";
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
