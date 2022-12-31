function getFile(files) {
  var file = files[0];
  var reader = new FileReader();
  console.log(reader);
  reader.onload = function (e) {
    var datosJSON = JSON.parse(e.target.result);

    datosJSON.forEach((element) => {
      console.log(datosJSON);

      var descripcion = element.descripcion;
      var anno = element.ano;

      const url = "http://localhost:3000/api/v2/asignatura";
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
          console.log(res);
          var isExi = false;
          for (let w = 0; w < res.length && isExi == false; w++) {
            if (res[w].descripcion == descripcion && res[w].ano == anno) {
              isExi = true;
            }
          }
          console.log(isExi);

          if (isExi == false) {
            var creado = crear(descripcion, anno, token);
            console.log("se creo");
          }
        });

      $("#cargarDatos").modal({ backdrop: "static", keyboard: false });
      $("#cargarDatos").modal("show");

      const model = document.getElementById("closeCargarDatos");
      model.addEventListener("click", saltar);

      function saltar() {
        //location.replace("/asignatura/listado");
      }
    });
  };
  reader.readAsText(file);
}

function crear(descripcion, anno, token) {
  const url = "http://localhost:3000/api/v2/asignatura/";

  var data = { descripcion: descripcion, ano: anno };
  console.log(data);
  fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((resCreateAsignatura) => resCreateAsignatura.json())
    .then((resCreateAsignatura) => {});
}
