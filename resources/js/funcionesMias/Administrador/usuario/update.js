function cargarModal() {
  $("#modalUpdate").modal({ backdrop: "static", keyboard: false });
  $("#modalUpdate").modal("show");
  quitarDivModificar();
}

function update(id, name, username, email, rol) {
  console.log("entro");
  cargarModal();
  const inputName = document.getElementById("nameUpdate");
  inputName.value = name;
  const inputUsername = document.getElementById("usernameUpdate");
  inputUsername.value = username;
  const inputEmail = document.getElementById("emailUpdate");
  inputEmail.value = email;

  updateAsignatura(id, name, username, email, rol);
}

function updateAsignatura(id, name, username, email, rol) {
  $("#formularioUpdate").on("submit", function (e) {
    e.preventDefault();
    onClickBotonModificar();
    const urlUSer = "http://localhost:3000/api/v2/user/";
    const token = JSON.parse(localStorage.getItem("token"));

    if (navigator.onLine) {
      server(urlUSer);

      var newName = $("#nameUpdate");
      var newUsername = $("#usernameUpdate");
      var newEmail = $("#emailUpdate");

      var nameOk;
      var usernameOk;
      var emailOk;

      if (newName.val() == "") {
        nameOk = name;
      } else {
        nameOk = newName.val();
      }

      if (newUsername.val() == "") {
        usernameOk = username;
      } else {
        usernameOk = newUsername.val();
      }

      if (newEmail.val() == "") {
        emailOk = email;
      } else {
        emailOk = newEmail.val();
      }

      const data = {
        name: nameOk,
        username: usernameOk,
        email: emailOk,
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
    } else {
      $("#modalUpdate").modal("hide");
      $("#internet").modal("show");
    }
  });
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
  var boton = document.getElementById("botonModificar");
  var chargerModificar = document.getElementById("chargerModificar");
  chargerModificar.style.visibility = "hidden";
  chargerModificar.style.opacity = "0";
  boton.innerHTML = "Modificar Tema";
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
