const expresiones4x1 = {
  descripcion: /^[a-zA-Z0-9_.+-\_\-]{1,100}$/, // Letras y espacios, pueden llevar acentos.
  respuestaCorrecta: /^[a-zA-Z0-9\_\-]{1,100}$/, // Letras, numeros, guion y guion_bajo
  respuestaIncorrecta: /^[a-zA-Z0-9\_\-]{1,100}$/, // Letras, numeros, guion y guion_bajo
  respuestaIncorrecta1: /^[a-zA-Z0-9\_\-]{1,100}$/, // Letras, numeros, guion y guion_bajo
  respuestaIncorrecta2: /^[a-zA-Z0-9\_\-]{1,100}$/, // Letras, numeros, guion y guion_bajo
};

const campos4x1 = {
  descripcion: false,
  respuestaCorrecta: false,
  respuestaIncorrecta: false,
  respuestaIncorrecta1: false,
  respuestaIncorrecta2: false,
};

const expresionesVoF = {
  descripcion: /^[a-zA-Z0-9_.+-\_\-]{1,100}$/, // Letras y espacios, pueden llevar acentos.
};

const camposVoF = {
  descripcion: false,
};

const expresionesImagen = {
  descripcion: /^[a-zA-Z0-9_.+-\_\-]{1,100}$/, // Letras y espacios, pueden llevar acentos.
  respuestaCorrecta: /^[a-zA-Z0-9\_\-]{1,100}$/, // Letras, numeros, guion y guion_bajo
  respuestaIncorrecta: /^[a-zA-Z0-9\_\-]{1,100}$/, // Letras, numeros, guion y guion_bajo
  respuestaIncorrecta1: /^[a-zA-Z0-9\_\-]{1,100}$/, // Letras, numeros, guion y guion_bajo
  respuestaIncorrecta2: /^[a-zA-Z0-9\_\-]{1,100}$/, // Letras, numeros, guion y guion_bajo
  imagen: /(\.wav|\.mp3|\.mp4|\.mid)$/,
};

const camposImagen = {
  descripcion: false,
  respuestaCorrecta: false,
  respuestaIncorrecta: false,
  respuestaIncorrecta1: false,
  respuestaIncorrecta2: false,
  imagen: false,
};

const nivelCrear = JSON.parse(localStorage.getItem("nivelId"));
console.log(nivelCrear);

function abrirModalCrear() {
  $("#modalTipoPregunta").modal({ backdrop: "static", keyboard: false });
  $("#modalTipoPregunta").modal("show");
}

cargarTipoPregunta();
//Crear Pregunta 4 x 1
$("#formularioCreate4x1").on("submit", function (e) {
  e.preventDefault();

  const url = "http://localhost:3000/api/v2/pregunta/";

  if (navigator.onLine) {
    server(url);

    var newDescripcion = $("#descripcion4x1");
    var newRespuestaCorrecta = $("#respuestaCorrecta4x1");
    var newRespuestaIncorrecta = $("#respuestaIncorrecta4x1");
    var newRespuestaIncorrecta1 = $("#respuestaIncorrecta14x1");
    var newRespuestaIncorrecta2 = $("#respuestaIncorrecta24x1");

    if (!expresiones4x1.descripcion.test(newDescripcion.val())) {
      var descripcionMal = document.getElementById("descripcionMal");
      descripcionMal.style.visibility = "visible";
      return;
    }

    if (!expresiones4x1.respuestaCorrecta.test(newRespuestaCorrecta.val())) {
      var respuestaCorrectaMal = document.getElementById(
        "respuestaCorrectaMal"
      );
      respuestaCorrectaMal.style.visibility = "visible";
      return;
    }

    if (
      !expresiones4x1.respuestaIncorrecta.test(newRespuestaIncorrecta.val())
    ) {
      var respuestaIncorrectaMal = document.getElementById(
        "respuestaIncorrectaMal"
      );
      respuestaIncorrectaMal.style.visibility = "visible";
      return;
    }

    if (
      !expresiones4x1.respuestaIncorrecta1.test(newRespuestaIncorrecta1.val())
    ) {
      var respuestaIncorrecta1Mal = document.getElementById(
        "respuestaIncorrecta1Mal"
      );
      respuestaIncorrecta1Mal.style.visibility = "visible";
      return;
    }

    if (
      !expresiones4x1.respuestaIncorrecta2.test(newRespuestaIncorrecta1.val())
    ) {
      var respuestaIncorrecta2Mal = document.getElementById(
        "respuestaIncorrecta2Mal"
      );
      respuestaIncorrecta2Mal.style.visibility = "visible";
      return;
    }

    agregar4x1(
      newDescripcion.val(),
      newRespuestaCorrecta.val(),
      newRespuestaIncorrecta.val(),
      newRespuestaIncorrecta1.val(),
      newRespuestaIncorrecta2.val()
    );
  } else {
    $("#modalCrear4x1").modal("hide");
    $("#internet").modal("show");
  }
});

function agregar4x1(
  descripcion,
  respuestaCorrecta,
  respuestaIncorrecta,
  respuestaIncorrecta1,
  respuestaIncorrecta2
) {
  const url = "http://localhost:3000/api/v2/pregunta/";
  let token = JSON.parse(localStorage.getItem("token"));

  onClickBotonCrear4x1();

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
        var find = false;
        for (let j = 0; j < res.length && find == false; j++) {
          if (
            res[j].descripcion == descripcion &&
            res[j].respuestaCorrecta == respuestaCorrecta &&
            res[j].respuestaIncorrecta == respuestaIncorrecta &&
            res[j].respuestaIncorrecta1 == respuestaIncorrecta1 &&
            res[j].respuestaIncorrecta2 == respuestaIncorrecta2 &&
            res[j].tiposDePregunta == "4 x 1"
          ) {
            var descripcionBien = document.getElementById("descripcionBien");
            descripcionBien.style.visibility = "visible";
            var respuestaCorrectaBien = document.getElementById(
              "respuestaCorrectaBien"
            );
            respuestaCorrectaBien.style.visibility = "visible";
            var respuestaIncorrectaBien = document.getElementById(
              "respuestaIncorrectaBien"
            );
            respuestaIncorrectaBien.style.visibility = "visible";
            var respuestaIncorrecta1Bien = document.getElementById(
              "respuestaIncorrecta1Bien"
            );
            respuestaIncorrecta1Bien.style.visibility = "visible";
            var respuestaIncorrecta2Bien = document.getElementById(
              "respuestaIncorrecta2Bien"
            );
            respuestaIncorrecta2Bien.style.visibility = "visible";
            find = true;
          }
        }

        if (find == false) {
          onClickBotonCrear4x1();
          var data = {
            descripcion: descripcion,
            respuestaCorrecta: respuestaCorrecta,
            respuestaIncorrecta: respuestaIncorrecta,
            respuestaIncorrecta1: respuestaIncorrecta1,
            respuestaIncorrecta2: respuestaIncorrecta2,
            tiposDePregunta: "4 x 1",
            imagen: "No",
          };

          fetch(url, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json, text/plain, */*",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          })
            .then((resPost) => resPost.json())
            .then((resPost) => {
              const urlAddPregunta =
                "http://localhost:3000/api/v2/nivel/" +
                nivelCrear.id +
                "/pregunta/" +
                resPost._id;

              fetch(urlAddPregunta, {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json, text/plain, */*",
                  Authorization: `Bearer ${token}`,
                },
              })
                .then((resAddPregunta) => resAddPregunta.json())
                .then((resAddPregunta) => {
                  if (
                    resAddPregunta.status == 401 ||
                    resAddPregunta.statusCode == 401
                  ) {
                    $("#modal401").modal({
                      backdrop: "static",
                      keyboard: false,
                    });
                    $("#modal401").modal("show");
                  }
                })
                .finally(() => {
                  quitarDivCrear4x1();
                  location.replace("/pregunta/listado");
                });
            });
        }
      })
      .finally(() => {
        quitarDivCrear4x1();
      });
  }
}
// Fin Crear Pregunta 4 x 1

//Crear Pregunta V o F
$("#formularioCreateVoF").on("submit", function (e) {
  e.preventDefault();
  const url = "http://localhost:3000/api/v2/pregunta";

  if (navigator.onLine) {
    server(url);

    var newDescripcion = $("#descripcionVoF");
    var newRespuestaCorrecta = document.querySelector(
      "input[name=flexRadioDefault]:checked"
    ).value;
    var newRespuestaIncorrecta;

    if (newRespuestaCorrecta == "Verdadero") {
      newRespuestaIncorrecta = "Falso";
    } else {
      newRespuestaIncorrecta = "Verdadero";
    }

    if (!expresionesVoF.descripcion.test(newDescripcion.val())) {
      var descripcionMalVoF = document.getElementById("descripcionMalVoF");
      descripcionMalVoF.style.visibility = "visible";
      return;
    }

    agregarVoF(
      newDescripcion.val(),
      newRespuestaCorrecta,
      newRespuestaIncorrecta
    );
  } else {
    $("#modalCrearVoF").modal("hide");
    $("#internet").modal("show");
  }
});

function agregarVoF(descripcion, respuestaCorrecta, respuestaIncorrecta) {
  const url = "http://localhost:3000/api/v2/pregunta";
  let token = JSON.parse(localStorage.getItem("token"));

  onClickBotonCrearVoF();

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
        var find = false;
        for (let j = 0; j < res.length && find == false; j++) {
          if (
            res[j].descripcion == descripcion &&
            res[j].respuestaCorrecta == respuestaCorrecta &&
            res[j].tiposDePregunta == "V o F"
          ) {
            var descripcionBienVoF =
              document.getElementById("descripcionBienVoF");
            descripcionBienVoF.style.visibility = "visible";

            var respuestaCorrectaBienVoF = document.getElementById(
              "respuestaCorrectaBienVoF"
            );
            respuestaCorrectaBienVoF.style.visibility = "visible";

            find = true;
          }
        }

        if (find == false) {
          onClickBotonCrearVoF();

          var data = {
            descripcion: descripcion,
            respuestaCorrecta: respuestaCorrecta,
            respuestaIncorrecta: respuestaIncorrecta,
            respuestaIncorrecta1: "No",
            respuestaIncorrecta2: "No",
            tiposDePregunta: "V o F",
            imagen: "No",
          };

          fetch(url, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json, text/plain, */*",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          })
            .then((resPost) => resPost.json())
            .then((resPost) => {
              const urlAddPregunta =
                "http://localhost:3000/api/v2/nivel/" +
                nivelCrear.id +
                "/pregunta/" +
                resPost._id;

              fetch(urlAddPregunta, {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json, text/plain, */*",
                  Authorization: `Bearer ${token}`,
                },
              })
                .then((resAddPregunta) => resAddPregunta.json())
                .then((resAddPregunta) => {
                  if (
                    resAddPregunta.status == 401 ||
                    resAddPregunta.statusCode == 401
                  ) {
                    $("#modal401").modal({
                      backdrop: "static",
                      keyboard: false,
                    });
                    $("#modal401").modal("show");
                  }
                })
                .finally(() => {
                  quitarDivCrearVoF();
                  location.replace("/pregunta/listado");
                });
            });
        }
      })
      .finally(() => {
        quitarDivCrearVoF();
      });
  }
}
// Fin Crear Pregunta V o F

//Crear Pregunta Imagen
$("#formularioCreateImagen").on("submit", function (e) {
  const urlPreguntaImagen = "http://localhost:3000/api/v2/pregunta/imagen";
  let token = JSON.parse(localStorage.getItem("token"));

  e.preventDefault();
  onClickBotonCrearImagen();

  var newDescripcion = $("#descripcionImagen");
  var newRespuestaCorrecta = $("#respuestaCorrectaImagen");
  var newRespuestaIncorrecta = $("#respuestaIncorrectaImagen");
  var newRespuestaIncorrecta1 = $("#respuestaIncorrecta1Imagen");
  var newRespuestaIncorrecta2 = $("#respuestaIncorrecta2Imagen");

  var formData = new FormData();
  var files = $("#imagen")[0].files[0];
  formData.append("file", files);

  formData.append("descripcion", newDescripcion.val());
  formData.append("respuestaCorrecta", newRespuestaCorrecta.val());
  formData.append("respuestaIncorrecta", newRespuestaIncorrecta.val());
  formData.append("respuestaIncorrecta1", newRespuestaIncorrecta1.val());
  formData.append("respuestaIncorrecta2", newRespuestaIncorrecta2.val());
  formData.append("tiposDePregunta", "Imagen");

  fetch(urlPreguntaImagen, {
    method: "post",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((resPost) => resPost.json())
    .then((resPost) => {
      const urlAddPregunta =
        "http://localhost:3000/api/v2/nivel/" +
        nivelCrear.id +
        "/pregunta/" +
        resPost._id;

      console.log(urlAddPregunta);
      fetch(urlAddPregunta, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resAddPregunta) => resAddPregunta.json())
        .then((resAddPregunta) => {
          if (
            resAddPregunta.status == 401 ||
            resAddPregunta.statusCode == 401
          ) {
            $("#modal401").modal({
              backdrop: "static",
              keyboard: false,
            });
            $("#modal401").modal("show");
          }
        })
        .finally(() => {
          quitarDivCrearImagen();
          location.replace("/pregunta/listado");
        });
    });
});
// Fin Crear Pregunta Imagen

function cargarTipoPregunta() {
  /*var tipos = ["V o F", "4 x 1", "Imagen"];
  var divPrincipalModal = document.getElementById("divPrincipalModal");

  var form = document.createElement("form");
  form.id = "formularioTipo";

  var divForm = document.createElement("div");
  divForm.className = "form-outline form-white row mb-3";

  var label = document.createElement("label");
  label.className = "col-6 col-form-label";
  label.innerHTML = "Tipo de Pregunta:";
  label.htmlFor = "tipos";

  var select = document.createElement("select");
  select.className = "form-control form-control-lg";
  select.id = "tipos";

  for (var i = 0; i < tipos.length; i++) {
    var option = document.createElement("option");
    option.innerHTML = tipos[i];
    select.appendChild(option);
  }

  var boton = document.createElement("button");
  boton.type = "submit";
  boton.className = "form-control form-control-lg";
  boton.id = "botonSiguiente";
  boton.innerHTML = "Siguiente";

  divForm.appendChild(label);
  divForm.appendChild(select);
  divForm.appendChild(boton);

  form.appendChild(divForm);
  divPrincipalModal.appendChild(form);*/

  var botonSiguiente = document.getElementById("botonSiguiente");
  console.log(botonSiguiente);
  botonSiguiente.addEventListener("click", function (e) {
    e.preventDefault();
    var newTipo;

    const selectElement = document.getElementById("tipos");
    selectElement.addEventListener("onchange", tipos());

    function tipos() {
      newTipo = selectElement.options[selectElement.selectedIndex].text;
    }

    console.log(newTipo);

    switch (newTipo) {
      case "V o F":
        var descripcionBienVoF = document.getElementById("descripcionBienVoF");
        descripcionBienVoF.style.visibility = "hidden";

        var respuestaCorrectaBienVoF = document.getElementById(
          "respuestaCorrectaBienVoF"
        );
        respuestaCorrectaBienVoF.style.visibility = "hidden";
        $("#modalTipoPregunta").modal("hide");
        $("#modalCrearVoF").modal({ backdrop: "static", keyboard: false });
        $("#modalCrearVoF").modal("show");
        quitarDivCrearVoF();
        break;
      case "4 x 1":
        var descripcionBien = document.getElementById("descripcionBien");
        descripcionBien.style.visibility = "hidden";
        var respuestaCorrectaBien = document.getElementById(
          "respuestaCorrectaBien"
        );
        respuestaCorrectaBien.style.visibility = "hidden";
        var respuestaIncorrectaBien = document.getElementById(
          "respuestaIncorrectaBien"
        );
        respuestaIncorrectaBien.style.visibility = "hidden";
        var respuestaIncorrecta1Bien = document.getElementById(
          "respuestaIncorrecta1Bien"
        );
        respuestaIncorrecta1Bien.style.visibility = "hidden";
        var respuestaIncorrecta2Bien = document.getElementById(
          "respuestaIncorrecta2Bien"
        );
        respuestaIncorrecta2Bien.style.visibility = "hidden";

        $("#modalTipoPregunta").modal("hide");
        $("#modalCrear4x1").modal({ backdrop: "static", keyboard: false });
        $("#modalCrear4x1").modal("show");
        quitarDivCrear4x1();
        break;
      case "Imagen":
        $("#modalTipoPregunta").modal("hide");
        $("#modalCrearImagen").modal({ backdrop: "static", keyboard: false });
        $("#modalCrearImagen").modal("show");
        quitarDivCrearImagen();
        break;
    }
  });
}

var formulario4x1 = document.getElementById("formularioCreate4x1");
var formularioVoF = document.getElementById("formularioCreateVoF");
var formularioImagen = document.getElementById("formularioCreateImagen");
var close4x1 = document.getElementById("close");
var closeVoF = document.getElementById("close");
var closeImagen = document.getElementById("close");

close4x1.addEventListener("click", function () {
  formulario4x1.reset();
});

closeVoF.addEventListener("click", function () {
  formularioVoF.reset();
});

closeImagen.addEventListener("click", function () {
  formularioImagen.reset();
});

function onClickBotonCrear4x1() {
  var botonInsertar4x1 = document.getElementById("botonInsertar4x1");
  var chargerInsertar4x1 = document.getElementById("chargerInsertar4x1");

  chargerInsertar4x1.style.visibility = "visible";
  chargerInsertar4x1.style.opacity = "100";
  botonInsertar4x1.innerHTML = "  Procesando...";
  botonInsertar4x1.disabled = true;
}

function quitarDivCrear4x1() {
  var descripcionMal = document.getElementById("descripcionMal");
  descripcionMal.style.visibility = "hidden";
  var respuestaCorrectaMal = document.getElementById("respuestaCorrectaMal");
  respuestaCorrectaMal.style.visibility = "hidden";
  var respuestaIncorrectaMal = document.getElementById(
    "respuestaIncorrectaMal"
  );
  respuestaIncorrectaMal.style.visibility = "hidden";
  var respuestaIncorrecta1Mal = document.getElementById(
    "respuestaIncorrecta1Mal"
  );
  respuestaIncorrecta1Mal.style.visibility = "hidden";
  var respuestaIncorrecta2Mal = document.getElementById(
    "respuestaIncorrecta2Mal"
  );
  respuestaIncorrecta2Mal.style.visibility = "hidden";

  var botonInsertar4x1 = document.getElementById("botonInsertar4x1");
  var chargerInsertar4x1 = document.getElementById("chargerInsertar4x1");

  chargerInsertar4x1.style.visibility = "hidden";
  chargerInsertar4x1.style.opacity = "0";
  botonInsertar4x1.innerHTML = "Insertar Pregunta";
  botonInsertar4x1.disabled = false;
}

function onClickBotonCrearVoF() {
  var botonInsertarVoF = document.getElementById("botonInsertarVoF");
  var chargerInsertarVoF = document.getElementById("chargerInsertarVoF");

  chargerInsertarVoF.style.visibility = "visible";
  chargerInsertarVoF.style.opacity = "100";
  botonInsertarVoF.innerHTML = "  Procesando...";
  botonInsertarVoF.disabled = true;
}

function quitarDivCrearVoF() {
  var descripcionMalVoF = document.getElementById("descripcionMalVoF");
  descripcionMalVoF.style.visibility = "hidden";

  var botonInsertarVoF = document.getElementById("botonInsertarVoF");
  var chargerInsertarVoF = document.getElementById("chargerInsertarVoF");

  chargerInsertarVoF.style.visibility = "hidden";
  chargerInsertarVoF.style.opacity = "0";
  botonInsertarVoF.innerHTML = "Insertar Pregunta";
  botonInsertarVoF.disabled = false;
}

function onClickBotonCrearImagen() {
  var botonInsertarImagen = document.getElementById("botonInsertarImagen");
  var chargerInsertarImagen = document.getElementById("chargerInsertarImagen");

  chargerInsertarImagen.style.visibility = "visible";
  chargerInsertarImagen.style.opacity = "100";
  botonInsertarImagen.innerHTML = "  Procesando...";
  botonInsertarImagen.disabled = true;
}

function quitarDivCrearImagen() {
  var botonInsertarImagen = document.getElementById("botonInsertarImagen");
  var chargerInsertarImagen = document.getElementById("chargerInsertarImagen");

  chargerInsertarImagen.style.visibility = "hidden";
  chargerInsertarImagen.style.opacity = "0";
  botonInsertarImagen.innerHTML = "Insertar Pregunta";
  botonInsertarImagen.disabled = false;
}

//Estas 3 funciones son para crear los formularios desde javaScript
/*
function cargarFormulario4x1() {
  var div = document.getElementById("divPrincipal");
  div.remove();

  var titulo = document.getElementById("exModalLabel");
  titulo.innerHTML = "Insertar Pregunta";

  var modal_body = document.getElementById("modal-body");
  var divPrincipal = document.createElement("div");
  divPrincipal.id = "divPrincipal";
  divPrincipal.className = "container-fluid";

  var form = document.createElement("form");
  form.id = "formularioCreate4x1";

  var divForm = document.createElement("div");
  divForm.className = "form-outline form-white row mb-3";

  //--------------descripcion--------------------------------
  var labelDescripcion = document.createElement("label");
  labelDescripcion.className = "col-6 col-form-label";
  labelDescripcion.innerHTML = "Descripción:";
  labelDescripcion.htmlFor = "descripcion";

  var inputDescripcion = document.createElement("input");
  inputDescripcion.type = "text";
  inputDescripcion.className = "form-control form-control-lg";
  inputDescripcion.name = "descripcion";
  inputDescripcion.id = "descripcion";

  //---------------fin----------------------------------------
  divForm.appendChild(labelDescripcion);
  divForm.appendChild(inputDescripcion);

  //---------------respuesta correcta--------------------------------

  var labelRespuestaCorrecta = document.createElement("label");
  labelRespuestaCorrecta.className = "col-6 col-form-label";
  labelRespuestaCorrecta.innerHTML = "Respuesta Correcta:";
  labelRespuestaCorrecta.htmlFor = "respuestaCorrecta";

  var inputRespuestaCorrecta = document.createElement("input");
  inputRespuestaCorrecta.type = "text";
  inputRespuestaCorrecta.className = "form-control form-control-lg";
  inputRespuestaCorrecta.name = "respuestaCorrecta";
  inputRespuestaCorrecta.id = "respuestaCorrecta";

  //---------------fin------------------------------------------------
  divForm.appendChild(labelRespuestaCorrecta);
  divForm.appendChild(inputRespuestaCorrecta);

  //---------------respuesta incorrecta-------------------------------

  var labelRespuestaIncorrecta = document.createElement("label");
  labelRespuestaIncorrecta.className = "col-6 col-form-label";
  labelRespuestaIncorrecta.innerHTML = "Respuesta Incorrecta:";
  labelRespuestaIncorrecta.htmlFor = "respuestaIncorrecta";

  var inputRespuestaIncorrecta = document.createElement("input");
  inputRespuestaIncorrecta.type = "text";
  inputRespuestaIncorrecta.className = "form-control form-control-lg";
  inputRespuestaIncorrecta.name = "respuestaIncorrecta";
  inputRespuestaIncorrecta.id = "respuestaIncorrecta";

  //---------------fin------------------------------------------------

  divForm.appendChild(labelRespuestaIncorrecta);
  divForm.appendChild(inputRespuestaIncorrecta);
  //---------------respuesta incorrecta1-------------------------------

  var labelRespuestaIncorrecta1 = document.createElement("label");
  labelRespuestaIncorrecta1.className = "col-6 col-form-label";
  labelRespuestaIncorrecta1.innerHTML = "Respuesta Incorrecta:";
  labelRespuestaIncorrecta1.htmlFor = "respuestaIncorrecta1";

  var inputRespuestaIncorrecta1 = document.createElement("input");
  inputRespuestaIncorrecta1.type = "text";
  inputRespuestaIncorrecta1.className = "form-control form-control-lg";
  inputRespuestaIncorrecta1.name = "respuestaIncorrecta1";
  inputRespuestaIncorrecta1.id = "respuestaIncorrecta1";

  //---------------fin------------------------------------------------
  divForm.appendChild(labelRespuestaIncorrecta1);
  divForm.appendChild(inputRespuestaIncorrecta1);

  //---------------respuesta incorrecta2-------------------------------

  var labelRespuestaIncorrecta2 = document.createElement("label");
  labelRespuestaIncorrecta2.className = "col-6 col-form-label";
  labelRespuestaIncorrecta2.innerHTML = "Respuesta Incorrecta:";
  labelRespuestaIncorrecta2.htmlFor = "respuestaIncorrecta2";

  var inputRespuestaIncorrecta2 = document.createElement("input");
  inputRespuestaIncorrecta2.type = "text";
  inputRespuestaIncorrecta2.className = "form-control form-control-lg";
  inputRespuestaIncorrecta2.name = "respuestaIncorrecta2";
  inputRespuestaIncorrecta2.id = "respuestaIncorrecta2";
  //---------------fin------------------------------------------------

  divForm.appendChild(labelRespuestaIncorrecta2);
  divForm.appendChild(inputRespuestaIncorrecta2);

  var boton = document.createElement("button");
  boton.type = "submit";
  boton.className = "btn btn-outline-light btn-lg px-5";
  boton.id = "botonInsertar";
  boton.innerHTML = "Insertar Pregunta";

  divForm.appendChild(boton);
  form.appendChild(divForm);

  divPrincipal.appendChild(form);
  modal_body.appendChild(divPrincipal);
}

function cargarFormularioVoF() {
  var div = document.getElementById("divPrincipal");
  div.remove();

  var titulo = document.getElementById("exModalLabel");
  titulo.innerHTML = "Insertar Pregunta";

  var modal_body = document.getElementById("modal-body");
  var divPrincipal = document.createElement("div");
  divPrincipal.id = "divPrincipal";
  divPrincipal.className = "container-fluid";

  var form = document.createElement("form");
  form.id = "formularioCreate4x1";

  var divForm = document.createElement("div");
  divForm.className = "form-outline form-white row mb-3";

  //--------------descripcion--------------------------------
  var labelDescripcion = document.createElement("label");
  labelDescripcion.className = "col-6 col-form-label";
  labelDescripcion.innerHTML = "Descripción:";
  labelDescripcion.htmlFor = "descripcion";

  var inputDescripcion = document.createElement("input");
  inputDescripcion.type = "text";
  inputDescripcion.className = "form-control form-control-lg";
  inputDescripcion.name = "descripcion";
  inputDescripcion.id = "descripcion";

  //---------------fin----------------------------------------
  divForm.appendChild(labelDescripcion);
  divForm.appendChild(inputDescripcion);

  //---------------respuesta correcta--------------------------------

  var labelRespuestaCorrecta = document.createElement("label");
  labelRespuestaCorrecta.className = "col-6 col-form-label";
  labelRespuestaCorrecta.innerHTML = "Respuesta Correcta:";
  labelRespuestaCorrecta.htmlFor = "respuestaCorrecta";

  var inputRespuestaCorrecta = document.createElement("input");
  inputRespuestaCorrecta.type = "text";
  inputRespuestaCorrecta.className = "form-control form-control-lg";
  inputRespuestaCorrecta.name = "respuestaCorrecta";
  inputRespuestaCorrecta.id = "respuestaCorrecta";

  //---------------fin------------------------------------------------
  divForm.appendChild(labelRespuestaCorrecta);
  divForm.appendChild(inputRespuestaCorrecta);

  //---------------respuesta incorrecta-------------------------------

  var labelRespuestaIncorrecta = document.createElement("label");
  labelRespuestaIncorrecta.className = "col-6 col-form-label";
  labelRespuestaIncorrecta.innerHTML = "Respuesta Incorrecta:";
  labelRespuestaIncorrecta.htmlFor = "respuestaIncorrecta";

  var inputRespuestaIncorrecta = document.createElement("input");
  inputRespuestaIncorrecta.type = "text";
  inputRespuestaIncorrecta.className = "form-control form-control-lg";
  inputRespuestaIncorrecta.name = "respuestaIncorrecta";
  inputRespuestaIncorrecta.id = "respuestaIncorrecta";

  //---------------fin------------------------------------------------

  divForm.appendChild(labelRespuestaIncorrecta);
  divForm.appendChild(inputRespuestaIncorrecta);

  var boton = document.createElement("button");
  boton.type = "submit";
  boton.className = "btn btn-outline-light btn-lg px-5";
  boton.id = "botonInsertar";
  boton.innerHTML = "Insertar Pregunta";

  divForm.appendChild(boton);
  form.appendChild(divForm);

  divPrincipal.appendChild(form);
  modal_body.appendChild(divPrincipal);
}

function cargarFormularioImagen() {
  var div = document.getElementById("divPrincipal");
  div.remove();

  var titulo = document.getElementById("exModalLabel");
  titulo.innerHTML = "Insertar Pregunta";

  var modal_body = document.getElementById("modal-body");
  var divPrincipal = document.createElement("div");
  divPrincipal.id = "divPrincipal";
  divPrincipal.className = "container-fluid";

  var form = document.createElement("form");
  form.id = "formularioCreate4x1";

  var divForm = document.createElement("div");
  divForm.className = "form-outline form-white row mb-3";

  //--------------descripcion--------------------------------
  var labelImagen = document.createElement("label");
  labelImagen.className = "col-6 col-form-label";
  labelImagen.innerHTML = "Imagen:";
  labelImagen.htmlFor = "imagen";

  var inputimagen = document.createElement("input");
  inputimagen.type = "file";
  inputimagen.className = "form-control form-control-lg";
  inputimagen.name = "imagen";
  inputimagen.id = "imagen";

  //---------------fin----------------------------------------

  divForm.appendChild(labelImagen);
  divForm.appendChild(inputimagen);

  //---------------respuesta correcta--------------------------------

  var labelRespuestaCorrecta = document.createElement("label");
  labelRespuestaCorrecta.className = "col-6 col-form-label";
  labelRespuestaCorrecta.innerHTML = "Respuesta Correcta:";
  labelRespuestaCorrecta.htmlFor = "respuestaCorrecta";

  var inputRespuestaCorrecta = document.createElement("input");
  inputRespuestaCorrecta.type = "text";
  inputRespuestaCorrecta.className = "form-control form-control-lg";
  inputRespuestaCorrecta.name = "respuestaCorrecta";
  inputRespuestaCorrecta.id = "respuestaCorrecta";

  //---------------fin------------------------------------------------
  divForm.appendChild(labelRespuestaCorrecta);
  divForm.appendChild(inputRespuestaCorrecta);

  //---------------respuesta incorrecta-------------------------------

  var labelRespuestaIncorrecta = document.createElement("label");
  labelRespuestaIncorrecta.className = "col-6 col-form-label";
  labelRespuestaIncorrecta.innerHTML = "Respuesta Incorrecta:";
  labelRespuestaIncorrecta.htmlFor = "respuestaIncorrecta";

  var inputRespuestaIncorrecta = document.createElement("input");
  inputRespuestaIncorrecta.type = "text";
  inputRespuestaIncorrecta.className = "form-control form-control-lg";
  inputRespuestaIncorrecta.name = "respuestaIncorrecta";
  inputRespuestaIncorrecta.id = "respuestaIncorrecta";

  //---------------fin------------------------------------------------

  divForm.appendChild(labelRespuestaIncorrecta);
  divForm.appendChild(inputRespuestaIncorrecta);

  //---------------respuesta incorrecta1-------------------------------

  var labelRespuestaIncorrecta1 = document.createElement("label");
  labelRespuestaIncorrecta1.className = "col-6 col-form-label";
  labelRespuestaIncorrecta1.innerHTML = "Respuesta Incorrecta:";
  labelRespuestaIncorrecta1.htmlFor = "respuestaIncorrecta1";

  var inputRespuestaIncorrecta1 = document.createElement("input");
  inputRespuestaIncorrecta1.type = "text";
  inputRespuestaIncorrecta1.className = "form-control form-control-lg";
  inputRespuestaIncorrecta1.name = "respuestaIncorrecta1";
  inputRespuestaIncorrecta1.id = "respuestaIncorrecta1";

  //---------------fin------------------------------------------------
  divForm.appendChild(labelRespuestaIncorrecta1);
  divForm.appendChild(inputRespuestaIncorrecta1);

  //---------------respuesta incorrecta2-------------------------------

  var labelRespuestaIncorrecta2 = document.createElement("label");
  labelRespuestaIncorrecta2.className = "col-6 col-form-label";
  labelRespuestaIncorrecta2.innerHTML = "Respuesta Incorrecta:";
  labelRespuestaIncorrecta2.htmlFor = "respuestaIncorrecta2";

  var inputRespuestaIncorrecta2 = document.createElement("input");
  inputRespuestaIncorrecta2.type = "text";
  inputRespuestaIncorrecta2.className = "form-control form-control-lg";
  inputRespuestaIncorrecta2.name = "respuestaIncorrecta2";
  inputRespuestaIncorrecta2.id = "respuestaIncorrecta2";
  //---------------fin------------------------------------------------

  divForm.appendChild(labelRespuestaIncorrecta2);
  divForm.appendChild(inputRespuestaIncorrecta2);

  var boton = document.createElement("button");
  boton.type = "submit";
  boton.className = "btn btn-outline-light btn-lg px-5";
  boton.id = "botonInsertar";
  boton.innerHTML = "Insertar Pregunta";

  divForm.appendChild(boton);
  form.appendChild(divForm);

  divPrincipal.appendChild(form);
  modal_body.appendChild(divPrincipal);
}*/

/*
var buttonClose = document.getElementById("botonClose");
buttonClose.addEventListener("click", regresar);

function regresar() {
  cargarTipoPregunta();
}*/

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

const validarFormulario4x1 = (e) => {
  console.log(e);
  switch (e.target.name) {
    case "descripcion4x1":
      validarCampo(expresiones4x1.descripcion, e.target, "descripcion");
      break;
    case "respuestaCorrecta4x1":
      validarCampo(
        expresiones4x1.respuestaCorrecta,
        e.target,
        "respuestaCorrecta"
      );
      break;
    case "respuestaIncorrecta4x1":
      validarCampo(
        expresiones4x1.respuestaIncorrecta,
        e.target,
        "respuestaIncorrecta"
      );
      break;
    case "respuestaIncorrecta14x1":
      validarCampo(
        expresiones4x1.respuestaIncorrecta1,
        e.target,
        "respuestaIncorrecta1"
      );
      break;
    case "respuestaIncorrecta24x1":
      validarCampo(
        expresiones4x1.respuestaIncorrecta2,
        e.target,
        "respuestaIncorrecta2"
      );
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  var descripcionMal = document.getElementById("descripcionMal");
  descripcionMal.style.visibility = "hidden";
  var respuestaCorrectaMal = document.getElementById("respuestaCorrectaMal");
  respuestaCorrectaMal.style.visibility = "hidden";
  var respuestaIncorrectaMal = document.getElementById(
    "respuestaIncorrectaMal"
  );
  respuestaIncorrectaMal.style.visibility = "hidden";
  var respuestaIncorrecta1Mal = document.getElementById(
    "respuestaIncorrecta1Mal"
  );
  respuestaIncorrecta1Mal.style.visibility = "hidden";
  var respuestaIncorrecta2Mal = document.getElementById(
    "respuestaIncorrecta2Mal"
  );
  respuestaIncorrecta2Mal.style.visibility = "hidden";

  var descripcionBien = document.getElementById("descripcionBien");
  descripcionBien.style.visibility = "hidden";
  var respuestaCorrectaBien = document.getElementById("respuestaCorrectaBien");
  respuestaCorrectaBien.style.visibility = "hidden";
  var respuestaIncorrectaBien = document.getElementById(
    "respuestaIncorrectaBien"
  );
  respuestaIncorrectaBien.style.visibility = "hidden";
  var respuestaIncorrecta1Bien = document.getElementById(
    "respuestaIncorrecta1Bien"
  );
  respuestaIncorrecta1Bien.style.visibility = "hidden";
  var respuestaIncorrecta2Bien = document.getElementById(
    "respuestaIncorrecta2Bien"
  );
  respuestaIncorrecta2Bien.style.visibility = "hidden";

  if (expresion.test(input.value)) {
    campos4x1[campo] = true;
  } else if (campo == "descripcion") {
    descripcionMal.style.visibility = "visible";
    campos4x1[campo] = false;
  } else if (campo == "respuestaCorrecta") {
    respuestaCorrectaMal.style.visibility = "visible";
    campos4x1[campo] = false;
  } else if (campo == "respuestaIncorrecta") {
    respuestaIncorrectaMal.style.visibility = "visible";
    campos4x1[campo] = false;
  } else if (campo == "respuestaIncorrecta1") {
    respuestaIncorrecta1Mal.style.visibility = "visible";
    campos4x1[campo] = false;
  } else if (campo == "respuestaIncorrecta2") {
    respuestaIncorrecta2Mal.style.visibility = "visible";
    campos4x1[campo] = false;
  }
};

const inputs4x1 = document.querySelectorAll("#formularioCreate4x1 input");

inputs4x1.forEach((input) => {
  input.addEventListener("keyup", validarFormulario4x1);
});

const validarFormularioVoF = (e) => {
  console.log(e);
  switch (e.target.name) {
    case "descripcionVoF":
      validarCampo(expresiones4x1.descripcion, e.target, "descripcion");
      break;
  }
};

const validarCampoVoF = (expresion, input, campo) => {
  var descripcionMalVoF = document.getElementById("descripcionMalVoF");
  descripcionMalVoF.style.visibility = "hidden";

  var descripcionBienVoF = document.getElementById("descripcionBienVoF");
  descripcionBienVoF.style.visibility = "hidden";

  var respuestaCorrectaBienVoF = document.getElementById(
    "respuestaCorrectaBienVoF"
  );
  respuestaCorrectaBienVoF.style.visibility = "hidden";

  if (expresion.test(input.value)) {
    camposVoF[campo] = true;
  } else if (campo == "descripcion") {
    descripcionMal.style.visibility = "visible";
    campos4x1[campo] = false;
  }
};

const inputsVoF = document.querySelectorAll("#formularioCreateVoF input");

inputsVoF.forEach((input) => {
  input.addEventListener("keyup", validarFormularioVoF);
});
