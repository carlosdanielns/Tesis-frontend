function cargarModal() {
  $("#modalUpdate").modal({ backdrop: "static", keyboard: false });
  $("#modalUpdate").modal("show");
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
    onClickBotonModificar();
    const urlEstudiante = "http://localhost:3000/api/v2/estudiante/";
    const token = JSON.parse(localStorage.getItem("token"));

    if (navigator.onLine) {
      server(urlEstudiante);
      var newNombre = $("#nombreUpdate");
      var newCI = $("#CIUpdate");
      const selectElement = document.getElementById("annoUpdate");
      selectElement.addEventListener("onchange", annoUpdate());

      function annoUpdate() {
        newAnno = selectElement.options[selectElement.selectedIndex].text;
      }

      var nameOK;
      var nameInput = newNombre.val();
      var nameSplit = nameInput.split(" ");

      var nameSplitTabla = nameTabla.split(" ");
      if (newNombre.val() == "") {
        nameOK = nameSplitTabla[0];
      } else {
        nameOK = nameSplit[0];
      }

      var CIOk;
      if (newCI.val() == "") {
        CIOk = CITabla;
      } else {
        CIOk = newCI.val();
      }

      const data = {
        name: nameOK,
        CI: CIOk,
        annoCurso: newAnno,
      };

      const name = newNombre.val();
      const CI = newCI.val();
      const tipo = "Estudiante";

      if (CI == CITabla && nameSplitTabla[0] == nameSplit[0]) {
        updateEstudiante(urlEstudiante, id, token, data);
      } else if (nameSplitTabla[0] != nameSplit[0] || CITabla != newCI.val()) {
        eliminarUser(CITabla, token);
        createUser(nameSplit[0], CI, tipo, token);
        updateEstudiante(urlEstudiante, id, token, data);
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
        quitarDivCrear();
        location.replace("/estudiante/listado");
      });
  } else {
    $("#modalUpdate").modal("hide");
    $("#internet").modal("show");
  }
}

function eliminarUser(ciEstudiante, token) {
  const urlUser = "http://localhost:3000/api/v2/user/" + ciEstudiante;

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
