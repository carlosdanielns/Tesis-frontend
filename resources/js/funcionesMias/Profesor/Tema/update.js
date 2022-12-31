const asignaturaDelete = JSON.parse(localStorage.getItem("profesor"));

function cargarModal() {
  $("#modalUpdate").modal({ backdrop: "static", keyboard: false });
  $("#modalUpdate").modal("show");
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
    onClickBotonModificar();
    let token = JSON.parse(localStorage.getItem("token"));
    var urlAsignatura = "http://localhost:3000/api/v2/asignatura/descripcion/";

    //Aqui obtengo la asignatura por la cual el profesor hizo login
    fetch(urlAsignatura + asignaturaDelete.asignatura, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resFindDescripcion) => resFindDescripcion.json())
      .then((resFindDescripcion) => {
        var url = "http://localhost:3000/api/v2/tema/";

        var newDescripcion = $("#descripcionUpdate");
        var descripcionNew;

        if (newDescripcion.val() == "") {
          descripcionNew = descripcion;
        } else if (newDescripcion.val() != "") {
          descripcionNew = newDescripcion.val();
        }

        var data = { descripcion: descripcionNew };

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
      });
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
  var boton = document.getElementById("botonModificar");
  var divCargaTemaUpdate = document.getElementById("chargerModificar");
  chargerModificar.style.visibility = "hidden";
  chargerModificar.style.opacity = "0";
  boton.innerHTML = "Modificar Tema";
  boton.disabled = false;
}
