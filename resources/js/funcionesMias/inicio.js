function iniciarSesion() {
  $("#login").modal("show");
  quitarCharger();
}

window.addEventListener("load", function () {
  // icono para mostrar contraseña
  showPassword = document.querySelector(".show-password");
  showPassword.addEventListener("click", () => {
    // elementos input de tipo clave
    password1 = document.querySelector(".password1");

    if (password1.type === "text") {
      password1.type = "password";
      showPassword.classList.remove("fa-eye-slash");
    } else {
      password1.type = "text";
      showPassword.classList.toggle("fa-eye-slash");
    }
  });
});

$("#formulario").on("submit", function (e) {
  e.preventDefault();
  if (navigator.onLine) {
    var urlLogin = "http://localhost:3000/api/v2/auth/signin";
    const userName = $("#typeUsuarioName");
    const contrasenna = $("#typePassword");
    var data = { username: userName.val(), password: contrasenna.val() };
    server(urlLogin);
    onclickBoton();

    fetch(urlLogin, {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.access_token));
        localStorage.setItem("usuario", JSON.stringify(res.user));

        if (res.access_token != undefined) {
          switch (res.user.rol) {
            case "Administrador":
              location.replace("/administrador/principal");
              break;
            case "Profesor":
              location.replace("/profesor/principal");
              break;
            case "Estudiante":
              $("#login").modal("hide");
              $("#serverCaido").modal("hide");
              $("#internet").modal("hide");
              $("#estudiante").modal("show");
              break;
          }
        } else if (res.status == 401 || res.statusCode == 401) {
          var labelCrendencial = document.getElementById("labelCredenciales");
          if (labelCrendencial == null) {
            agregarCredencialesNoValidas();
          } else if (labelCrendencial != null) {
            agregarCredencialesNoValidas();
            quitar();
          }
        }
      })
      .finally(() => {
        quitarCharger();
      });
  } else {
    $("#login").modal("hide");
    $("#internet").modal("show");
  }
});

function agregarCredencialesNoValidas() {
  var noValidas = document.getElementById("noValidas");
  var label = document.createElement("label");
  label.id = "labelCredenciales";
  label.className =
    "labelCredenciales mt-6 font-bold tracking-tight text-gray-900";
  label.innerHTML = "* Credenciales no válidas";
  noValidas.appendChild(label);
}

function quitar() {
  var labelCrendencial = document.getElementById("labelCredenciales");
  if (labelCrendencial != null) {
    labelCrendencial.remove();
  }
}

function cambio() {
  quitar();
}

function onclickBoton() {
  var candado = document.getElementById("candado");
  var charger = document.getElementById("charger");
  var boton = document.getElementById("botonLogin");

  candado.style.display = "none";
  charger.style.display = "block";
  boton.disabled = true;
}

function quitarCharger() {
  var candado = document.getElementById("candado");
  var charger = document.getElementById("charger");
  var boton = document.getElementById("botonLogin");

  candado.style.display = "flex";
  charger.style.display = "none";
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
        $("#login").modal("hide");
        $("#serverCaido").modal("show");
      } else if (source.readyState == EventSource.CLOSED) {
        // Server error
      }
      isOpen = false;
    },
    false
  );
}
