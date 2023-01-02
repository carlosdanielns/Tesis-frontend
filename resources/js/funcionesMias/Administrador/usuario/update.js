const expresionesUpdate = {
  name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  username: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

const camposUpdate = {
  name: false,
  username: false,
  correo: false,
};

function cargarModal() {
  $("#modalUpdate").modal({ backdrop: "static", keyboard: false });
  $("#modalUpdate").modal("show");

  var nombreBienUpdate = document.getElementById("nombreBienUpdate");
  nombreBienUpdate.style.visibility = "hidden";
  var usernameBienUpdate = document.getElementById("usernameBienUpdate");
  usernameBienUpdate.style.visibility = "hidden";
  var correoBienUpdate = document.getElementById("correoBienUpdate");
  correoBienUpdate.style.visibility = "hidden";

  quitarDivModificar();
}

function update(id, name, username, email, rol) {
  cargarModal();
  const inputName = document.getElementById("nameUpdate");
  inputName.value = name;
  const inputUsername = document.getElementById("usernameUpdate");
  inputUsername.value = username;
  const inputEmail = document.getElementById("emailUpdate");
  inputEmail.value = email;

  updateusuario(id, name, username, email, rol);
}

function updateusuario(id, name, username, email, rol) {
  $("#formularioUpdate").on("submit", function (e) {
    e.preventDefault();

    const urlUSer = "http://localhost:3000/api/v2/user/";

    if (navigator.onLine) {
      server(urlUSer);

      var newName = $("#nameUpdate");
      var newUsername = $("#usernameUpdate");
      var newEmail = $("#emailUpdate");

      var nombreOk;
      if (newName.val() == "") {
        nombreOk = name;
      } else {
        if (!expresionesUpdate.name.test(newName.val())) {
          var nombreMalUpdate = document.getElementById("nombreMalUpdate");
          nombreMalUpdate.style.visibility = "visible";
          return;
        } else {
          nombreOk = newName.val();
        }
      }

      var usernameOk;
      if (newUsername.val() == "") {
        usernameOk = username;
      } else {
        if (!expresionesUpdate.username.test(newUsername.val())) {
          var usernameMalUpdate = document.getElementById("usernameMalUpdate");
          usernameMalUpdate.style.visibility = "visible";
          return;
        } else {
          usernameOk = newUsername.val();
        }
      }

      var emailOk;
      if (newEmail.val() == "") {
        emailOk = username;
      } else {
        if (!expresionesUpdate.correo.test(newEmail.val())) {
          var correoMalUpdate = document.getElementById("correoMalUpdate");
          correoMalUpdate.style.visibility = "visible";
          return;
        } else {
          emailOk = newEmail.val();
        }
      }

      modificar(id, nombreOk, usernameOk, emailOk, rol, username, email);
    } else {
      $("#modalUpdate").modal("hide");
      $("#internet").modal("show");
    }
  });
}

function modificar(id, name, usernameOK, emailOK, rol, username, email) {
  const urlUSer = "http://localhost:3000/api/v2/user/";
  const token = JSON.parse(localStorage.getItem("token"));

  if (navigator.onLine) {
    server(urlUSer);
    onClickBotonModificar();

    if (usernameOK != username && emailOK == email) {
      fetch(urlUSer, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          var find = false;
          for (let j = 0; j < res.length && find == false; j++) {
            if (res[j].username == usernameOK) {
              var usernameBien = document.getElementById("usernameBienUpdate");
              usernameBien.style.visibility = "visible";
              find = true;
              console.log("tercer");
            }
          }

          if (find == false) {
            onClickBotonModificar();
            const data = {
              name: name,
              username: usernameOK,
              email: emailOK,
            };

            fetch(urlUSer + id, {
              method: "put",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json, text/plain, */*",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(data),
            })
              .then((resPut) => resPut.json())
              .then((resPut) => {
                if (resPut.status == 401 || resPut.statusCode == 401) {
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
          quitarDivModificar();
        });
    } else if (emailOK != email && usernameOK == username) {
      fetch(urlUSer, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          var find = false;
          for (let j = 0; j < res.length && find == false; j++) {
            if (res[j].email == emailOK) {
              var correoBien = document.getElementById("correoBienUpdate");
              correoBien.style.visibility = "visible";
              find = true;
              console.log("cuarto");
            }
          }

          if (find == false) {
            onClickBotonModificar();
            const data = {
              name: name,
              username: usernameOK,
              email: emailOK,
            };

            fetch(urlUSer + id, {
              method: "put",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json, text/plain, */*",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(data),
            })
              .then((resPut) => resPut.json())
              .then((resPut) => {
                if (resPut.status == 401 || resPut.statusCode == 401) {
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
          quitarDivModificar();
        });
    } else if (emailOK != email && usernameOK != username) {
      fetch(urlUSer, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          var find = false;
          for (let j = 0; j < res.length && find == false; j++) {
            if (res[j].username == usernameOK && res[j].email == emailOK) {
              var usernameBien = document.getElementById("usernameBienUpdate");
              usernameBien.style.visibility = "visible";
              var correoBien = document.getElementById("correoBienUpdate");
              correoBien.style.visibility = "visible";
              find = true;
              console.log("primer");
            } else if (res[j].username == usernameOK) {
              var usernameBien = document.getElementById("usernameBienUpdate");
              usernameBien.style.visibility = "visible";
              find = true;
              console.log("tercer");
            } else if (res[j].email == emailOK) {
              var correoBien = document.getElementById("correoBienUpdate");
              correoBien.style.visibility = "visible";
              find = true;
              console.log("cuarto");
            }
          }

          if (find == false) {
            onClickBotonModificar();
            const data = {
              name: name,
              username: usernameOK,
              email: emailOK,
            };

            fetch(urlUSer + id, {
              method: "put",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json, text/plain, */*",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(data),
            })
              .then((resPut) => resPut.json())
              .then((resPut) => {
                if (resPut.status == 401 || resPut.statusCode == 401) {
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
          quitarDivModificar();
        });
    }
  } else {
    $("#modalCrear").modal("hide");
    $("#internet").modal("show");
  }
}

function onClickBotonModificar() {
  var boton = document.getElementById("botonModificar");
  var chargerModificar = document.getElementById("chargerModificar");

  chargerModificar.style.visibility = "visible";
  chargerModificar.style.opacity = "100";
  boton.innerHTML = "  Procesando...";
  boton.disabled = true;
}

function quitarDivModificar() {
  var nombreMal = document.getElementById("nombreMalUpdate");
  nombreMal.style.visibility = "hidden";
  var usernameMal = document.getElementById("usernameMalUpdate");
  usernameMal.style.visibility = "hidden";
  var correoMal = document.getElementById("correoMalUpdate");
  correoMal.style.visibility = "hidden";

  var boton = document.getElementById("botonModificar");
  var chargerModificar = document.getElementById("chargerModificar");
  chargerModificar.style.visibility = "hidden";
  chargerModificar.style.opacity = "0";
  boton.innerHTML = "Modificar usuario";
  boton.disabled = false;
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

const validarFormularioUpdate = (e) => {
  console.log(e);
  switch (e.target.name) {
    case "nameUpdate":
      validarCampoUpdate(expresionesUpdate.name, e.target, "name");
      break;
    case "usernameUpdate":
      validarCampoUpdate(expresionesUpdate.username, e.target, "username");
      break;
    case "emailUpdate":
      validarCampoUpdate(expresionesUpdate.correo, e.target, "correo");
      break;
  }
};

const validarCampoUpdate = (expresion, input, campo) => {
  var nombreMal = document.getElementById("nombreMalUpdate");
  nombreMal.style.visibility = "hidden";
  var usernameMal = document.getElementById("usernameMalUpdate");
  usernameMal.style.visibility = "hidden";
  var correoMal = document.getElementById("correoMalUpdate");
  correoMal.style.visibility = "hidden";

  var usernameBien = document.getElementById("usernameBienUpdate");
  usernameBien.style.visibility = "hidden";
  var correoBien = document.getElementById("correoBienUpdate");
  correoBien.style.visibility = "hidden";

  if (expresion.test(input.value)) {
    camposUpdate[campo] = true;
  } else if (campo == "name") {
    nombreMal.style.visibility = "visible";
    camposUpdate[campo] = false;
  } else if (campo == "username") {
    usernameMal.style.visibility = "visible";
    camposUpdate[campo] = false;
  } else if (campo == "correo") {
    correoMal.style.visibility = "visible";
    camposUpdate[campo] = false;
  }
};

const inputsUpdate = document.querySelectorAll("#formularioUpdate input");

inputsUpdate.forEach((input) => {
  input.addEventListener("keyup", validarFormularioUpdate);
});
