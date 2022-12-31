const usuario = JSON.parse(localStorage.getItem("usuario"));
const token = JSON.parse(localStorage.getItem("token"));

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
  const asignatura = JSON.parse(localStorage.getItem("profesor"));
  const urlAsignatura = "http://localhost:3000/api/v2/asignatura/descripcion/";
  const urlNotas = "http://localhost:3000/api/v2/notas";
  const estudiantes = "http://localhost:3000/api/v2/estudiante";
  let token = JSON.parse(localStorage.getItem("token"));

  fetch(urlAsignatura + asignatura.asignatura, {
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
              console.log(resGetEstudiante);
              console.log(resGetNotas);
              var cantidadPreguntas = 0;
              var cantidadPreguntasTotal = 0;
              var cantidadNiveles = 0;
              var cantidadNiveleTotal = 0;

              for (let w = 0; w < resGetEstudiante.length; w++) {
                cantidadPreguntas = 0;
                cantidadPreguntasTotal = 0;
                cantidadNiveles = 0;
                cantidadNiveleTotal = 0;

                console.log(resGetNotas[0].nivel[0]._id);
                if (resGetEstudiante[w].annoCurso == resGetAsignatura.anno) {
                  for (let i = 0; i < resGetAsignatura.temas.length; i++) {
                    for (
                      let j = 0;
                      j < resGetAsignatura.temas[i].niveles.length;
                      j++
                    ) {
                      if (resGetNotas.length != 0) {
                        for (let q = 0; q < resGetNotas.length; q++) {
                          if (
                            resGetAsignatura.temas[i].niveles[j]._id ==
                            resGetNotas[q].nivel[0]._id
                          ) {
                            cantidadPreguntas +=
                              resGetAsignatura.temas[i].niveles[j].preguntas
                                .length;
                            cantidadPreguntasTotal +=
                              resGetAsignatura.temas[i].niveles[j].preguntas
                                .length;
                            cantidadNiveles += 1;
                          } else {
                            cantidadPreguntasTotal +=
                              resGetAsignatura.temas[i].niveles[j].preguntas
                                .length;
                          }
                        }
                      } else {
                        cantidadPreguntasTotal +=
                          resGetAsignatura.temas[i].niveles[j].preguntas.length;
                      }

                      cantidadNiveleTotal +=
                        resGetAsignatura.temas[i].niveles.length;
                    }
                  }
                  var porciento = (cantidadNiveles * 100) / cantidadNiveleTotal;
                  var porcientoOk = redondear(porciento);
                  var tbody = $("tbody");
                  tbody.append(`
                <tr class="bg-white border-b hover:bg-gray-50 text-base">
                  <td class="p-4 w-1/6 numero">${w + 1}</td>
                  <td class="p-4 w-32 estudiante"><a class="nameEstudiante" onclick="modal('${
                    resGetEstudiante[w]
                  }')">${resGetEstudiante[w].name}</a></td>
                  <td class="p-4 w-32 cantPreguntas">${cantidadPreguntas}/${cantidadPreguntasTotal}</td>
                  <td class="p-4 w-32 promedio">${porcientoOk}%</td>
                  </td>
                </tr>                        
              `);
                }
              }
            })
            .finally(() => {
              var divPrincipal = document.getElementById("divPrincipal");
              var mainPrincipal = document.getElementById("mainPrincipal");
              var chargerTable = document.getElementById("chargerTable");

              chargerTable.style.visibility = "hidden";
              chargerTable.style.opacity = "0";
              mainPrincipal.style.display = "block";
              divPrincipal.style.display = "block";
            });
        });
    });
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

function modal(estudiante) {
  $("#modal").modal("show");
  var b = document.getElementById("tablaNotas");
  var a = document.createElement("tbody");
  b.appendChild(a);
  var tbody = $("tbody");
  tbody.append(`
                <tr class="bg-white border-b hover:bg-gray-50 text-base">
                  <td class="p-4 w-1/6 numero">${1}</td>
                  <td class="p-4 w-32 estudiante">Programación</td>
                  <td class="p-4 w-32 cantPreguntas">Introducción</td>
                  <td class="p-4 w-32 promedio">5</td>
                  </td>
                </tr>  
                <tr class="bg-white border-b hover:bg-gray-50 text-base">
                  <td class="p-4 w-1/6 numero">${2}</td>
                  <td class="p-4 w-32 estudiante">Programación</td>
                  <td class="p-4 w-32 cantPreguntas">Capítulo 1</td>
                  <td class="p-4 w-32 promedio">4</td>
                  </td>
                </tr> 
                `);
}
