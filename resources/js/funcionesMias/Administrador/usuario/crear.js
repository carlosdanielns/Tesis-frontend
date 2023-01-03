const expresiones = {
  name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  username: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  contrasenna: /^.{4,12}$/, // 4 a 12 digitos.
  CI: /^\d{11}$/, // 7 a 14 numeros.
};

const campos = {
  name: false,
  username: false,
  correo: false,
  contrasenna: false,
  CI: false,
};

//Abrir modal Crear
function abrirModalCrear() {
  $("#modalCrear").modal({ backdrop: "static", keyboard: false });
  $("#modalCrear").modal("show");

  var nombreBien = document.getElementById("nombreBien");
  nombreBien.style.visibility = "hidden";
  var usernameBien = document.getElementById("usernameBien");
  usernameBien.style.visibility = "hidden";
  var correoBien = document.getElementById("correoBien");
  correoBien.style.visibility = "hidden";
  var contrasenaBien = document.getElementById("contrasenaBien");
  contrasenaBien.style.visibility = "hidden";
  var CIBien = document.getElementById("CIBien");
  CIBien.style.visibility = "hidden";

  quitarDivCrear();
}
//Fin modal Crear

$("#formularioCreate").on("submit", function (e) {
  e.preventDefault();
  const urlUser = "http://localhost:3000/api/v2/user/";

  if (navigator.onLine) {
    server(urlUser);

    var newName = $("#name");
    var newUsername = $("#username");
    var newEmail = $("#email");
    var newPassword = $("#password");
    var newCI = $("#CI");
    var newRol;

    if (!expresiones.name.test(newName.val())) {
      var nombreMal = document.getElementById("nombreMal");
      nombreMal.style.visibility = "visible";
      return;
    }

    if (!expresiones.username.test(newUsername.val())) {
      var usernameMal = document.getElementById("usernameMal");
      usernameMal.style.visibility = "visible";
      return;
    }

    if (!expresiones.contrasenna.test(newPassword.val())) {
      var contrasenaMal = document.getElementById("contrasenaMal");
      contrasenaMal.style.visibility = "visible";
      return;
    }

    if (!expresiones.CI.test(newCI.val())) {
      var CIMal = document.getElementById("CIMal");
      CIMal.style.visibility = "visible";
      return;
    }

    agregar(
      newName.val(),
      newUsername.val(),
      newEmail.val(),
      newPassword.val(),
      newCI.val()
    );
  } else {
    $("#modalCrear").modal("hide");
    $("#internet").modal("show");
  }
});

function agregar(name, username, email, password, cI) {
  onClickBotonCrear();
  const urlUser = "http://localhost:3000/api/v2/user/";
  let token = JSON.parse(localStorage.getItem("token"));

  if (navigator.onLine) {
    server(urlUser);
    fetch(urlUser, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {

        var find = false;
        for (let j = 0; j < res.length && find == false; j++) {
          if (
            res[j].username == username &&
            res[j].email == email &&
            res[j].CI == cI
          ) {
            var usernameBien = document.getElementById("usernameBien");
            usernameBien.style.visibility = "visible";
            var correoBien = document.getElementById("correoBien");
            correoBien.style.visibility = "visible";
            var CIBien = document.getElementById("CIBien");
            CIBien.style.visibility = "visible";
            find = true;

          } else if (res[j].CI == CI) {
            var CIBien = document.getElementById("CIBien");

            CIBien.style.visibility = "visible";
            find = true;

          } else if (res[j].username == username) {
            var usernameBien = document.getElementById("usernameBien");
            usernameBien.style.visibility = "visible";
            find = true;

          } else if (res[j].email == email) {
            var correoBien = document.getElementById("correoBien");
            correoBien.style.visibility = "visible";
            find = true;
          }
        }

        if (find == false) {
          
          onClickBotonCrear();

          const data = {
            name: name,
            username: username,
            email: email,
            password: password,
            rol: "Administrador",
            CI: cI,
          };

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
        }
      })
      .finally(() => {
        quitarDivCrear();
      });
  } else {
    $("#modalCrear").modal("hide");
    $("#internet").modal("show");
  }
}

function onClickBotonCrear() {
  var boton = document.getElementById("botonInsertar");
  var chargerInsertar = document.getElementById("chargerInsertar");
  chargerInsertar.style.visibility = "visible";
  chargerInsertar.style.opacity = "100";
  boton.innerHTML = "Procesando...";
  boton.disabled = true;
}

function quitarDivCrear() {
  var nombreMal = document.getElementById("nombreMal");
  nombreMal.style.visibility = "hidden";
  var usernameMal = document.getElementById("usernameMal");
  usernameMal.style.visibility = "hidden";
  var correoMal = document.getElementById("correoMal");
  correoMal.style.visibility = "hidden";
  var contrasenaMal = document.getElementById("contrasenaMal");
  contrasenaMal.style.visibility = "hidden";
  var CIMal = document.getElementById("CIMal");
  CIMal.style.visibility = "hidden";

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

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "name":
      validarCampo(expresiones.name, e.target, "name");
      break;
    case "username":
      validarCampo(expresiones.username, e.target, "username");
      break;
    case "email":
      validarCampo(expresiones.correo, e.target, "correo");
      break;
    case "password":
      validarCampo(expresiones.contrasenna, e.target, "password");
      break;
    case "CI":
      validarCampo(expresiones.CI, e.target, "CI");
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  var nombreMal = document.getElementById("nombreMal");
  nombreMal.style.visibility = "hidden";
  var usernameMal = document.getElementById("usernameMal");
  usernameMal.style.visibility = "hidden";
  var correoMal = document.getElementById("correoMal");
  correoMal.style.visibility = "hidden";
  var contrasenaMal = document.getElementById("contrasenaMal");
  contrasenaMal.style.visibility = "hidden";
  var CIMal = document.getElementById("CIMal");
  CIMal.style.visibility = "hidden";

  var usernameBien = document.getElementById("usernameBien");
  usernameBien.style.visibility = "hidden";
  var correoBien = document.getElementById("correoBien");
  correoBien.style.visibility = "hidden";
  var CIBien = document.getElementById("CIBien");
  CIBien.style.visibility = "hidden";

  if (expresion.test(input.value)) {
    campos[campo] = true;
  } else if (campo == "name") {
    nombreMal.style.visibility = "visible";
    campos[campo] = false;
  } else if (campo == "username") {
    usernameMal.style.visibility = "visible";
    campos[campo] = false;
  } else if (campo == "correo") {
    correoMal.style.visibility = "visible";
    campos[campo] = false;
  } else if (campo == "password") {
    contrasenaMal.style.visibility = "visible";
    campos[campo] = false;
  } else if (campo == "CI") {
    CIMal.style.visibility = "visible";
    campos[campo] = false;
  }
};

const inputs = document.querySelectorAll("#formularioCreate input");

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
});
