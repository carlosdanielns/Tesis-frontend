const expresionesUpdate = {
  descripcion: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
};

const camposUpdate = {
  descripcionUpdate: false,
};

const temaUpdate = JSON.parse(localStorage.getItem("temaId"));

function cargarModal() {
  $("#modalUpdate").modal({ backdrop: "static", keyboard: false });
  $("#modalUpdate").modal("show");

  var descripcionBienUpdate = document.getElementById("descripcionBienUpdate");
  descripcionBienUpdate.style.visibility = "hidden";
  var notaBienUpdate = document.getElementById("notaBienUpdate");
  notaBienUpdate.style.visibility = "hidden";
  var timepoDuracionBienUpdate = document.getElementById(
    "timepoDuracionBienUpdate"
  );
  timepoDuracionBienUpdate.style.visibility = "hidden";
  quitarDivModificar();
}

function update(id, descripcion, nota5Update, tiempoDuracionUpdate) {
  cargarModal();
  var nota5 = document.getElementById("nota5Update");
  nota5.setAttribute("max", 100);
  nota5.setAttribute("min", 1);

  var tiempoDuracion = document.getElementById("tiempoDuracionUpdate");
  tiempoDuracion.setAttribute("max", 1440);
  tiempoDuracion.setAttribute("min", 10);

  const inputDescripcion = document.getElementById("descripcionUpdate");
  inputDescripcion.value = descripcion;

  updateNivel(id, descripcion, nota5Update, tiempoDuracionUpdate);
}

function updateNivel(id, descripcion, nota5Update, tiempoDuracionUpdate) {
  $("#formularioUpdate").on("submit", function (e) {
    e.preventDefault();
    var urlNivel = "http://localhost:3000/api/v2/nivel/";

    if (navigator.onLine) {
      server(urlNivel);

      var newDescripcion = $("#descripcionUpdate");
      var newNota5 = $("#nota5Update");
      var newTiempoDuracion = $("#tiempoDuracionUpdate");

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

      var nota5Guardar;
      var tiempoDuracionGuardar;

      if (newNota5.val() == "" && newTiempoDuracion.val() == "") {
        nota5Guardar = nota5Update;
        tiempoDuracionGuardar = tiempoDuracionUpdate;
      } else if (newTiempoDuracion.val() == "") {
        tiempoDuracionGuardar = tiempoDuracionUpdate;
        nota5Guardar = newNota5.val();
      } else if (newNota5.val() == "") {
        nota5Guardar = nota5Update;
        tiempoDuracionGuardar = newTiempoDuracion.val();
      } else if (newNota5.val() != "" && newTiempoDuracion.val() != "") {
        nota5Guardar = newNota5.val();
        tiempoDuracionGuardar = newTiempoDuracion.val();
      }

      modificar(
        id,
        descripcionOK,
        nota5Guardar,
        tiempoDuracionGuardar,
        descripcion,
        nota5Update,
        tiempoDuracionUpdate
      );
    } else {
      $("#modalUpdate").modal("hide");
      $("#internet").modal("show");
    }
  });
}

function modificar(
  id,
  descripcionOK,
  nota5Guardar,
  tiempoDuracionGuardar,
  descripcion,
  nota5Update,
  tiempoDuracionUpdate
) {
  var urlNivel = "http://localhost:3000/api/v2/nivel/";
  let token = JSON.parse(localStorage.getItem("token"));

  if (navigator.onLine) {
    server(urlNivel);

    if (descripcionOK == descripcion) {
      put(urlNivel, id, descripcionOK, nota5Guardar, tiempoDuracionGuardar);
    } else {
      onClickBotonModificar();
      fetch(urlNivel, {
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
              res[j].descripcion == descripcionOK &&
              res[j].nota5 == nota5Guardar &&
              res[j].tiempoDuracion == tiempoDuracionGuardar
            ) {
              var descripcionBienUpdate = document.getElementById(
                "descripcionBienUpdate"
              );
              descripcionBienUpdate.style.visibility = "visible";
              var notaBienUpdate = document.getElementById("notaBienUpdate");
              notaBienUpdate.style.visibility = "visible";
              var timepoDuracionBienUpdate = document.getElementById(
                "timepoDuracionBienUpdate"
              );
              timepoDuracionBienUpdate.style.visibility = "visible";
              find = true;
            }
          }

          if (find == false) {
            put(
              urlNivel,
              id,
              descripcionOK,
              nota5Guardar,
              tiempoDuracionGuardar
            );
          }
        })
        .finally(() => {
          quitarDivModificar();
        });
    }
  }
}

function put(urlNivel, id, descripcionOK, nota5Guardar, tiempoDuracionGuardar) {
  let token = JSON.parse(localStorage.getItem("token"));
  var data = {
    descripcion: descripcionOK,
    nota5: nota5Guardar,
    tiempoDuracion: tiempoDuracionGuardar,
  };

  fetch(urlNivel + id, {
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
      quitarDivModificar();
      location.replace("/nivel/listado");
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
  var descripcionMal = document.getElementById("descripcionMalUpdate");
  descripcionMal.style.visibility = "hidden";

  var boton = document.getElementById("botonModificar");
  var chargerModificar = document.getElementById("chargerModificar");
  chargerModificar.style.visibility = "hidden";
  chargerModificar.style.opacity = "0";
  boton.innerHTML = "Modificar Nivel";
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

  var notaBienUpdate = document.getElementById("notaBienUpdate");
  notaBienUpdate.style.visibility = "hidden";
  var timepoDuracionBienUpdate = document.getElementById(
    "timepoDuracionBienUpdate"
  );
  timepoDuracionBienUpdate.style.visibility = "hidden";

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
