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

function cargar() {
  const url = "http://localhost:3000/api/v2/asignatura";
  let token = JSON.parse(localStorage.getItem("token"));

  if (navigator.onLine) {
    server(url);
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
        var select = document.getElementById("asignaturaUpdate"); //Seleccionamos el select
        for (var i = 0; i < res.length; i++) {
          var option = document.createElement("option"); //Creamos la opcion
          option.innerHTML = res[i].descripcion; //Metemos el texto en la opción
          select.appendChild(option); //Metemos la opción en el select
        }
      });
  } else {
    $("#modalUpdate").modal("hide");
    $("#internet").modal("show");
  }
}
window.addEventListener("load", cargar);

function update(id, name, CI, asignatura) {
  console.log(asignatura);
  cargarModal();
  const nombreUpdate = document.getElementById("nombreUpdate");
  nombreUpdate.value = name;
  const CIUpdate = document.getElementById("CIUpdate");
  CIUpdate.value = CI;

  updateprofesor(id, name, CI, asignatura);
}

function updateprofesor(id, nameTabla, CITabla, asignaturaTabla) {
  $("#formularioUpdate").on("submit", function (e) {
    e.preventDefault();
    const urlProfesor = "http://localhost:3000/api/v2/profesor/";

    if (navigator.onLine) {
      server(urlProfesor);
      var newNombre = $("#nombreUpdate");
      var newCI = $("#CIUpdate");
      var newAsignatura;

      const selectElement = document.getElementById("asignaturaUpdate");
      selectElement.addEventListener("onchange", asignatura());

      function asignatura() {
        newAsignatura = selectElement.options[selectElement.selectedIndex].text;
      }

      var nombreOk;
      if (newNombre.val() == "") {
        nombreOk = nameTabla;
      } else {
        if (!expresionesUpdate.nombre.test(newNombre.val())) {
          var nombreMalUpdate = document.getElementById("nombreMalUpdate");
          nombreMalUpdate.style.visibility = "visible";
          return;
        } else {
          nombreOk = newNombre.val();
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

      var asignaturaOK;
      if (newAsignatura == "Seleccione una asignatura") {
        asignaturaOK = asignaturaTabla;
      } else {
        asignaturaOK = newAsignatura;
      }
      console.log(asignaturaOK);

      modificar(
        id,
        nombreOk,
        CIOk,
        asignaturaOK,
        nameTabla,
        CITabla,
        asignaturaTabla
      );
    } else {
      $("#modalUpdate").modal("hide");
      $("#internet").modal("show");
    }
  });
}

function modificar(
  id,
  nameOK,
  CIOk,
  asignaturaOK,
  nameTabla,
  CITabla,
  asignaturaTabla
) {
  onClickBotonModificar();

  const urlProfesor = "http://localhost:3000/api/v2/profesor/";
  let token = JSON.parse(localStorage.getItem("token"));

  const data = {
    name: nameOK,
    CI: CIOk,
    asignatura: asignaturaOK,
  };
  const tipo = "Profesor";

  if (CITabla == CIOk && nameOK == nameTabla) {
    updateProfesor(urlProfesor, id, token, data);
  } else if (nameOK != nameTabla || CIOk != CITabla) {
    eliminarUser(CIOk, token, nameOK.split(" ")[0], tipo, id, data, CITabla);
  }
}

function eliminarUser(CI, token, name, tipo, id, data, CITabla) {
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
        //TODO: este metoodo es para el eliminar el usuario
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
            console.log("ser elimino el usuario");
          });
      })
      .finally(() => {
        createUser(name, CI, tipo, token, id, data);
      });
  } else {
    $("#modalUpdate").modal("hide");
    $("#internet").modal("show");
  }
}

function createUser(name, CI, tipo, token, id, data) {
  const urlUser =
    "http://localhost:3000/api/v2/user/" + name + "/" + CI + "/" + tipo;

  const urlProfesor = "http://localhost:3000/api/v2/profesor/";

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
        console.log("se creo el usuario");
      })
      .finally(() => {
        updateProfesor(urlProfesor, id, token, data);
      });
  } else {
    $("#modalUpdate").modal("hide");
    $("#internet").modal("show");
  }
}

function updateProfesor(urlProfesor, idProfesor, token, data) {
  if (navigator.onLine) {
    server(urlProfesor);
    fetch(urlProfesor + idProfesor, {
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
        location.replace("/profesor/listado");
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
  console.log(e);
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
