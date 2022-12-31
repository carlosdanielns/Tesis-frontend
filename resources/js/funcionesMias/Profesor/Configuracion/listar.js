const usuario = JSON.parse(localStorage.getItem("usuario"));
const token = JSON.parse(localStorage.getItem("token"));
const asignatura = JSON.parse(localStorage.getItem("asignatura"));

if (navigator.onLine) {
  server(urlProfesor);
}

console.log(usuario);
function modalInformacion() {
  $("#modalInformacion").modal("show");
  var nombreUsuario = document.getElementById("nombreUsuario");
  var nombreAsigantura = document.getElementById("nombreAsigantura");
  if (nombreUsuario.innerHTML == "" && nombreAsigantura.innerHTML == "") {
    onClickModal();
    buscarProfesor();
  }
}

window.addEventListener("load", cargarListado);

function cargarListado() {
  var urlAsignatura = "http://localhost:3000/api/v2/asignatura/descripcion/";
  let token = JSON.parse(localStorage.getItem("token"));

  if (navigator.onLine) {
    server(urlAsignatura);
    //Aqui obtengo la asignatura por la cual el profesor hizo login
    fetch(urlAsignatura + asignatura, {
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
          if (resFindDescripcion.configuracion.length != 0) {
            var tbody = $("tbody");
            tbody.append(`
                        <tr class="bg-white border-b hover:bg-gray-50">
                          <td class="p-4 w-32 id columnaID">${resFindDescripcion.configuracion[0]._id}</td>
                          <td class="p-4 w-32 imagen" id="imagenTabla"><img src="${resFindDescripcion.configuracion[0].imagen}" width="100" height="80"></td>
                          <td class="py-4 px-6 icono" id="iconoTabla"><img src="/images/iconos/${resFindDescripcion.configuracion[0].icono}"></td>
                          <td class=" py-4 px-6 sonido"><audio controls><source src="${resFindDescripcion.configuracion[0].sonido}" type="audio/mp3">
                            Your browser does not support the audio element.
                            </audio>
                          </td>
                          <td class="py-4">
                            <button class="modificar font-medium text-cyan-600 hover:underline" onclick="update('${resFindDescripcion.configuracion[0]._id}','${resFindDescripcion.configuracion[0].imagen}','${resFindDescripcion.configuracion[0].icono}','${resFindDescripcion.configuracion[0].sonido}')"><i class="far fa-edit"></i></button>
                            <button class="eliminar font-medium text-red-600 hover:underline" onclick="eliminar('${resFindDescripcion.configuracion[0]._id}')"><i class="far fa-trash-alt"></i></button>
                          </td>
                          </tr>  
                          `);
            var timeout = setTimeout(mostrar(), 5000);
            function mostrar() {
              var iconoTabla = document.getElementById("iconoTabla");
              var imagenTabla = document.getElementById("imagenTabla");
              iconoTabla.addEventListener("click", () => {
                var imagen = document.getElementById("fotoModal");
                console.log(imagen);
                imagen.src = `/images/iconos/${resFindDescripcion.configuracion[0].icono}`;
                $("#modalFoto").modal("show");
              });

              imagenTabla.addEventListener("click", () => {
                var imagen = document.getElementById("fotoModal");
                console.log(imagen);
                imagen.src = `${resFindDescripcion.configuracion[0].imagen}`;
                $("#modalFoto").modal("show");
              });
            }
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
  console.log(urlProfesor + usuario.CI);

  if ((navigator, onLine)) {
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
