const expresionesUpdate = {
  descripcion: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
};

const camposUpdate = {
  descripcionUpdate: false,
};

function cargarModal() {
  $("#modalUpdate").modal({ backdrop: "static", keyboard: false });
  $("#modalUpdate").modal("show");
  var descripcionBien = document.getElementById("descripcionBienUpdate");
  descripcionBien.style.visibility = "hidden";
  quitarDivModificar();
}

function borrarUpdate() {
  var comboMal = document.getElementById("comboMalUpdate");
  comboMal.style.visibility = "hidden";
}

function update(id, descripcion, anno) {
  cargarModal();
  const inputDescripcion = document.getElementById("descripcionUpdate");
  inputDescripcion.value = descripcion;
  updateAsignatura(id, descripcion, anno);
}

function updateAsignatura(id, descripcion, anno) {
  $("#formularioUpdate").on("submit", function (e) {
    e.preventDefault();
    const urlAsignatura = "http://localhost:3000/api/v2/asignatura/";
    if (navigator.onLine) {
      server(urlAsignatura);
      var newDescripcion = $("#descripcionUpdate");
      var newAnno;

      const selectElement = document.getElementById("annoUpdate");
      selectElement.addEventListener("onchange", annoUpdate());

      function annoUpdate() {
        newAnno = selectElement.options[selectElement.selectedIndex].text;
      }

      var descripcionOK;
      if (newDescripcion.val() == "") {
        descripcionOK = descripcion;
      } else {
        if (!expresionesUpdate.descripcion.test(newDescripcion.val())) {
          var descripcionBien = document.getElementById(
            "descripcionMalUpdate"
          );
          descripcionBien.style.visibility = "visible";
          return;
        } else {
          descripcionOK = newDescripcion.val();
        }
      }

      var annoOK;
      if (newAnno == "Seleccione un Año") {
        annoOK = anno;
      } else {
        annoOK = newAnno;
      }

      modificar(id, descripcionOK, annoOK, descripcion, anno);
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
  boton.innerHTML = "Procesando...";
  boton.disabled = true;
}

function quitarDivModificar() {
  var descripcionMal = document.getElementById("descripcionMalUpdate");
  descripcionMal.style.visibility = "hidden";
  var comboBien = document.getElementById("comboBienUpdate");
  comboBien.style.visibility = "hidden";
  var comboMal = document.getElementById("comboMalUpdate");
  comboMal.style.visibility = "hidden";

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

function modificar(id, descripcionOK, annoOK, descripcion, anno) {

  const urlAsignatura = "http://localhost:3000/api/v2/asignatura/";
  const token = JSON.parse(localStorage.getItem("token"));

  if (navigator.onLine) {
    server(urlAsignatura);

    if (descripcion == descripcionOK && annoOK == anno) {
      put(urlAsignatura, id, descripcionOK, annoOK, token);
    } else {
      onClickBotonModificar();

      fetch(urlAsignatura, {
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
            if (res[j].descripcion == descripcionOK && res[j].anno == annoOK) {
              var descripcionBienUpdate = document.getElementById(
                "descripcionBienUpdate"
              );
              descripcionBienUpdate.style.visibility = "visible";
              find = true;
            }
          }

          if (find == false) {
            put(urlAsignatura, id, descripcionOK, annoOK, token);
          }
        })
        .finally(() => {
          quitarDivModificar();
        });
    }
  }
  else {
    $("#modalUpdate").modal("hide");
    $("#internet").modal("show");
  }
}

function put(urlAsignatura, id, descripcion, anno, token) {
  onClickBotonModificar();
  const data = {
    descripcion: descripcion,
    anno: anno,
  };

  fetch(urlAsignatura + id, {
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
      location.replace("/asignatura/listado");
    });
}
