function getFile(files) {
  var file = files[0];
  var reader = new FileReader();
  reader.onload = function (e) {
    var datosJSON = JSON.parse(e.target.result);

    datosJSON.forEach((element) => {
      var name = element.name;
      var CI = element.CI;

      const urlEstudiante = "http://localhost:3000/api/v2/estudiante";
      const token = JSON.parse(localStorage.getItem("token"));
      fetch(urlEstudiante, {
        method: "get",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          var isExi = false;
          for (let w = 0; w < res.length && isExi == false; w++) {
            if (res[w].CI == CI) {
              isExi = true;
            }
          }

          if (isExi == false) {
            var creado = crear(name, CI, token);
            console.log("se creo");
          }
        });
    });
  };
  $("#cargarDatos").modal({ backdrop: "static", keyboard: false });
  $("#cargarDatos").modal("show");

  const model = document.getElementById("closeCargarDatos");
  model.addEventListener("click", saltar);

  function saltar() {
    location.replace("/estudiante/listado");
  }
  reader.readAsText(file);
}

function crear(name, CI, token) {
  const url = "http://localhost:3000/api/v2/estudiante";

  var data = { name: name, CI: CI };

  fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((resCreateEstudiante) => resCreateEstudiante.json())
    .then((resCreateEstudiante) => {
      const urlUser =
        "http://localhost:3000/api/v2/user/" +
        resCreateEstudiante.name +
        "/" +
        resCreateEstudiante.CI +
        "/" +
        "Estudiante";
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
          console.log(res);
        });
    });
}
