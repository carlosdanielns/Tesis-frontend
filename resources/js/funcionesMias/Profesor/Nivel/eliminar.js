const temaIdDelete = JSON.parse(localStorage.getItem("temaId"));

function eliminar(id) {
  const token = JSON.parse(localStorage.getItem("token"));
  const urlNivel = "http://localhost:3000/api/v2/nivel/";
  fetch(urlNivel + id, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resGetById) => resGetById.json())
    .then((resGetById) => {
      if (resGetById.preguntas.length == 0) {
        $("#eliminado").modal({
          backdrop: "static",
          keyboard: false,
        });
        $("#eliminado").modal("show");
        quitarDivEliminar();
        localStorage.setItem("id", JSON.stringify(id));
      } else {
        $("#eliminadoPreguntas").modal({
          backdrop: "static",
          keyboard: false,
        });
        $("#eliminadoPreguntas").modal("show");
        quitarDivEliminarPregunta();
        localStorage.setItem("id", JSON.stringify(id));
      }
    });
}

function eliminarCorrecto() {
  var id = JSON.parse(localStorage.getItem("id"));
  const token = JSON.parse(localStorage.getItem("token"));
  const urlNivel = "http://localhost:3000/api/v2/nivel/";
  const urlTema = "http://localhost:3000/api/v2/tema/";
  const urlPregunta = "http://localhost:3000/api/v2/pregunta/";

  fetch(urlNivel + id, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resGetById) => resGetById.json())
    .then((resGetById) => {
      if (resGetById.preguntas.length == 0) {
        onClickBotonEliminar();
        fetch(urlNivel + id, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resDeleteNivel) => resDeleteNivel.json())
          .then((resDeleteNivel) => {
            fetch(urlTema + temaIdDelete.id + "/nivel/" + id, {
              method: "delete",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json, text/plain, */*",
                Authorization: `Bearer ${token}`,
              },
            })
              .then((resDeleteTemaNivel) => resDeleteTemaNivel.json())
              .then((resDeleteTemaNivel) => {
                if (
                  resDeleteTemaNivel.status == 401 ||
                  resDeleteTemaNivel.statusCode == 401
                ) {
                  $("#modal401").modal({
                    backdrop: "static",
                    keyboard: false,
                  });
                  $("#modal401").modal("show");
                }
              })
              .finally(() => {
                quitarDivEliminar;
                location.replace("/nivel/listado");
              });
          });
      } else if (resGetById.preguntas.length != 0) {
        for (let i = 0; i < resGetById.preguntas.length; i++) {
          onClickBotonEliminarPregunta();
          fetch(urlNivel + id + "/pregunta/" + resGetById.preguntas[i]._id, {
            method: "delete",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json, text/plain, */*",
              Authorization: `Bearer ${token}`,
            },
          })
            .then((resDeletePreguntaNivel) => resDeletePreguntaNivel.json())
            .then((resDeletePreguntaNivel) => {
              fetch(urlPregunta + resGetById.preguntas[i]._id, {
                method: "delete",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json, text/plain, */*",
                  Authorization: `Bearer ${token}`,
                },
              })
                .then((resDelete) => resDelete.json())
                .then((resDelete) => {});
            });
        }
        fetch(urlNivel + id, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resDeleteNivel) => resDeleteNivel.json())
          .then((resDeleteNivel) => {
            fetch(urlTema + temaIdDelete.id + "/nivel/" + id, {
              method: "delete",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json, text/plain, */*",
                Authorization: `Bearer ${token}`,
              },
            })
              .then((resDeleteTemaNivel) => resDeleteTemaNivel.json())
              .then((resDeleteTemaNivel) => {
                if (
                  resDeleteTemaNivel.status == 401 ||
                  resDeleteTemaNivel.statusCode == 401
                ) {
                  $("#modal401").modal({
                    backdrop: "static",
                    keyboard: false,
                  });
                  $("#modal401").modal("show");
                }
              })
              .finally(() => {
                quitarDivEliminarPregunta;
                location.replace("/nivel/listado");
              });
          });
      }
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

function onClickBotonEliminarPregunta() {
  var siPregunta = document.getElementById("siPregunta");
  var chargerEliminarPregunta = document.getElementById(
    "chargerEliminarPregunta"
  );

  chargerEliminarPregunta.style.visibility = "visible";
  chargerEliminarPregunta.style.opacity = "100";
  siPregunta.innerHTML = "";
  siPregunta.disabled = true;
}

function quitarDivEliminarPregunta() {
  var siPregunta = document.getElementById("siPregunta");
  var chargerEliminarPregunta = document.getElementById(
    "chargerEliminarPregunta"
  );

  chargerEliminarPregunta.style.visibility = "hidden";
  chargerEliminarPregunta.style.opacity = "0";
  siPregunta.innerHTML = "Sí";
  siPregunta.disabled = false;
}
