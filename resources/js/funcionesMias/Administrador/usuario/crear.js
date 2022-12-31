//Abrir modal Crear
function abrirModalCrear() {
  $("#modalCrear").modal({ backdrop: "static", keyboard: false });
  $("#modalCrear").modal("show");
  quitarDivCrear();
}
//Fin modal Crear

function cargarRol() {
  var select = document.getElementById("rol"); //Seleccionamos el select
  var roles = ["Estudiante", "Profesor", "Administrador"];
  console.log(roles);
  for (let i = 0; i < roles.length; i++) {
    var option = document.createElement("option"); //Creamos la opcion
    option.innerHTML = roles[i]; //Metemos el texto en la opción
    select.appendChild(option); //Metemos la opción en el select
  }
}

function cargarDatos() {
  cargarRol();
}

window.addEventListener("load", cargarDatos);

$("#formularioCreate").on("submit", function (e) {
  e.preventDefault();
  onClickBotonCrear();
  let token = JSON.parse(localStorage.getItem("token"));
  const urlUser = "http://localhost:3000/api/v2/user/";

  var newName = $("#name");
  var newUsername = $("#username");
  var newEmail = $("#email");
  var newPassword = $("#password");
  var newRol;
  if (navigator.onLine) {
    server(urlUser);

    const selectElement = document.getElementById("rol");
    selectElement.addEventListener("onchange", rol());

    function rol() {
      newRol = selectElement.options[selectElement.selectedIndex].text;
    }
    const data = {
      name: newName.val(),
      username: newUsername.val(),
      email: newEmail.val(),
      password: newPassword.val(),
      rol: newRol,
      CI: "",
    };

    console.log(data);

    fetch(urlUser, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((resAdd) => resAdd.json())
      .then((resAdd) => {
        if (resAdd.status == 401 || resAdd.statusCode == 401) {
          $("#modal401").modal({
            backdrop: "static",
            keyboard: false,
          });
          $("#modal401").modal("show");
        }
      })
      .finally(() => {
        quitarDivCrear();
        location.replace("/usuario/listado");
      });
  } else {
    $("#modalCrear").modal("hide");
    $("#internet").modal("show");
  }
});

function onClickBotonCrear() {
  var boton = document.getElementById("botonInsertar");
  var chargerInsertar = document.getElementById("chargerInsertar");
  chargerInsertar.style.visibility = "visible";
  chargerInsertar.style.opacity = "100";
  boton.innerHTML = "Procesando...";
  boton.disabled = true;
}

function quitarDivCrear() {
  var boton = document.getElementById("botonInsertar");
  var chargerInsertar = document.getElementById("chargerInsertar");
  chargerInsertar.style.visibility = "hidden";
  chargerInsertar.style.opacity = "0";
  boton.innerHTML = "Insertar Usuario";
  boton.disabled = false;
}

var formulario = document.getElementById("formularioCreate");
var close = document.getElementById("close");

close.addEventListener("click", function () {
  formulario.reset();
});

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
