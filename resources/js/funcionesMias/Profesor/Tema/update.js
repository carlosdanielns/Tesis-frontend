const expresionesUpdate = {
  descripcion: /^[a-zA-ZÀ-ÿ\sZ0-9\_\-]{1,40}$/, // Letras y espacios, pueden llevar acentos.
};

const camposUpdate = {
  descripcionUpdate: false,
};

const asignaturaDelete = JSON.parse(localStorage.getItem("asignatura"));

function cargarModal() {
  $("#modalUpdate").modal({ backdrop: "static", keyboard: false });
  $("#modalUpdate").modal("show");
  var descripcionBien = document.getElementById("descripcionBienUpdate");
  descripcionBien.style.visibility = "hidden";
  quitarDivModificar();
}

function update(id, descripcion) {
  cargarModal();
  const inputDescripcion = document.getElementById("descripcionUpdate");
  inputDescripcion.value = descripcion;
  updateTema(id, descripcion);
}

function updateTema(id, descripcion) {
  $("#formularioUpdate").on("submit", function (e) {
    e.preventDefault();
    var urlAsignatura = "http://localhost:3000/api/v2/asignatura/descripcion/";

    if (navigator.onLine) {
      server(urlAsignatura);
      var newDescripcion = $("#descripcionUpdate");

      var descripcionOK;
      if (newDescripcion.val() == "") {
        descripcionOK = descripcion;
      } else {
        if (!expresionesUpdate.descripcion.test(newDescripcion.val())) {
          var descripcionBien = document.getElementById("descripcionMalUpdate");
          descripcionBien.style.visibility = "visible";
          return;
        } else {
          descripcionOK = newDescripcion.val();
        }
      }

      modificar(id, descripcionOK, descripcion);
    } else {
      $("#modalUpdate").modal("hide");
      $("#internet").modal("show");
    }
  });
}

function modificar(id, descripcionOK, descripcion) {
  var urlAsignatura = "http://localhost:3000/api/v2/asignatura/descripcion/";
  var url = "http://localhost:3000/api/v2/tema/";
  let token = JSON.parse(localStorage.getItem("token"));
  if (navigator.onLine) {
    server(urlAsignatura);
    server(url);

    if (descripcionOK == descripcion) {
      put(url, id, descripcionOK);
    } else {
      onClickBotonModificar();
      fetch(url, {
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
            if (res[j].descripcion == descripcionOK) {
              var descripcionBienUpdate = document.getElementById(
                "descripcionBienUpdate"
              );
              descripcionBienUpdate.style.visibility = "visible";
              find = true;
            }
          }

          if (find == false) {
            put(url, id, descripcionOK);
          }
        });
    }
  } else {
    $("#modalUpdate").modal("hide");
    $("#internet").modal("show");
  }
}

function put(url, id, descripcion) {
  onClickBotonModificar();
  let token = JSON.parse(localStorage.getItem("token"));
  var data = { descripcion: descripcion };

  fetch(url + id, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((resUpdate) => resUpdate.json())
    .then((resUpdate) => {
      if (resUpdate.status == 401 || resUpdate.statusCode == 401) {
        $("#modal401").modal({
          backdrop: "static",
          keyboard: false,
        });
        $("#modal401").modal("show");
      }
    })
    .finally(() => {
      quitarDivModificar();
      location.replace("/tema/listado");
    });
}
//Fin Update Tema
function onClickBotonModificar() {
  var boton = document.getElementById("botonModificar");
  var chargerModificar = document.getElementById("chargerModificar");

  chargerModificar.style.visibility = "visible";
  chargerModificar.style.opacity = "100";
  boton.innerHTML = "  Procesando...";
  boton.disabled = true;
}

function quitarDivModificar() {
  var descripcionMal = document.getElementById("descripcionMalUpdate");
  descripcionMal.style.visibility = "hidden";

  var boton = document.getElementById("botonModificar");
  var divCargaTemaUpdate = document.getElementById("chargerModificar");
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

const validarFormularioUpdate = (e) => {
  switch (e.target.name) {
    case "descripcionUpdate":
      validarCampoUpdate(
        expresionesUpdate.descripcion,
        e.target,
        "descripcionUpdate"
      );
      break;
  }
};

const validarCampoUpdate = (expresion, input, campo) => {
  var descripcionMal = document.getElementById("descripcionMalUpdate");
  var descripcionBien = document.getElementById("descripcionBienUpdate");
  descripcionBien.style.visibility = "hidden";
  descripcionMal.style.visibility = "hidden";

  if (expresion.test(input.value)) {
    camposUpdate[campo] = true;
  } else {
    descripcionMal.style.visibility = "visible";
    camposUpdate[campo] = false;
  }
};

const inputsUpdate = document.querySelectorAll("#formularioUpdate input");

inputsUpdate.forEach((input) => {
  input.addEventListener("keyup", validarFormularioUpdate);
});
