//Abrir modal Crear
function abrirModalCrear() {
  $("#modalCrear").modal({ backdrop: "static", keyboard: false });
  $("#modalCrear").modal("show");
  quitarDivCrear();
}
//Fin modal Crear

window.addEventListener("load", cargar);

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
        console.log(res);
        var select = document.getElementById("asignatura"); //Seleccionamos el select
        for (var i = 0; i < res.length; i++) {
          var option = document.createElement("option"); //Creamos la opcion
          option.innerHTML = res[i].descripcion; //Metemos el texto en la opción
          select.appendChild(option); //Metemos la opción en el select
        }
      });
  } else {
    $("#modalCrear").modal("hide");
    $("#internet").modal("show");
  }
}

$("#formularioCreate").on("submit", function (e) {
  e.preventDefault();
  onClickBotonCrear();
  const urlProfesor = "http://localhost:3000/api/v2/profesor";
  let token = JSON.parse(localStorage.getItem("token"));

  var newNombre = $("#nombre");
  var newCI = $("#CI");
  var newAsignatura;

  if (navigator.onLine) {
    server(urlProfesor);

    const selectElement = document.getElementById("asignatura");
    selectElement.addEventListener("onchange", asignatura());

    function asignatura() {
      newAsignatura = selectElement.options[selectElement.selectedIndex].text;
    }

    const data = {
      name: newNombre.val(),
      CI: newCI.val(),
      asignatura: newAsignatura,
    };

    fetch(urlProfesor, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const CI = res.CI;
        const name = res.name;
        var nameSplit = name.split(" ");
        const tipo = "Profesor";
        const urlUser =
          "http://localhost:3000/api/v2/user/" +
          nameSplit[0] +
          "/" +
          CI +
          "/" +
          tipo;

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
            quitarDivCrear();
            location.replace("/profesor/listado");
          });
      });
  } else {
    $("#modalCrear").modal("hide");
    $("#internet").modal("show");
  }
});

function onClickBotonCrear() {
  var boton = document.getElementById("botonInsertar");
  var chargerInsertar = document.getElementById("chargerInsertar");
  chargerInsertar.style.visibility = "visible";
  chargerInsertar.style.opacity = "100";
  boton.innerHTML = "Procesando...";
  boton.disabled = true;
}

function quitarDivCrear() {
  var boton = document.getElementById("botonInsertar");
  var chargerInsertar = document.getElementById("chargerInsertar");
  chargerInsertar.style.visibility = "hidden";
  chargerInsertar.style.opacity = "0";
  boton.innerHTML = "Insertar Estudiante";
  boton.disabled = false;
}

var formulario = document.getElementById("formularioCreate");
var close = document.getElementById("close");

close.addEventListener("click", function () {
  formulario.reset();
});

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
