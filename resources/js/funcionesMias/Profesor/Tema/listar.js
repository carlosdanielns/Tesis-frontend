const asignatura = JSON.parse(localStorage.getItem("asignatura"));
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
  var urlProfesor = "http://localhost:3000/api/v2/profesor/";
  let token = JSON.parse(localStorage.getItem("token"));

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
      var urlAsignatura =
        "http://localhost:3000/api/v2/asignatura/descripcion/";

      if (navigator.onLine) {
        server(urlAsignatura);
        //Aqui obtengo la asignatura por la cual el profesor hizo login
        fetch(urlAsignatura + resByCI.asignatura, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resFindDescripcion) => resFindDescripcion.json())
          .then((resFindDescripcion) => {
            //Aqui verifico si esta autenticado
            if (
              resFindDescripcion.status == 401 ||
              resFindDescripcion.statusCode == 401
            ) {
              $("#modal401").modal({
                backdrop: "static",
                keyboard: false,
              });
              $("#modal401").modal("show");
            } else if (
              resFindDescripcion.status != 500 ||
              resFindDescripcion.statusCode != 500
            ) {
              for (let i = 0; i < resFindDescripcion.temas.length; i++) {
                var tbody = $("tbody");
                tbody.append(`
                                <tr class="bg-white border-b hover:bg-gray-50">
                                  <td class="p-4 w-32 id columnaID">${
                                    resFindDescripcion.temas[i]._id
                                  }</td>
                                  <td class="p-4 w-32 text-base #">${i + 1}</td>
                                  <td class="py-4 px-6 text-base descripcion">${
                                    resFindDescripcion.temas[i].descripcion
                                  }</td>
                                  <td class="py-4">
                                  <button class="modificar font-medium text-cyan-600 hover:underline" onclick="update('${
                                    resFindDescripcion.temas[i]._id
                                  }','${
                  resFindDescripcion.temas[i].descripcion
                }')"><i class="far fa-edit"></i></button>
                                  <button class="eliminar font-medium text-red-600 hover:underline" onclick="eliminar('${
                                    resFindDescripcion.temas[i]._id
                                  }')"><i class="far fa-trash-alt"></i></button>
                                  <button class="listarNivel listar-nivel font-medium text-green-600 hover:underline"><i class="far fa-list-alt"></i></button>
                                  </td>
                                </tr>                        
                              `);
              }
            }
          })
          .finally(() => {
            quitarDivTable();
          });
      } else {
        $("#internet").modal("show");
      }
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
  let token = JSON.parse(localStorage.getItem("token"));

  if (navigator.onLine) {
    server(urlProfesor);

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

function quitarDivTable() {
  var divPrincipal = document.getElementById("divPrincipal");
  var mainPrincipal = document.getElementById("mainPrincipal");
  var chargerTable = document.getElementById("chargerTable");

  chargerTable.style.visibility = "hidden";
  chargerTable.style.opacity = "0";
  mainPrincipal.style.display = "block";
  divPrincipal.style.display = "block";
}
