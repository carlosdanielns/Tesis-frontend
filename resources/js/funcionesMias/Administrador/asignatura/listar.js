const usuario = JSON.parse(localStorage.getItem("usuario"));

window.addEventListener("load", cargarListado);

function modalInformacion() {
  $("#modalInformacion").modal("show");
  var nombreUsuario = document.getElementById("nombreUsuario");
  if (nombreUsuario.innerHTML == "") {
    onClickModal();
    buscarProfesor();
  }
}

function cargarListado() {
  const url = "http://localhost:3000/api/v2/asignatura";
  const token = JSON.parse(localStorage.getItem("token"));

  $(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  if (navigator.onLine) {
    server(url);
    fetch(url, {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        var tbody = $("tbody");
        tbody.className = "text-sm";
        for (var i = 0; i < res.length; i++) {
          tbody.append(`
                        <tr class="bg-white border-b hover:bg-gray-50">
                          <td class="text-base p-4 w-32 id columnaID">${res[i]._id}</td>
                          <td class="text-base py-4 w-6 #">${i + 1}</td>
                          <td class=" text-base py-4 w-6 descripcion">${
                            res[i].descripcion
                          }</td>
                          <td class="text-base py-4 w-6 anno">${res[i].anno}</td>
                          <td class="py-4 w-6">
                          <button data-tooltip-target="tooltip-Modificar" data-tooltip-style="light" class="acciones font-medium text-cyan-600 hover:underline" onclick="update('${
                            res[i]._id
                          }','${res[i].descripcion}','${
            res[i].anno
          }')"><i class="far fa-edit"></i></button>
  <button data-tooltip-target="tooltip-Eliminar" data-tooltip-style="light" class="acciones font-medium text-red-600 hover:underline" onclick="eliminar('${
    res[i]._id
  }')"><i class="far fa-trash-alt"></i></button>
                          </td>
                        </tr>                        
                      `);
        }
      })
      .finally(() => {
        quitarDivTable();
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
        nombreUsuario.innerHTML = "" + usuario.name;
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
