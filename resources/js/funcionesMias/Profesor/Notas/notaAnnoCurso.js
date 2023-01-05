const usuario = JSON.parse(localStorage.getItem("usuario"));
const token = JSON.parse(localStorage.getItem("token"));
const asignatura = JSON.parse(localStorage.getItem("asignatura"));

function modalInformacion() {
  $("#modalInformacion").modal("show");
  var nombreUsuario = document.getElementById("nombreUsuario");
  var nombreAsigantura = document.getElementById("nombreAsigantura");
  if (nombreUsuario.innerHTML == "" && nombreAsigantura.innerHTML == "") {
    onClickModal();
    buscarProfesor();
  }
}

window.addEventListener("load", cargarDatos);

function cargarDatos() {
  const urlAsignatura = "http://localhost:3000/api/v2/asignatura/descripcion/";
  const urlNotas = "http://localhost:3000/api/v2/notas";
  const estudiantes = "http://localhost:3000/api/v2/estudiante";
  var urlProfesor = "http://localhost:3000/api/v2/profesor/";
  let token = JSON.parse(localStorage.getItem("token"));

  if (navigator.onLine) {
    server(urlAsignatura);
    server(urlNotas);
    server(estudiantes);
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
        fetch(urlAsignatura + resByCI.asignatura, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resGetAsignatura) => resGetAsignatura.json())
          .then((resGetAsignatura) => {
            console.log(resGetAsignatura);

            fetch(urlNotas, {
              method: "get",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json, text/plain, */*",
                Authorization: `Bearer ${token}`,
              },
            })
              .then((resGetNotas) => resGetNotas.json())
              .then((resGetNotas) => {
                fetch(estudiantes, {
                  method: "get",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json, text/plain, */*",
                    Authorization: `Bearer ${token}`,
                  },
                })
                  .then((resGetEstudiante) => resGetEstudiante.json())
                  .then((resGetEstudiante) => {
                    if (resGetNotas.length == 0) {
                      cargarDatosTabla(
                        resGetNotas,
                        resGetEstudiante,
                        resGetAsignatura
                      );
                    } else {
                      cargarDatosTablaConNotas(
                        resGetNotas,
                        resGetEstudiante,
                        resGetAsignatura
                      );
                    }
                  })
                  .finally(() => {
                    var divPrincipal = document.getElementById("divPrincipal");
                    var mainPrincipal =
                      document.getElementById("mainPrincipal");
                    var chargerTable = document.getElementById("chargerTable");

                    chargerTable.style.visibility = "hidden";
                    chargerTable.style.opacity = "0";
                    mainPrincipal.style.display = "block";
                    divPrincipal.style.display = "block";
                  });
              });
          });
      });
  } else {
    $("#internet").modal("show");
  }
}

function onClickModal() {
  var charger = document.getElementById("charger");
  charger.style.visibility = "visible";
  charger.style.opacity = "100";
}

function quitarDiv() {
  var charger = document.getElementById("charger");
  charger.style.visibility = "hidden";
  charger.style.opacity = "0";
}

function buscarProfesor() {
  var urlProfesor = "http://localhost:3000/api/v2/profesor/";
  console.log(urlProfesor + usuario.CI);
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
      var nombreUsuario = document.getElementById("nombreUsuario");
      nombreUsuario.innerHTML = "" + resByCI.name;
      var nombreAsigantura = document.getElementById("nombreAsigantura");
      nombreAsigantura.innerHTML = "" + resByCI.asignatura;
    })
    .finally(() => {
      quitarDiv();
    });
}

function redondear(p) {
  var DIG_SIG = 2;
  var MIN_DIG = 0;
  return (p - 0).toFixed(
    Math.max(MIN_DIG, DIG_SIG - Math.log(p) / Math.log(10))
  );
}

function eliminarTabla() {
  const tabla = document.getElementById("tablaNotasTbody");
  tabla.remove();
}

function modal(estudiante) {
  const tabla = document.getElementById("tablaNotasTbody");
  var contador = 0;
  if (contador == 0) {
    eliminarTabla();
    contador++;
  } else if (tabla != null) {
    eliminarTabla();
  }

  console.log(estudiante);
  $("#modal").modal("show");
  const urlNotas = "http://localhost:3000/api/v2/notas";
  const urlAsignatura = "http://localhost:3000/api/v2/asignatura/descripcion/";
  const urlEstudiante = "http://localhost:3000/api/v2/estudiante";
  const urlProfesor = "http://localhost:3000/api/v2/profesor/";
  let token = JSON.parse(localStorage.getItem("token"));

  console.log("entroasfadsgsadgfad hgfadhgfdahdfahfad fhfadh adhf");
  if (navigator.onLine) {
    server(urlAsignatura);
    server(urlNotas);
    server(urlEstudiante);
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
        fetch(urlAsignatura + resByCI.asignatura, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resGetAsignatura) => resGetAsignatura.json())
          .then((resGetAsignatura) => {
            fetch(urlNotas, {
              method: "get",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json, text/plain, */*",
                Authorization: `Bearer ${token}`,
              },
            })
              .then((resGetNotas) => resGetNotas.json())
              .then((resGetNotas) => {
                fetch(urlEstudiante, {
                  method: "get",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json, text/plain, */*",
                    Authorization: `Bearer ${token}`,
                  },
                })
                  .then((resGetEstudiante) => resGetEstudiante.json())
                  .then((resGetEstudiante) => {
                    var tablaNotas = document.getElementById("tablaNotas");
                    var tbody = document.createElement("tbody");
                    tbody.id = "tablaNotasTbody";
                    tablaNotas.appendChild(tbody);
                    var posicion;
                    var find = false;

                    for (
                      let w = 0;
                      w < resGetEstudiante.length && find == false;
                      w++
                    ) {
                      if (resGetEstudiante[w]._id == estudiante) {
                        posicion = w;
                        find = true;
                      }
                    }

                    if (
                      resGetEstudiante[posicion].annoCurso ==
                      resGetAsignatura.anno
                    ) {
                      for (let i = 0; i < resGetAsignatura.temas.length; i++) {
                        for (
                          let j = 0;
                          j < resGetAsignatura.temas[i].niveles.length;
                          j++
                        ) {
                          var isEstudiante = isExist(
                            resGetEstudiante[posicion]._id,
                            resGetNotas
                          );
                          if (isEstudiante) {
                            console.log("entro el estudiante");
                            for (let q = 0; q < resGetNotas.length; q++) {
                              if (
                                resGetAsignatura.temas[i]._id ==
                                resGetNotas[q].tema[0]._id
                              ) {
                                console.log("entro al tema");
                                if (
                                  resGetAsignatura.temas[i].niveles[j]._id ==
                                    resGetNotas[q].nivel[0]._id &&
                                  resGetEstudiante[posicion]._id ==
                                    resGetNotas[q].estudiante[0]._id
                                ) {
                                  console.log("ebtr safadsfdgsdag");

                                  let row_1 = document.createElement("tr");
                                  row_1.className =
                                    "bg-white border-b hover:bg-gray-50 text-base";
                                  let heading_2 = document.createElement("td");
                                  heading_2.innerHTML = `${resGetAsignatura.temas[i].descripcion}`;
                                  heading_2.className = "p-4 w-32";
                                  let heading_3 = document.createElement("td");
                                  heading_3.innerHTML = `${resGetAsignatura.temas[i].niveles[j].descripcion}`;
                                  heading_3.className = "p-4 w-32";
                                  let heading_4 = document.createElement("td");
                                  heading_4.innerHTML = `${resGetNotas[q].nota}`;
                                  heading_4.className = "p-4 w-32";

                                  row_1.appendChild(heading_2);
                                  row_1.appendChild(heading_3);
                                  row_1.appendChild(heading_4);
                                  tbody.appendChild(row_1);
                                  tablaNotas.appendChild(tbody);
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  });
              })
              .finally(() => {
                var tablaNotas = document.getElementById("tablaNotas");
                var chargerTable = document.getElementById("chargerTableNotas");

                chargerTable.style.visibility = "hidden";
                chargerTable.style.opacity = "0";
                tablaNotas.style.display = "table";
              });
          });
      });
  }
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

function cargarDatosTabla(nota, estudiante, asignatura) {
  var cantidadPreguntas = 0;
  var cantidadPreguntasTotal = 0;
  var cantidadNiveles = 0;
  var cantidadNiveleTotal = 0;

  for (let w = 0; w < estudiante.length; w++) {
    cantidadPreguntas = 0;
    cantidadPreguntasTotal = 0;
    cantidadNiveles = 0;
    cantidadNiveleTotal = 0;

    if (estudiante[w].annoCurso == asignatura.anno) {
      for (let i = 0; i < asignatura.temas.length; i++) {
        for (let j = 0; j < asignatura.temas[i].niveles.length; j++) {
          cantidadPreguntasTotal +=
            asignatura.temas[i].niveles[j].preguntas.length;
        }
        cantidadNiveleTotal += asignatura.temas[i].niveles.length;
      }
    }

    var porciento = (cantidadNiveles * 100) / cantidadNiveleTotal;
    console.log(porciento);
    if (porciento != 0) var porcientoOk = redondear(porciento);
    var tbody = $("tbody");
    tbody.append(`
                  <tr class="bg-white border-b hover:bg-gray-50 text-base">
                    <td class="p-4 w-32 id columnaID">${estudiante[w]._id}</td>
                    <td class="p-4 w-1/6 numero">${w + 1}</td>
                    <td class="p-4 w-32 estudiante"><a class="nameEstudiante" onclick="modal('${
                      estudiante[w]._id
                    }')">${estudiante[w].name}</a></td>
                    <td class="p-4 w-32 cantPreguntas">${cantidadPreguntas}/${cantidadPreguntasTotal}</td>
                    <td class="p-4 w-32 promedio">${porciento} %</td>
                    </td>
                  </tr>                        
                `);
  }
}

function cargarDatosTablaConNotas(nota, estudiante, asignatura) {
  if (nota.length != 0) {
    var cantidadPreguntas = 0;
    var cantidadPreguntasTotal = 0;
    var cantidadNiveles = 0;
    var cantidadNiveleTotal = 0;

    for (let w = 0; w < estudiante.length; w++) {
      cantidadPreguntas = 0;
      cantidadPreguntasTotal = 0;
      cantidadNiveles = 0;
      cantidadNiveleTotal = 0;

      if (estudiante[w].annoCurso == asignatura.anno) {
        for (let i = 0; i < asignatura.temas.length; i++) {
          for (let j = 0; j < asignatura.temas[i].niveles.length; j++) {
            var isEstudiante = isExist(estudiante[w]._id, nota);
            if (isEstudiante) {
              var noEncontrado = false;

              for (let q = 0; q < nota.length; q++) {
                if (
                  asignatura.temas[i].niveles[j]._id == nota[q].nivel[0]._id &&
                  estudiante[w]._id == nota[q].estudiante[0]._id
                ) {
                  cantidadPreguntas +=
                    asignatura.temas[i].niveles[j].preguntas.length;
                  cantidadPreguntasTotal +=
                    asignatura.temas[i].niveles[j].preguntas.length;
                  cantidadNiveles += 1;
                  noEncontrado = true;
                }
              }

              if (noEncontrado == false) {
                cantidadPreguntasTotal +=
                  asignatura.temas[i].niveles[j].preguntas.length;
              }
            } else {
              cantidadPreguntasTotal +=
                asignatura.temas[i].niveles[j].preguntas.length;
            }
          }
          cantidadNiveleTotal += asignatura.temas[i].niveles.length;
        }
      }
      var porciento = (cantidadNiveles * 100) / cantidadNiveleTotal;
      if (porciento != 0) var porcientoOk = redondear(porciento);

      if (porciento == 0) {
        var tbody = $("tbody");
        tbody.append(`
        <tr class="bg-white border-b hover:bg-gray-50 text-base">
        <td class="p-4 w-32 id columnaID">${estudiante[w]._id}</td>
          <td class="p-4 w-1/6 numero">${w + 1}</td>
          <td class="p-4 w-32 estudiante"><a class="nameEstudiante" onclick="modal('${
            estudiante[w]._id
          }')">${estudiante[w].name}</a></td>
          <td class="p-4 w-32 cantPreguntas">${cantidadPreguntas}/${cantidadPreguntasTotal}</td>
          <td class="p-4 w-32 promedio">${porciento}%</td>
          </td>
        </tr>                        
      `);
      } else {
        var tbody = $("tbody");
        tbody.append(`
        <tr class="bg-white border-b hover:bg-gray-50 text-base">
        <td class="p-4 w-32 id columnaID">${estudiante[w]._id}</td>
          <td class="p-4 w-1/6 numero">${w + 1}</td>
          <td class="p-4 w-32 estudiante"><a class="nameEstudiante" onclick="modal('${
            estudiante[w]._id
          }')">${estudiante[w].name}</a></td>
          <td class="p-4 w-32 cantPreguntas">${cantidadPreguntas}/${cantidadPreguntasTotal}</td>
          <td class="p-4 w-32 promedio">${porcientoOk}%</td>
          </td>
        </tr>                        
      `);
      }
    }
  }
}

function isExist(idEstudiante, notas) {
  var find = false;
  for (let i = 0; i < notas.length && find == false; i++) {
    if (notas[i].estudiante[0]._id == idEstudiante) {
      find = true;
    }
  }

  return find;
}
