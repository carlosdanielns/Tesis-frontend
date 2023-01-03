const expresionesUpdate = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  CI: /^.{11}$/, // 4 a 12 digitos.
};

const camposUpdate = {
  nombreUpdate: false,
  CIUpdate: false,
};

function cargarModal() {
  $("#modalUpdate").modal({ backdrop: "static", keyboard: false });
  $("#modalUpdate").modal("show");
  var nombreBienUpdate = document.getElementById("nombreBienUpdate");
  nombreBienUpdate.style.visibility = "hidden";
  var CIBienUpdate = document.getElementById("CIBienUpdate");
  CIBienUpdate.style.visibility = "hidden";
  quitarDivModificar();
}

function update(id, name, CI, annoCurso) {
  cargarModal();
  const nombreUpdate = document.getElementById("nombreUpdate");
  nombreUpdate.value = name;
  const CIUpdate = document.getElementById("CIUpdate");
  CIUpdate.value = CI;

  updateAsignatura(id, name, CI, annoCurso);
}

function updateAsignatura(id, nameTabla, CITabla, annoTabla) {
  $("#formularioUpdate").on("submit", function (e) {
    e.preventDefault();

    const urlEstudiante = "http://localhost:3000/api/v2/estudiante/";
    if (navigator.onLine) {
      server(urlEstudiante);
      var newNombre = $("#nombreUpdate");
      var newCI = $("#CIUpdate");
      var newAnno;

      const selectElement = document.getElementById("annoUpdate");
      selectElement.addEventListener("onchange", annoUpdate());

      function annoUpdate() {
        newAnno = selectElement.options[selectElement.selectedIndex].text;
      }

      var nameOK;
      if (newNombre.val() == "") {
        nameOK = nameTabla;
      } else {
        if (!expresionesUpdate.nombre.test(newNombre.val())) {
          var nombreMalUpdate = document.getElementById("nombreMalUpdate");
          nombreMalUpdate.style.visibility = "visible";
          return;
        } else {
          nameOK = newNombre.val();
        }
      }

      var CIOk;
      if (newCI.val() == "") {
        CIOk = CITabla;
      } else {
        if (!expresionesUpdate.CI.test(newCI.val())) {
          var CIMalUpdate = document.getElementById("CIMalUpdate");
          CIMalUpdate.style.visibility = "visible";
          return;
        } else {
          CIOk = newCI.val();
        }
      }

      var annoOK;
      if (newAnno == "Seleccione un Año") {
        annoOK = annoTabla;
      } else {
        annoOK = newAnno;
      }

      modificar(id, nameOK, CIOk, annoOK, nameTabla, CITabla);
    } else {
      $("#modalUpdate").modal("hide");
      $("#internet").modal("show");
    }
  });
}

function modificar(id, nameOK, CIOk, annoOK, nameTabla, CITabla, annoTabla) {
  onClickBotonModificar();
  const urlEstudiante = "http://localhost:3000/api/v2/estudiante/";
  let token = JSON.parse(localStorage.getItem("token"));

  const data = {
    name: nameOK,
    CI: CIOk,
    annoCurso: annoOK,
  };
  var tipo = "Estudiante";

  if (CIOk == CITabla && nameOK == nameTabla) {
    updateEstudiante(urlEstudiante, id, token, data);
  } else if (nameOK != nameTabla || CIOk != CITabla) {
    eliminarUser(CIOk, token, nameOK.split(" ")[0], tipo, id, data, CITabla);
  }
}

function eliminarUser(ciEstudiante, token, name, tipo, id, data, CITabla) {

  const urlUser = "http://localhost:3000/api/v2/user/" + CITabla;

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
      .then((resUserCI) => resUserCI.json())
      .then((resUserCI) => {
        //TODO: este metodo es para el eliminar el usuario
        const url = "http://localhost:3000/api/v2/user/" + resUserCI._id;
        fetch(url, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resUserDelete) => resUserDelete.json())
          .then((resUserDelete) => {
          })
          .finally(() => {
            createUser(name, ciEstudiante, tipo, token, id, data);
          });
      });
  } else {
    $("#modalUpdate").modal("hide");
    $("#internet").modal("show");
  }
}

function createUser(name, CI, tipo, token, id, data) {
  const urlUser =
    "http://localhost:3000/api/v2/user/" + name + "/" + CI + "/" + tipo;

  const urlEstudiante = "http://localhost:3000/api/v2/estudiante/";

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
        if (res.status == 401 || res.statusCode == 401) {
          $("#modal401").modal({
            backdrop: "static",
            keyboard: false,
          });
          $("#modal401").modal("show");
        }
      })
      .finally(() => {
        updateEstudiante(urlEstudiante, id, token, data);
      });
  } else {
    $("#modalUpdate").modal("hide");
    $("#internet").modal("show");
  }
}

function updateEstudiante(urlEstudiante, idEstudiante, token, data) {
  if (navigator.onLine) {
    server(urlEstudiante);
    fetch(urlEstudiante + idEstudiante, {
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
        location.replace("/estudiante/listado");
      });
  } else {
    $("#modalUpdate").modal("hide");
    $("#internet").modal("show");
  }
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
  var nombreMalUpdate = document.getElementById("nombreMalUpdate");
  nombreMalUpdate.style.visibility = "hidden";
  var CIMalUpdate = document.getElementById("CIMalUpdate");
  CIMalUpdate.style.visibility = "hidden";
  var comboMalUpdate = document.getElementById("comboMalUpdate");
  comboMalUpdate.style.visibility = "hidden";

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
    case "nombreUpdate":
      validarCampoUpdate(expresionesUpdate.nombre, e.target, "nombreUpdate");
      break;
    case "CIUpdate":
      validarCampoUpdate(expresionesUpdate.CI, e.target, "CIUpdate");
      break;
  }
};

const validarCampoUpdate = (expresion, input, campo) => {
  var nombreMalUpdate = document.getElementById("nombreMalUpdate");
  nombreMalUpdate.style.visibility = "hidden";

  var CIMalUpdate = document.getElementById("CIMalUpdate");
  CIMalUpdate.style.visibility = "hidden";

  if (expresion.test(input.value)) {
    camposUpdate[campo] = true;
  } else if (campo == "nombreUpdate") {
    nombreMalUpdate.style.visibility = "visible";
    camposUpdate[campo] = false;
  } else if (campo == "CIUpdate") {
    CIMalUpdate.style.visibility = "visible";
    camposUpdate[campo] = false;
  }
};

const inputsUpdate = document.querySelectorAll("#formularioUpdate input");

inputsUpdate.forEach((input) => {
  input.addEventListener("keyup", validarFormularioUpdate);
});
