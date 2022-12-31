const nivelDelete = JSON.parse(localStorage.getItem("nivelId"));

function eliminar(id) {
  $("#eliminado").modal({
    backdrop: "static",
    keyboard: false,
  });
  $("#eliminado").modal("show");
  quitarDivEliminar();

  localStorage.setItem("id", JSON.stringify(id));
}

function eliminarCorrecto() {
  onClickBotonEliminar();
  const token = JSON.parse(localStorage.getItem("token"));

  const urlPregunta = "http://localhost:3000/api/v2/pregunta/";
  const urlNivel = "http://localhost:3000/api/v2/nivel/";
  var id = JSON.parse(localStorage.getItem("id"));
  fetch(urlNivel + nivelDelete.id + "/pregunta/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resDeletePreguntaNivel) => resDeletePreguntaNivel.json())
    .then((resDeletePreguntaNivel) => {
      fetch(urlPregunta + id, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
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
          }
        })
        .finally(() => {
          quitarDivEliminar;
          location.replace("/pregunta/listado");
        });
    });
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
