const temaId = JSON.parse(localStorage.getItem("temaId"));
const usuario = JSON.parse(localStorage.getItem("usuario"));

window.addEventListener("load", cargarListado);

function modalInformacion() {
  $("#modalInformacion").modal("show");
  var nombreUsuario = document.getElementById("nombreUsuario");
  var nombreAsigantura = document.getElementById("nombreAsigantura");
  if (nombreUsuario.innerHTML == "" && nombreAsigantura.innerHTML == "") {
    onClickModal();
    buscarProfesor();
  }
}

function cargarListado() {
  onClickModal();
  const urlTema = "http://localhost:3000/api/v2/tema/";
  let token = JSON.parse(localStorage.getItem("token"));

  if (navigator.onLine) {
    server(urlTema);
    fetch(urlTema + temaId.id, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resFindId) => resFindId.json())
      .then((resFindId) => {
        if (resFindId.status == 401 || resFindId.statusCode == 401) {
          $("#modal401").modal({
            backdrop: "static",
            keyboard: false,
          });
          $("#modal401").modal("show");
        } else if (resFindId.status != 500 || resFindId.statusCode != 500) {
          for (let i = 0; i < resFindId.niveles.length; i++) {
            var descripcionBD = resFindId.niveles[i].descripcion;
            var nota5 = resFindId.niveles[i].nota5;
            var tiempoDuracion = resFindId.niveles[i].tiempoDuracion;

            var tbody = $("tbody");
            tbody.append(`
                                  <tr class="bg-white border-b hover:bg-gray-50">
                                    <td class="p-4 w-32 id columnaID">${
                                      resFindId.niveles[i]._id
                                    }</td>
                                    <td class="p-4 w-32 text-base #">${
                                      i + 1
                                    }</td>
                                    <td class="py-4 px-6 text-base descripcion">${descripcionBD}</td>
                                    <td class="py-4 px-6 text-base nota5">${nota5} %</td>
                                    <td class="py-4 px-6 text-base tiempoDuracion">${tiempoDuracion} minutos</td>
                                    <td class="py-4">
                                    <button class="modificar font-medium text-cyan-600 hover:underline" onclick="update('${
                                      resFindId.niveles[i]._id
                                    }','${resFindId.niveles[i].descripcion}','${
              resFindId.niveles[i].nota5
            }','${
              resFindId.niveles[i].tiempoDuracion
            }')"><i class="far fa-edit"></i></button>
                                    <button class="eliminar font-medium text-red-600 hover:underline" onclick="eliminar('${
                                      resFindId.niveles[i]._id
                                    }')"
                                    ><i class="far fa-trash-alt"></i></button>
                                    <button class="listar-pregunta font-medium text-green-600 hover:underline"><i class="far fa-list-alt"></i></button>
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
  var urlTema = "http://localhost:3000/api/v2/tema/";
  let token = JSON.parse(localStorage.getItem("token"));

  if (navigator.onLine) {
    server(urlProfesor);
    server(urlTema);
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
        fetch(urlTema + temaId.id, {
          method: "get",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resById) => resById.json())
          .then((resById) => {
            var nombreUsuario = document.getElementById("nombreUsuario");
            nombreUsuario.innerHTML = "" + resByCI.name;
            var nombreAsigantura = document.getElementById("nombreAsigantura");
            nombreAsigantura.innerHTML = "" + resByCI.asignatura;
            var nombreTema = document.getElementById("nombreTema");
            nombreTema.innerHTML = resById.descripcion;
          })
          .finally(() => {
            quitarDiv();
          });
      });
  } else {
    $("#modalInformacion").modal("hide");
    $("#internet").modal("show");
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
