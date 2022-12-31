function cargarModal() {
  $("#modalUpdate").modal({ backdrop: "static", keyboard: false });
  $("#modalUpdate").modal("show");
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
  cargarModal();
  const nombreUpdate = document.getElementById("nombreUpdate");
  nombreUpdate.value = name;
  const CIUpdate = document.getElementById("CIUpdate");
  CIUpdate.value = CI;

  updateAsignatura(id, name, CI, asignatura);
}

function updateAsignatura(id, nameTabla, CITabla, asignaturaTabla) {
  $("#formularioUpdate").on("submit", function (e) {
    e.preventDefault();
    onClickBotonModificar();
    const urlProfesor = "http://localhost:3000/api/v2/profesor/";
    var newNombre = $("#nombreUpdate");
    var newCI = $("#CIUpdate");
    var newAsignatura;

    if (navigator.onLine) {
      server(urlProfesor);

      const selectElement = document.getElementById("asignaturaUpdate");
      selectElement.addEventListener("onchange", asignatura());

      function asignatura() {
        newAsignatura = selectElement.options[selectElement.selectedIndex].text;
      }

      var asignaturaOK;

      var nombreOk;
      var nombreSinSplit = newNombre.val();
      var nombreSplit = nombreSinSplit.split(" ");

      var nombreTablaSplit = nameTabla.split(" ");
      if (newNombre.val() == "") {
        nombreOk = nombreTablaSplit[0];
      } else {
        nombreOk = nombreSplit[0];
      }

      var CIOK;

      if (newCI.val() == "") {
        CIOK = CITabla;
      } else {
        CIOK = newCI.val();
      }

      const data = {
        name: nombreOk,
        CI: CIOK,
        asignatura: newAsignatura,
      };

      const tipo = "Profesor";
      let token = JSON.parse(localStorage.getItem("token"));
      if (CITabla == CIOK && nombreTablaSplit[0] == nombreSplit[0]) {
        updateProfesor(urlProfesor, id, token, data);
      } else if (nombreTablaSplit[0] != nombreSplit[0] || CITabla != CIOK) {
        eliminarUser(CITabla, token);
        createUser(nombreSplit[0], CIOK, tipo, token);
        updateProfesor(urlProfesor, id, token, data);
      }
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
  var boton = document.getElementById("botonModificar");
  var chargerModificar = document.getElementById("chargerModificar");
  chargerModificar.style.visibility = "hidden";
  chargerModificar.style.opacity = "0";
  boton.innerHTML = "Modificar Tema";
  boton.disabled = false;
}

function createUser(name, CI, tipo, token) {
  const urlUser =
    "http://localhost:3000/api/v2/user/" + name + "/" + CI + "/" + tipo;

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
        quitarDivCrear();
        location.replace("/profesor/listado");
      });
  } else {
    $("#modalUpdate").modal("hide");
    $("#internet").modal("show");
  }
}

function eliminarUser(ciProfesor, token) {
  const urlUser = "http://localhost:3000/api/v2/user/" + ciProfesor;

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
      });
  } else {
    $("#modalUpdate").modal("hide");
    $("#internet").modal("show");
  }
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
