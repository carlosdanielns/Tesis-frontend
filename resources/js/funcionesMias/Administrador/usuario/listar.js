const usuario = JSON.parse(localStorage.getItem("usuario"));

window.addEventListener("load", cargarDatos);

function modalInformacion() {
  $("#modalInformacion").modal("show");
  var nombreUsuario = document.getElementById("nombreUsuario");
  if (nombreUsuario.innerHTML == "") {
    //onClickModal();
    buscarProfesor();
  }
}

function cargarDatos() {
  const urlUser = "http://localhost:3000/api/v2/user";
  const token = JSON.parse(localStorage.getItem("token"));

  if (navigator.onLine) {
    server(urlUser);

    fetch(urlUser, {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resAll) => resAll.json())
      .then((resAll) => {
        //Aqui verifico si esta autenticado
        if (resAll.status == 401 || resAll.statusCode == 401) {
          $("#modal401").modal({
            backdrop: "static",
            keyboard: false,
          });
          $("#modal401").modal("show");
        } else if (resAll.status != 500 || resAll.statusCode != 500) {
          var tbody = $("tbody");

          for (var i = 0; i < resAll.length; i++) {
            tbody.append(`
                            <tr class="bg-white border-b hover:bg-gray-50">
                              <td class="p-4 w-6 id columnaID">${
                                resAll[i]._id
                              }</td>
                              <td class="text-base p-4 w-6 #">${i + 1}</td>
                              <td class="text-base p-4 w-6 name">${
                                resAll[i].name
                              }</td>
                              <td class="text-base p-4 w-6 username">${
                                resAll[i].username
                              }</td>
                              <td class="text-base p-4 w-6 email">${
                                resAll[i].email
                              }</td>
                              <td class="text-base p-4 w-6 rol">${
                                resAll[i].rol
                              }</td>
                              <td class="text-base p-4 w-6">
                              <button class="modificar font-medium text-cyan-600 hover:underline" onclick="update('${
                                resAll[i]._id
                              }','${resAll[i].name}','${resAll[i].username}','${
              resAll[i].email
            }','${resAll[i].rol}')"><i class="far fa-edit"></i></button>
                              <button class="eliminar font-medium text-red-600 hover:underline" onclick="eliminar('${
                                resAll[i]._id
                              }','${
              resAll[i].rol
            }')"><i class="far fa-trash-alt"></i></button>
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

/*function onClickModal() {
  var charger = document.getElementById("charger");
  charger.style.visibility = "visible";
  charger.style.opacity = "100";
}

function quitarDiv() {
  var charger = document.getElementById("charger");
  charger.style.visibility = "hidden";
  charger.style.opacity = "0";
}*/

function buscarProfesor() {
  let token = JSON.parse(localStorage.getItem("token"));

  if (navigator.onLine) {
    var nombreUsuario = document.getElementById("nombreUsuario");
    nombreUsuario.innerHTML = "" + usuario.name;
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
