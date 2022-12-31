function update(
  id,
  descripcion,
  respuestaCorrecta,
  respuestaIncorrecta,
  respuestaIncorrecta1,
  respuestaIncorrecta2
) {
  const selectElement = document.getElementById("tipo");
  var tipo;
  tipo = selectElement.options[selectElement.selectedIndex].text;

  //---------------------------------4 x 1------------------------------------------------------------
  const inputDescripcion = document.getElementById("descripcionUpdate4x1");
  inputDescripcion.value = descripcion;
  const inputRespuestaCorrecta = document.getElementById(
    "respuestaCorrectaUpdate4x1"
  );
  inputRespuestaCorrecta.value = respuestaCorrecta;
  const inputRespuestaIncorrecta = document.getElementById(
    "respuestaIncorrectaUpdate4x1"
  );
  inputRespuestaIncorrecta.value = respuestaIncorrecta;
  const inputRespuestaIncorrecta1 = document.getElementById(
    "respuestaIncorrecta1Update4x1"
  );
  inputRespuestaIncorrecta1.value = respuestaIncorrecta1;
  const inputRespuestaIncorrecta2 = document.getElementById(
    "respuestaIncorrecta2Update4x1"
  );
  inputRespuestaIncorrecta2.value = respuestaIncorrecta2;
  //------------------------------Fin 4 x 1------------------------------------------------------------

  //---------------------------------V o F------------------------------------------------------------
  const inputDescripcionVoF = document.getElementById("descripcionUpdateVoF");
  inputDescripcionVoF.value = descripcion;
  //------------------------------Fin V o F------------------------------------------------------------

  //---------------------------------Imagen------------------------------------------------------------
  const inputDescripcionImagen = document.getElementById(
    "descripcionImagenUpdate"
  );
  inputDescripcionImagen.value = descripcion;

  const inputRespuestaCorrectaImagen = document.getElementById(
    "respuestaCorrectaImagenUpdate"
  );
  inputRespuestaCorrectaImagen.value = respuestaCorrecta;

  const respuestaIncorrectaImagenUpdate = document.getElementById(
    "respuestaIncorrectaImagenUpdate"
  );
  respuestaIncorrectaImagenUpdate.value = respuestaIncorrecta;

  const respuestaIncorrecta1ImagenUpdate = document.getElementById(
    "respuestaIncorrecta1ImagenUpdate"
  );
  respuestaIncorrecta1ImagenUpdate.value = respuestaIncorrecta1;

  const respuestaIncorrecta2ImagenUpdate = document.getElementById(
    "respuestaIncorrecta2ImagenUpdate"
  );
  respuestaIncorrecta2ImagenUpdate.value = respuestaIncorrecta2;
  //------------------------------Fin Imagen------------------------------------------------------------

  switch (tipo) {
    case "4 x 1":
      $("#modalUpdate4x1").modal({ backdrop: "static", keyboard: false });
      $("#modalUpdate4x1").modal("show");
      quitarDivUpdate4x1();
      break;
    case "V o F":
      $("#modalUpdateVoF").modal({ backdrop: "static", keyboard: false });
      $("#modalUpdateVoF").modal("show");
      quitarDivUpdateVoF();
      break;
    case "Imagen":
      $("#modalUpdateImagen").modal({ backdrop: "static", keyboard: false });
      $("#modalUpdateImagen").modal("show");
      quitarDivUpdateImagen();
      break;
  }
  updateFunction(
    id,
    descripcion,
    respuestaCorrecta,
    respuestaIncorrecta,
    respuestaIncorrecta1,
    respuestaIncorrecta2
  );
}

function updateFunction(
  id,
  descripcion,
  respuestaCorrecta,
  respuestaIncorrecta,
  respuestaIncorrecta1,
  respuestaIncorrecta2
) {
  $("#formularioUpdate4x1").on("submit", function (e) {
    e.preventDefault();
    onClickBotonUpdate4x1();
    var urlPregunta = "http://localhost:3000/api/v2/pregunta/";
    let token = JSON.parse(localStorage.getItem("token"));

    var newDescripcion = $("#descripcionUpdate4x1");
    var newRespuestaCorrecta = $("#respuestaCorrectaUpdate4x1");
    var newRespuestaIncorrecta = $("#respuestaIncorrectaUpdate4x1");
    var newRespuestaIncorrecta1 = $("#respuestaIncorrecta1Update4x1");
    var newRespuestaIncorrecta2 = $("#respuestaIncorrecta2Update4x1");

    var descripcionOk;
    var respuestaCorrectaOK;
    var respuestaIncorrectaOk;
    var respuestaIncorrecta1Ok;
    var respuestaIncorrecta2OK;

    if (newDescripcion.val() == "") {
      descripcionOk = descripcion;
    } else {
      descripcionOk = newDescripcion.val();
    }

    if (newRespuestaCorrecta.val() == "") {
      respuestaCorrectaOK = respuestaCorrecta;
    } else {
      respuestaCorrectaOK = newRespuestaCorrecta.val();
    }

    if (newRespuestaIncorrecta.val() == "") {
      respuestaIncorrectaOk = respuestaIncorrecta;
    } else {
      respuestaIncorrectaOk = newRespuestaIncorrecta.val();
    }

    if (newRespuestaIncorrecta1.val() == "") {
      respuestaIncorrecta1Ok = respuestaIncorrecta1;
    } else {
      respuestaIncorrecta1Ok = newRespuestaIncorrecta1.val();
    }

    if (newRespuestaIncorrecta2.val() == "") {
      respuestaIncorrecta2OK = respuestaIncorrecta2;
    } else {
      respuestaIncorrecta2OK = newRespuestaIncorrecta2.val();
    }

    var data = {
      descripcion: descripcionOk,
      respuestaCorrecta: respuestaCorrectaOK,
      respuestaIncorrecta: respuestaIncorrectaOk,
      respuestaIncorrecta1: respuestaIncorrecta1Ok,
      respuestaIncorrecta2: respuestaIncorrecta2OK,
      tiposDePregunta: "4 x 1",
      imagen: "No",
    };

    fetch(urlPregunta + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
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
        quitarDivUpdate4x1();
        location.replace("/pregunta/listado");
      });
  });

  $("#formularioUpdateVoF").on("submit", function (e) {
    e.preventDefault();
    onClickBotonUpdateVoF();
    var urlPregunta = "http://localhost:3000/api/v2/pregunta/";
    let token = JSON.parse(localStorage.getItem("token"));

    var newRespuestaCorrectaInput = document.querySelector(
      "input[name=flexRadioDefaultUpdate]:checked"
    ).value;

    var newRespuestaIncorrectaInput;

    if (newRespuestaCorrectaInput == "Verdadero") {
      newRespuestaIncorrectaInput = "Falso";
    } else if (newRespuestaCorrectaInput == "Falso") {
      newRespuestaIncorrectaInput = "Verdadero";
    }

    var newDescripcion = $("#descripcionUpdateVoF");

    var respuestaCorrectaOk;
    var respuestaIncorrectaOK;
    var descripcionOk;

    if (newRespuestaCorrectaInput == respuestaCorrecta) {
      respuestaCorrectaOk = respuestaCorrecta;
    } else {
      if (newRespuestaCorrectaInput == "Verdadero") {
        respuestaIncorrectaOK = "Falso";
      } else if (newRespuestaCorrectaInput == "Falso") {
        respuestaIncorrectaOK = "Verdadero";
      }
      respuestaCorrectaOk = newRespuestaCorrectaInput;
    }

    if (newDescripcion.val() == "") {
      descripcionOk = descripcion;
    } else {
      descripcionOk = newDescripcion.val();
    }

    var data = {
      descripcion: descripcionOk,
      respuestaCorrecta: respuestaCorrectaOk,
      respuestaIncorrecta: respuestaIncorrectaOK,
      respuestaIncorrecta1: "No",
      respuestaIncorrecta2: "No",
      tiposDePregunta: "V o F",
      imagen: "No",
    };

    fetch(urlPregunta + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
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
        quitarDivUpdateVoF();
        location.replace("/pregunta/listado");
      });
  });

  $("#formularioUpdateImagen").on("submit", function (e) {
    e.preventDefault();
    onClickBotonUpdateImagen();
    var urlPregunta = "http://localhost:3000/api/v2/pregunta/";
    var urlPreguntaImagen = "http://localhost:3000/api/v2/preguntaImagen/";
    let token = JSON.parse(localStorage.getItem("token"));

    var newDescripcion = $("#descripcionImagenUpdate");
    var newRespuestaCorrecta = $("#respuestaCorrectaImagenUpdate");
    var newRespuestaIncorrecta = $("#respuestaIncorrectaImagenUpdate");
    var newRespuestaIncorrecta1 = $("#respuestaIncorrecta1ImagenUpdate");
    var newRespuestaIncorrecta2 = $("#respuestaIncorrecta2ImagenUpdate");

    var descripcionOk;
    var respuestaCorrectaOK;
    var respuestaIncorrectaOk;
    var respuestaIncorrecta1Ok;
    var respuestaIncorrecta2OK;

    if (newDescripcion.val() == "") {
      descripcionOk = descripcion;
    } else {
      descripcionOk = newDescripcion.val();
    }

    if (newRespuestaCorrecta.val() == "") {
      respuestaCorrectaOK = respuestaCorrecta;
    } else {
      respuestaCorrectaOK = newRespuestaCorrecta.val();
    }

    if (newRespuestaIncorrecta.val() == "") {
      respuestaIncorrectaOk = respuestaIncorrecta;
    } else {
      respuestaIncorrectaOk = newRespuestaIncorrecta.val();
    }

    if (newRespuestaIncorrecta1.val() == "") {
      respuestaIncorrecta1Ok = respuestaIncorrecta1;
    } else {
      respuestaIncorrecta1Ok = newRespuestaIncorrecta1.val();
    }

    if (newRespuestaIncorrecta2.val() == "") {
      respuestaIncorrecta2OK = respuestaIncorrecta2;
    } else {
      respuestaIncorrecta2OK = newRespuestaIncorrecta2.val();
    }

    var data = {
      descripcion: descripcionOk,
      respuestaCorrecta: respuestaCorrectaOK,
      respuestaIncorrecta: respuestaIncorrectaOk,
      respuestaIncorrecta1: respuestaIncorrecta1Ok,
      respuestaIncorrecta2: respuestaIncorrecta2OK,
      tiposDePregunta: "Imagen",
    };
    fetch(urlPregunta + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        var formData = new FormData();
        var files = $("#imagenUpdate")[0].files[0];
        formData.append("file", files);

        fetch(urlPreguntaImagen + id, {
          method: "put",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            if (res.status == 401 || res.statusCode == 401) {
              $("#modal401").modal({
                backdrop: "static",
                keyboard: false,
              });
              $("#modal401").modal("show");
            }
          })
          .finally(() => {
            quitarDivUpdateImagen();
            location.replace("/pregunta/listado");
          });
      });
  });
}
//Fin Update Pregunta

function onClickBotonUpdate4x1() {
  var botonModificar4x1 = document.getElementById("botonModificar4x1");
  var chargerModificar4x1 = document.getElementById("chargerModificar4x1");

  chargerModificar4x1.style.visibility = "visible";
  chargerModificar4x1.style.opacity = "100";
  botonModificar4x1.innerHTML = "  Procesando...";
  botonModificar4x1.disabled = true;
}

function quitarDivUpdate4x1() {
  var botonModificar4x1 = document.getElementById("botonModificar4x1");
  var chargerModificar4x1 = document.getElementById("chargerModificar4x1");

  chargerModificar4x1.style.visibility = "hidden";
  chargerModificar4x1.style.opacity = "0";
  botonModificar4x1.innerHTML = "Modificar Pregunta";
  botonModificar4x1.disabled = false;
}

function onClickBotonUpdateVoF() {
  var botonModificarVoF = document.getElementById("botonModificarVoF");
  var chargerModificarVoF = document.getElementById("chargerModificarVoF");

  chargerModificarVoF.style.visibility = "visible";
  chargerModificarVoF.style.opacity = "100";
  botonModificarVoF.innerHTML = "  Procesando...";
  botonModificarVoF.disabled = true;
}

function quitarDivUpdateVoF() {
  var botonModificarVoF = document.getElementById("botonModificarVoF");
  var chargerModificarVoF = document.getElementById("chargerModificarVoF");

  chargerModificarVoF.style.visibility = "hidden";
  chargerModificarVoF.style.opacity = "0";
  botonModificarVoF.innerHTML = "Modificar Pregunta";
  botonModificarVoF.disabled = false;
}

function onClickBotonUpdateImagen() {
  var botonModificarImagen = document.getElementById("botonModificarImagen");
  var chargerModificarImagen = document.getElementById(
    "chargerModificarImagen"
  );

  chargerModificarImagen.style.visibility = "visible";
  chargerModificarImagen.style.opacity = "100";
  botonModificarImagen.innerHTML = "  Procesando...";
  botonModificarImagen.disabled = true;
}

function quitarDivUpdateImagen() {
  var botonModificarImagen = document.getElementById("botonModificarImagen");
  var chargerModificarImagen = document.getElementById(
    "chargerModificarImagen"
  );

  chargerModificarImagen.style.opacity = "0";
  botonModificarImagen.innerHTML = "Modificar Pregunta";
  botonModificarImagen.disabled = false;
}
