const usuario = JSON.parse(localStorage.getItem("usuario"));
const token = JSON.parse(localStorage.getItem("token"));
console.log(usuario);

function modalInformacion() {
  $("#modalInformacion").modal("show");
  var nombreUsuario = document.getElementById("nombreUsuario");
  if (nombreUsuario.innerHTML == "") {
    buscarProfesor();
  }
}

function buscarProfesor() {
  var urlProfesor = "http://localhost:3000/api/v2/profesor/";

  if (navigator.onLine) {
    var nombreUsuario = document.getElementById("nombreUsuario");
    nombreUsuario.innerHTML = "" + usuario.name;
  } else {
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
        $("#modalInformacion").modal("hide");
        $("#serverCaido").modal("show");
      } else if (source.readyState == EventSource.CLOSED) {
        // Server error
      }
      isOpen = false;
    },
    false
  );
}
