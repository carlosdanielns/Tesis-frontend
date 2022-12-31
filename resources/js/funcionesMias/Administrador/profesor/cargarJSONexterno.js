function getFile(files) {
  var file = files[0];
  var reader = new FileReader();
  console.log(reader);
  reader.onload = function (e) {
    var datosJSON = JSON.parse(e.target.result);

    datosJSON.forEach((element) => {
      console.log(datosJSON);

      var name = element.name;
      var CI = element.CI;
      console.log(CI);
      var asignatura = element.asignatura;

      const url = "http://localhost:3000/api/v2/profesor";
      const token = JSON.parse(localStorage.getItem("token"));
      fetch(url, {
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
            console.log("BD" + res[w].CI);
            console.log("JSON" + CI);
            if (res[w].CI == CI) {
              isExi = true;
            }
          }

          if (isExi == false) {
            var creado = crear(name, CI, asignatura,token);
            console.log("se creo");
          }
        });

      $("#cargarDatos").modal({ backdrop: "static", keyboard: false });
      $("#cargarDatos").modal("show");

      /* const model = document.getElementById("closeCargarDatos");
      model.addEventListener("click", saltar);

      function saltar() {
        location.replace("/profesor/listado");
      }*/
    });
  };
  reader.readAsText(file);
}

function crear(name, CI, asignatura, token) {
  const url = "http://localhost:3000/api/v2/profesor";

  var data = { name: name, CI: CI, asignatura: asignatura };

  fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((resCreateProfesor) => resCreateProfesor.json())
    .then((resCreateProfesor) => {
      const urlUser =
        "http://localhost:3000/api/v2/user/" +
        resCreateProfesor.name +
        "/" +
        resCreateProfesor.CI +
        "/" +
        "Profesor";
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
