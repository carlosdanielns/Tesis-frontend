const temaUpdate = JSON.parse(localStorage.getItem("temaId"));
console.log(temaUpdate);

function cargarModal() {
  $("#modalUpdate").modal({ backdrop: "static", keyboard: false });
  $("#modalUpdate").modal("show");
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
    onClickBotonModificar();
    let token = JSON.parse(localStorage.getItem("token"));

    var urlNivel = "http://localhost:3000/api/v2/nivel/";

    var newDescripcion = $("#descripcionUpdate");
    var newNota5 = $("#nota5Update");
    var newTiempoDuracion = $("#tiempoDuracionUpdate");

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

    var data = {
      descripcion: newDescripcion.val(),
      nota5: nota5Guardar,
      tiempoDuracion: tiempoDuracionGuardar,
    };

    console.log(data);

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
  boton.innerHTML = "Modificar Nivel";
  boton.disabled = false;
}
