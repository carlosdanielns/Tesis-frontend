function eliminar(id) {
  const token = JSON.parse(localStorage.getItem("token"));
  const urlTema = "http://localhost:3000/api/v2/tema/";
  fetch(urlTema + id, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resGetById) => resGetById.json())
    .then((resGetById) => {
      if (resGetById.niveles.length == 0) {
        $("#eliminado").modal({
          backdrop: "static",
          keyboard: false,
        });
        $("#eliminado").modal("show");
        quitarDivEliminar();
        localStorage.setItem("id", JSON.stringify(id));
      } else {
        $("#eliminadoNivel").modal({
          backdrop: "static",
          keyboard: false,
        });
        $("#eliminadoNivel").modal("show");
        quitarDivEliminarNivel();
        localStorage.setItem("id", JSON.stringify(id));
      }
    });
}

function eliminarCorrecto() {
  var id = JSON.parse(localStorage.getItem("id"));
  const token = JSON.parse(localStorage.getItem("token"));
  const urlTema = "http://localhost:3000/api/v2/tema/";
  const urlAsignatura = "http://localhost:3000/api/v2/asignatura/";
  const urlAsignaturaDescripcion =
    "http://localhost:3000/api/v2/asignatura/descripcion/";
    const urlProfesor = "http://localhost:3000/api/v2/profesor/";

  fetch(urlProfesor + usuario.CI, {
    method: "get",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resByCI) => resByCI.json())
    .then((resByCI) => {
      fetch(urlAsignaturaDescripcion + resByCI.asignatura, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resGetByDescripcion) => resGetByDescripcion.json())
        .then((resGetByDescripcion) => {
          fetch(urlTema + id, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json, text/plain, */*",
              Authorization: `Bearer ${token}`,
            },
          })
            .then((resGetById) => resGetById.json())
            .then((resGetById) => {
              if (resGetById.niveles.length == 0) {
                onClickBotonEliminar();
                fetch(urlTema + id, {
                  method: "delete",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json, text/plain, */*",
                    Authorization: `Bearer ${token}`,
                  },
                })
                  .then((resDeleteTema) => resDeleteTema.json())
                  .then((resDeleteTema) => {
                    fetch(
                      urlAsignatura + resGetByDescripcion._id + "/tema/" + id,
                      {
                        method: "delete",
                        headers: {
                          "Content-Type": "application/json",
                          Accept: "application/json, text/plain, */*",
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    )
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
                        location.replace("/tema/listado");
                      });
                  });
              } else if (resGetById.niveles.length != 0) {
                onClickBotonEliminarNivel();
                var urlPregunta = "http://localhost:3000/api/v2/pregunta/";
                var urlNivel = "http://localhost:3000/api/v2/nivel/";
                for (let i = 0; i < resGetById.niveles.length; i++) {
                  if (resGetById.niveles[i].preguntas.length != 0) {
                    for (
                      let j = 0;
                      j < resGetById.niveles[i].preguntas.length;
                      j++
                    ) {
                      fetch(
                        urlPregunta + resGetById.niveles[i].preguntas[j]._id,
                        {
                          method: "delete",
                          headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json, text/plain, */*",
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      )
                        .then((resDeletePregunta) => resDeletePregunta.json())
                        .then((resDeletePregunta) => {
                          fetch(
                            urlNivel +
                              resGetById.niveles[i]._id +
                              "/pregunta/" +
                              resGetById.niveles[i].preguntas[j]._id,
                            {
                              method: "delete",
                              headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json, text/plain, */*",
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          )
                            .then((resDeleteNivelPregunta) =>
                              resDeleteNivelPregunta.json()
                            )
                            .then((resDeleteNivelPregunta) => {});
                        });
                    }
                  }
                  fetch(urlNivel + resGetById.niveles[i]._id, {
                    method: "delete",
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json, text/plain, */*",
                      Authorization: `Bearer ${token}`,
                    },
                  })
                    .then((resDeleteNivel) => resDeleteNivel.json())
                    .then((resDeleteNivel) => {
                      fetch(
                        urlTema + id + "/nivel/" + resGetById.niveles[i]._id,
                        {
                          method: "delete",
                          headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json, text/plain, */*",
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      )
                        .then((resDeleteNivelTema) => resDeleteNivelTema.json())
                        .then((resDeleteNivelTema) => {});
                    });
                }
                fetch(urlTema + id, {
                  method: "delete",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json, text/plain, */*",
                    Authorization: `Bearer ${token}`,
                  },
                })
                  .then((resDeleteTema) => resDeleteTema.json())
                  .then((resDeleteTema) => {
                    fetch(
                      urlAsignatura + resGetByDescripcion._id + "/tema/" + id,
                      {
                        method: "delete",
                        headers: {
                          "Content-Type": "application/json",
                          Accept: "application/json, text/plain, */*",
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    )
                      .then((resDeleteTema) => resDeleteTema.json())
                      .then((resDeleteTema) => {
                        if (
                          resDeleteTema.status == 401 ||
                          resDeleteTema.statusCode == 401
                        ) {
                          $("#modal401").modal({
                            backdrop: "static",
                            keyboard: false,
                          });
                          $("#modal401").modal("show");
                        }
                      })
                      .finally(() => {
                        quitarDivEliminarNivel;
                        location.replace("/tema/listado");
                      });
                  });
              }
            });
        });
    });
}

//Fin Eliminar Temas

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

function onClickBotonEliminarNivel() {
  var siNivel = document.getElementById("siNivel");
  var chargerEliminarNivel = document.getElementById("chargerEliminarNivel");

  chargerEliminarNivel.style.visibility = "visible";
  chargerEliminarNivel.style.opacity = "100";
  siNivel.innerHTML = "";
  siNivel.disabled = true;
}

function quitarDivEliminarNivel() {
  var siNivel = document.getElementById("siNivel");
  var chargerEliminarNivel = document.getElementById("chargerEliminarNivel");

  chargerEliminarNivel.style.visibility = "hidden";
  chargerEliminarNivel.style.opacity = "0";
  siNivel.innerHTML = "Sí";
  siNivel.disabled = false;
}
