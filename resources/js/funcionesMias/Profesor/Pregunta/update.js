const expresiones4x1Update = {
  descripcion: /^[a-zA-ZÀ-ÿ\sZ0-9_.+-\_\-]{1,250}$/, // Letras y espacios, pueden llevar acentos.
  respuestaCorrecta: /^[a-zA-ZÀ-ÿ\sZ0-9_.+-\_\-]{1,250}$/, // Letras, numeros, guion y guion_bajo
  respuestaIncorrecta: /^[a-zA-ZÀ-ÿ\sZ0-9_.+-\_\-]{1,250}$/, // Letras, numeros, guion y guion_bajo
  respuestaIncorrecta1: /^[a-zA-ZÀ-ÿ\sZ0-9_.+-\_\-]{1,250}$/, // Letras, numeros, guion y guion_bajo
  respuestaIncorrecta2: /^[a-zA-ZÀ-ÿ\sZ0-9_.+-\_\-]{1,250}$/, // Letras, numeros, guion y guion_bajo
};

const campos4x1Update = {
  descripcion: false,
  respuestaCorrecta: false,
  respuestaIncorrecta: false,
  respuestaIncorrecta1: false,
  respuestaIncorrecta2: false,
};

const expresionesVoFUpdate = {
  descripcion: /^[a-zA-ZÀ-ÿ\sZ0-9_.+-\_\-]{1,250}$/, // Letras y espacios, pueden llevar acentos.
};

const camposVoFUpdate = {
  descripcion: false,
};

const expresionesImagenUpdate = {
  descripcion: /^[a-zA-ZÀ-ÿ\sZ0-9_.+-\_\-]{1,250}$/, // Letras y espacios, pueden llevar acentos.
  respuestaCorrecta: /^[a-zA-ZÀ-ÿ\sZ0-9_.+-\_\-]{1,250}$/, // Letras, numeros, guion y guion_bajo
  respuestaIncorrecta: /^[a-zA-ZÀ-ÿ\sZ0-9_.+-\_\-]{1,250}$/, // Letras, numeros, guion y guion_bajo
  respuestaIncorrecta1: /^[a-zA-ZÀ-ÿ\sZ0-9_.+-\_\-]{1,250}$/, // Letras, numeros, guion y guion_bajo
  respuestaIncorrecta2: /^[a-zA-ZÀ-ÿ\sZ0-9_.+-\_\-]{1,250}$/, // Letras, numeros, guion y guion_bajo
};

const camposImagenUpdate = {
  descripcion: false,
  respuestaCorrecta: false,
  respuestaIncorrecta: false,
  respuestaIncorrecta1: false,
  respuestaIncorrecta2: false,
};

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
      var descripcionBienUpdate4x1 = document.getElementById(
        "descripcionBienUpdate4x1"
      );
      descripcionBienUpdate4x1.style.visibility = "hidden";

      var respuestaCorrectaBienUpdate4x1 = document.getElementById(
        "respuestaCorrectaBienUpdate4x1"
      );
      respuestaCorrectaBienUpdate4x1.style.visibility = "hidden";

      var respuestaIncorrectaBienUpdate4x1 = document.getElementById(
        "respuestaIncorrectaBienUpdate4x1"
      );
      respuestaIncorrectaBienUpdate4x1.style.visibility = "hidden";

      var respuestaIncorrecta1BienUpdate = document.getElementById(
        "respuestaIncorrecta1BienUpdate"
      );
      respuestaIncorrecta1BienUpdate.style.visibility = "hidden";

      var respuestaIncorrecta2BienUpdate4x1 = document.getElementById(
        "respuestaIncorrecta2BienUpdate4x1"
      );
      respuestaIncorrecta2BienUpdate4x1.style.visibility = "hidden";

      $("#modalUpdate4x1").modal({ backdrop: "static", keyboard: false });
      $("#modalUpdate4x1").modal("show");
      quitarDivUpdate4x1();
      break;
    case "V o F":
      var descripcionBienUpdateVoF = document.getElementById(
        "descripcionBienUpdateVoF"
      );
      descripcionBienUpdateVoF.style.visibility = "hidden";

      $("#modalUpdateVoF").modal({ backdrop: "static", keyboard: false });
      $("#modalUpdateVoF").modal("show");
      quitarDivUpdateVoF();
      break;
    case "Imagen":
      var descripcionBienImagenUpdate = document.getElementById(
        "descripcionBienImagenUpdate"
      );
      descripcionBienImagenUpdate.style.visibility = "hidden";

      var imagenBienUpdate = document.getElementById("imagenBienUpdate");
      imagenBienUpdate.style.visibility = "hidden";

      var respuestaCorrectaBienImagenUpdate = document.getElementById(
        "respuestaCorrectaBienImagenUpdate"
      );
      respuestaCorrectaBienImagenUpdate.style.visibility = "hidden";

      var respuestaIncorrectaBienImagenUpdate = document.getElementById(
        "respuestaIncorrectaBienImagenUpdate"
      );
      respuestaIncorrectaBienImagenUpdate.style.visibility = "hidden";

      var respuestaIncorrecta1BienImagenUpdate = document.getElementById(
        "respuestaIncorrecta1BienImagenUpdate"
      );
      respuestaIncorrecta1BienImagenUpdate.style.visibility = "hidden";

      var respuestaIncorrecta2BienImagenUpdate = document.getElementById(
        "respuestaIncorrecta2BienImagenUpdate"
      );
      respuestaIncorrecta2BienImagenUpdate.style.visibility = "hidden";

      $("#modalUpdateImagen").modal({ backdrop: "static", keyboard: false });
      $("#modalUpdateImagen").modal("show");
      quitarDivUpdateImagen();
      break;
  }
  updateFunction4x1(
    id,
    descripcion,
    respuestaCorrecta,
    respuestaIncorrecta,
    respuestaIncorrecta1,
    respuestaIncorrecta2
  );

  updateFunctionVoF(id, descripcion, respuestaCorrecta, respuestaIncorrecta);

  updateFunctionImagen(
    id,
    descripcion,
    respuestaCorrecta,
    respuestaIncorrecta,
    respuestaIncorrecta1,
    respuestaIncorrecta2
  );
}

function updateFunction4x1(
  id,
  descripcion,
  respuestaCorrecta,
  respuestaIncorrecta,
  respuestaIncorrecta1,
  respuestaIncorrecta2
) {
  $("#formularioUpdate4x1").on("submit", function (e) {
    e.preventDefault();
    var urlPregunta = "http://localhost:3000/api/v2/pregunta/";
    if (navigator.onLine) {
      server(urlPregunta);

      var newDescripcion = $("#descripcionUpdate4x1");
      var newRespuestaCorrecta = $("#respuestaCorrectaUpdate4x1");
      var newRespuestaIncorrecta = $("#respuestaIncorrectaUpdate4x1");
      var newRespuestaIncorrecta1 = $("#respuestaIncorrecta1Update4x1");
      var newRespuestaIncorrecta2 = $("#respuestaIncorrecta2Update4x1");

      console.log(!expresiones4x1Update.descripcion.test(newDescripcion.val()));

      var descripcionOK;
      if (newDescripcion.val() == "") {
        descripcionOK = descripcion;
      } else {
        if (!expresiones4x1Update.descripcion.test(newDescripcion.val())) {
          var descripcionMalUpdate4x1 = document.getElementById(
            "descripcionMalUpdate4x1"
          );
          descripcionMalUpdate4x1.style.visibility = "visible";
          return;
        } else {
          descripcionOK = newDescripcion.val();
        }
      }

      var respuestaCorrectaOK;
      if (newRespuestaCorrecta.val() == "") {
        respuestaCorrectaOK = respuestaCorrecta;
      } else {
        if (
          !expresiones4x1Update.respuestaCorrecta.test(
            newRespuestaCorrecta.val()
          )
        ) {
          var respuestaCorrectaMalUpdate4x1 = document.getElementById(
            "respuestaCorrectaMalUpdate4x1"
          );
          respuestaCorrectaMalUpdate4x1.style.visibility = "visible";
          return;
        } else {
          respuestaCorrectaOK = newRespuestaCorrecta.val();
        }
      }

      var respuestaIncorrectaOK;
      if (newRespuestaIncorrecta.val() == "") {
        respuestaIncorrectaOK = respuestaIncorrecta;
      } else {
        if (
          !expresiones4x1Update.respuestaIncorrecta.test(
            newRespuestaIncorrecta.val()
          )
        ) {
          var respuestaIncorrectaMalUpdate4x1 = document.getElementById(
            "respuestaIncorrectaMalUpdate4x1"
          );
          respuestaIncorrectaMalUpdate4x1.style.visibility = "visible";
          return;
        } else {
          respuestaIncorrectaOK = newRespuestaIncorrecta.val();
        }
      }

      var respuestaIncorrecta1OK;
      if (newRespuestaIncorrecta1.val() == "") {
        respuestaIncorrecta1OK = respuestaIncorrecta1;
      } else {
        if (
          !expresiones4x1Update.respuestaIncorrecta1.test(
            newRespuestaIncorrecta1.val()
          )
        ) {
          var respuestaIncorrecta1MalUpdate = document.getElementById(
            "respuestaIncorrecta1MalUpdate"
          );
          respuestaIncorrecta1MalUpdate.style.visibility = "visible";
          return;
        } else {
          respuestaIncorrecta1OK = newRespuestaIncorrecta1.val();
        }
      }

      var respuestaIncorrecta2OK;
      if (newRespuestaIncorrecta2.val() == "") {
        respuestaIncorrecta2OK = respuestaIncorrecta2;
      } else {
        if (
          !expresiones4x1Update.respuestaIncorrecta2.test(
            newRespuestaIncorrecta2.val()
          )
        ) {
          var respuestaIncorrecta2MalUpdate4x1 = document.getElementById(
            "respuestaIncorrecta2MalUpdate4x1"
          );
          respuestaIncorrecta2MalUpdate4x1.style.visibility = "visible";
          return;
        } else {
          respuestaIncorrecta2OK = newRespuestaIncorrecta2.val();
        }
      }

      update4x1(
        id,
        descripcionOK,
        respuestaCorrectaOK,
        respuestaIncorrectaOK,
        respuestaIncorrecta1OK,
        respuestaIncorrecta2OK,
        descripcion,
        respuestaCorrecta,
        respuestaIncorrecta,
        respuestaIncorrecta1,
        respuestaIncorrecta2
      );
    } else {
      $("#modalUpdate4x1").modal("hide");
      $("#internet").modal("show");
    }
  });

  function update4x1(
    id,
    descripcionOK,
    respuestaCorrectaOK,
    respuestaIncorrectaOK,
    respuestaIncorrecta1OK,
    respuestaIncorrecta2OK,
    descripcion,
    respuestaCorrecta,
    respuestaIncorrecta,
    respuestaIncorrecta1,
    respuestaIncorrecta2
  ) {
    var urlPregunta = "http://localhost:3000/api/v2/pregunta/";
    let token = JSON.parse(localStorage.getItem("token"));
    onClickBotonUpdate4x1();

    if (navigator.onLine) {
      server(urlPregunta);

      if (
        descripcionOK == descripcion &&
        respuestaCorrectaOK == respuestaCorrecta &&
        respuestaIncorrectaOK == respuestaIncorrecta &&
        respuestaIncorrecta1OK == respuestaIncorrecta1 &&
        respuestaIncorrecta2OK == respuestaIncorrecta2
      ) {
        console.log("entro aqui");
        put4x1(
          id,
          descripcionOK,
          respuestaCorrectaOK,
          respuestaIncorrectaOK,
          respuestaIncorrecta1OK,
          respuestaIncorrecta2OK
        );
      } else {
        onClickBotonUpdate4x1();
        fetch(urlPregunta, {
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
                res[j].descripcion == descripcionOK &&
                res[j].respuestaCorrecta == respuestaCorrectaOK &&
                res[j].respuestaIncorrecta == respuestaIncorrectaOK &&
                res[j].respuestaIncorrecta1 == respuestaIncorrecta1OK &&
                res[j].respuestaIncorrecta2 == respuestaIncorrecta2OK &&
                res[j].tiposDePregunta == "4 x 1"
              ) {
                console.log("no entro aqui");
                var descripcionBienUpdate4x1 = document.getElementById(
                  "descripcionBienUpdate4x1"
                );
                descripcionBienUpdate4x1.style.visibility = "visible";

                var respuestaCorrectaBienUpdate4x1 = document.getElementById(
                  "respuestaCorrectaBienUpdate4x1"
                );
                respuestaCorrectaBienUpdate4x1.style.visibility = "visible";

                var respuestaIncorrectaBienUpdate4x1 = document.getElementById(
                  "respuestaIncorrectaBienUpdate4x1"
                );
                respuestaIncorrectaBienUpdate4x1.style.visibility = "visible";

                var respuestaIncorrecta1BienUpdate = document.getElementById(
                  "respuestaIncorrecta1BienUpdate"
                );
                respuestaIncorrecta1BienUpdate.style.visibility = "visible";

                var respuestaIncorrecta2BienUpdate4x1 = document.getElementById(
                  "respuestaIncorrecta2BienUpdate4x1"
                );
                respuestaIncorrecta2BienUpdate4x1.style.visibility = "visible";
                find = true;
              }
            }
            if (find == false) {
              put4x1(
                id,
                descripcionOK,
                respuestaCorrectaOK,
                respuestaIncorrectaOK,
                respuestaIncorrecta1OK,
                respuestaIncorrecta2OK
              );
            }
          })
          .finally(() => {
            quitarDivUpdate4x1();
          });
      }
    }
  }

  function put4x1(
    id,
    descripcionOK,
    respuestaCorrectaOK,
    respuestaIncorrectaOK,
    respuestaIncorrecta1OK,
    respuestaIncorrecta2OK
  ) {
    var urlPregunta = "http://localhost:3000/api/v2/pregunta/";
    let token = JSON.parse(localStorage.getItem("token"));

    var data = {
      descripcion: descripcionOK,
      respuestaCorrecta: respuestaCorrectaOK,
      respuestaIncorrecta: respuestaIncorrectaOK,
      respuestaIncorrecta1: respuestaIncorrecta1OK,
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
  }
}

function updateFunctionVoF(
  id,
  descripcion,
  respuestaCorrecta,
  respuestaIncorrecta
) {
  $("#formularioUpdateVoF").on("submit", function (e) {
    e.preventDefault();

    var urlPregunta = "http://localhost:3000/api/v2/pregunta/";

    if (navigator.onLine) {
      server(urlPregunta);

      var newDescripcion = $("#descripcionUpdateVoF");

      var newRespuestaCorrectaInput = document.querySelector(
        "input[name=flexRadioDefaultUpdate]:checked"
      ).value;

      var newRespuestaIncorrectaInput;

      if (newRespuestaCorrectaInput == "Verdadero") {
        newRespuestaIncorrectaInput = "Falso";
      } else if (newRespuestaCorrectaInput == "Falso") {
        newRespuestaIncorrectaInput = "Verdadero";
      }

      var descripcionOK;
      if (newDescripcion.val() == "") {
        descripcionOK = descripcion;
      } else {
        if (!expresionesVoFUpdate.descripcion.test(newDescripcion.val())) {
          var descripcionMalUpdateVoF = document.getElementById(
            "descripcionMalUpdateVoF"
          );
          descripcionMalUpdateVoF.style.visibility = "visible";
          return;
        } else {
          descripcionOK = newDescripcion.val();
        }
      }

      var respuestaCorrectaOk;
      var respuestaIncorrectaOK;

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

      updateVoF(
        id,
        descripcionOK,
        respuestaCorrectaOk,
        respuestaIncorrectaOK,
        descripcion,
        respuestaCorrecta,
        respuestaIncorrecta
      );
    } else {
      $("#modalUpdate4x1").modal("hide");
      $("#internet").modal("show");
    }
  });

  function updateVoF(
    id,
    descripcionOK,
    respuestaCorrectaOk,
    respuestaIncorrectaOK,
    descripcion,
    respuestaCorrecta,
    respuestaIncorrecta
  ) {
    var urlPregunta = "http://localhost:3000/api/v2/pregunta/";
    let token = JSON.parse(localStorage.getItem("token"));
    onClickBotonUpdateVoF();

    if (navigator.onLine);
    {
      server(urlPregunta);

      if (descripcionOK == descripcion) {
        putVoF(id, descripcionOK, respuestaCorrectaOk, respuestaIncorrectaOK);
      } else {
        onClickBotonUpdateVoF();

        fetch(urlPregunta, {
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
              if (res[j].descripcion == descripcionOK) {
                console.log("no entro aqui");
                var descripcionBienUpdateVoF = document.getElementById(
                  "descripcionBienUpdateVoF"
                );
                descripcionBienUpdateVoF.style.visibility = "visible";
                find = true;
              }
            }

            if (find == false) {
              putVoF(
                id,
                descripcionOK,
                respuestaCorrectaOk,
                respuestaIncorrectaOK
              );
            }
          })
          .finally(() => {
            quitarDivUpdateVoF();
          });
      }
    }
  }

  function putVoF(
    id,
    descripcionOK,
    respuestaCorrectaOK,
    respuestaIncorrectaOK
  ) {
    var urlPregunta = "http://localhost:3000/api/v2/pregunta/";
    let token = JSON.parse(localStorage.getItem("token"));

    var data = {
      descripcion: descripcionOK,
      respuestaCorrecta: respuestaCorrectaOK,
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
  }
}

function updateFunctionImagen(
  id,
  descripcion,
  respuestaCorrecta,
  respuestaIncorrecta,
  respuestaIncorrecta1,
  respuestaIncorrecta2
) {
  $("#formularioUpdateImagen").on("submit", function (e) {
    e.preventDefault();
    var urlPregunta = "http://localhost:3000/api/v2/pregunta/";
    var urlPreguntaImagen = "http://localhost:3000/api/v2/preguntaImagen/";

    if (navigator.onLine) {
      server(urlPregunta);
      server(urlPreguntaImagen);

      var newDescripcion = $("#descripcionImagenUpdate");
      var newRespuestaCorrecta = $("#respuestaCorrectaImagenUpdate");
      var newRespuestaIncorrecta = $("#respuestaIncorrectaImagenUpdate");
      var newRespuestaIncorrecta1 = $("#respuestaIncorrecta1ImagenUpdate");
      var newRespuestaIncorrecta2 = $("#respuestaIncorrecta2ImagenUpdate");

      var descripcionOK;
      if (newDescripcion.val() == "") {
        descripcionOK = descripcion;
      } else {
        if (!expresionesImagenUpdate.descripcion.test(newDescripcion.val())) {
          var descripcionMalImagenUpdate = document.getElementById(
            "descripcionMalImagenUpdate"
          );
          descripcionMalImagenUpdate.style.visibility = "visible";
          return;
        } else {
          descripcionOK = newDescripcion.val();
        }
      }

      var respuestaCorrectaOK;
      if (newRespuestaCorrecta.val() == "") {
        respuestaCorrectaOK = respuestaCorrecta;
      } else {
        if (
          !expresionesImagenUpdate.respuestaCorrecta.test(
            newRespuestaCorrecta.val()
          )
        ) {
          var respuestaCorrectaMalImagenUpdate = document.getElementById(
            "respuestaCorrectaMalImagenUpdate"
          );
          respuestaCorrectaMalImagenUpdate.style.visibility = "visible";
          return;
        } else {
          respuestaCorrectaOK = newRespuestaCorrecta.val();
        }
      }

      var respuestaIncorrectaOK;
      if (newRespuestaIncorrecta.val() == "") {
        respuestaIncorrectaOK = respuestaIncorrecta;
      } else {
        if (
          !expresionesImagenUpdate.respuestaIncorrecta.test(
            newRespuestaIncorrecta.val()
          )
        ) {
          var respuestaIncorrectaMalImagenUpdate = document.getElementById(
            "respuestaIncorrectaMalImagenUpdate"
          );
          respuestaIncorrectaMalImagenUpdate.style.visibility = "visible";
          return;
        } else {
          respuestaIncorrectaOK = newRespuestaIncorrecta.val();
        }
      }

      var respuestaIncorrecta1OK;
      if (newRespuestaIncorrecta1.val() == "") {
        respuestaIncorrecta1OK = respuestaIncorrecta1;
      } else {
        if (
          !expresionesImagenUpdate.respuestaIncorrecta1.test(
            newRespuestaIncorrecta1.val()
          )
        ) {
          var respuestaIncorrecta1MalImagenUpdate = document.getElementById(
            "respuestaIncorrecta1MalImagenUpdate"
          );
          respuestaIncorrecta1MalImagenUpdate.style.visibility = "visible";
          return;
        } else {
          respuestaIncorrecta1OK = newRespuestaIncorrecta1.val();
        }
      }

      var respuestaIncorrecta2OK;
      if (newRespuestaIncorrecta2.val() == "") {
        respuestaIncorrecta2OK = respuestaIncorrecta2;
      } else {
        if (
          !expresionesImagenUpdate.respuestaIncorrecta2.test(
            newRespuestaIncorrecta2.val()
          )
        ) {
          var respuestaIncorrecta2MalImagenUpdate = document.getElementById(
            "respuestaIncorrecta2MalImagenUpdate"
          );
          respuestaIncorrecta2MalImagenUpdate.style.visibility = "visible";
          return;
        } else {
          respuestaIncorrecta2OK = newRespuestaIncorrecta2.val();
        }
      }

      updateImagen(
        id,
        descripcionOK,
        respuestaCorrectaOK,
        respuestaIncorrectaOK,
        respuestaIncorrecta1OK,
        respuestaIncorrecta2OK,
        descripcion,
        respuestaCorrecta,
        respuestaIncorrecta,
        respuestaIncorrecta1,
        respuestaIncorrecta2
      );
    } else {
      $("#modalCrear4x1").modal("hide");
      $("#internet").modal("show");
    }
  });

  function updateImagen(
    id,
    descripcionOK,
    respuestaCorrectaOK,
    respuestaIncorrectaOK,
    respuestaIncorrecta1OK,
    respuestaIncorrecta2OK,
    descripcion,
    respuestaCorrecta,
    respuestaIncorrecta,
    respuestaIncorrecta1,
    respuestaIncorrecta2
  ) {
    var urlPregunta = "http://localhost:3000/api/v2/pregunta/";
    var urlPreguntaImagen = "http://localhost:3000/api/v2/preguntaImagen/";

    let token = JSON.parse(localStorage.getItem("token"));
    onClickBotonUpdateImagen();

    if (navigator.onLine) {
      server(urlPregunta);
      server(urlPreguntaImagen);

      if (
        descripcionOK == descripcion &&
        respuestaCorrectaOK == respuestaCorrecta &&
        respuestaIncorrectaOK == respuestaIncorrecta &&
        respuestaIncorrecta1OK == respuestaIncorrecta1 &&
        respuestaIncorrecta2OK == respuestaIncorrecta2
      ) {
        putImagen(
          id,
          descripcionOK,
          respuestaCorrectaOK,
          respuestaIncorrectaOK,
          respuestaIncorrecta1OK,
          respuestaIncorrecta2OK
        );
      } else {
        onClickBotonUpdateImagen();

        fetch(urlPregunta, {
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
                res[j].descripcion == descripcionOK &&
                res[j].respuestaCorrecta == respuestaCorrectaOK &&
                res[j].respuestaIncorrecta == respuestaIncorrectaOK &&
                res[j].respuestaIncorrecta1 == respuestaIncorrecta1OK &&
                res[j].respuestaIncorrecta2 == respuestaIncorrecta2OK &&
                res[j].tiposDePregunta == "Imagen"
              ) {
                console.log("no entro aqui");
                var descripcionBienImagenUpdate = document.getElementById(
                  "descripcionBienImagenUpdate"
                );
                descripcionBienImagenUpdate.style.visibility = "visible";

                var respuestaCorrectaBienImagenUpdate = document.getElementById(
                  "respuestaCorrectaBienImagenUpdate"
                );
                respuestaCorrectaBienImagenUpdate.style.visibility = "visible";

                var respuestaIncorrectaBienImagenUpdate =
                  document.getElementById(
                    "respuestaIncorrectaBienImagenUpdate"
                  );
                respuestaIncorrectaBienImagenUpdate.style.visibility =
                  "visible";

                var respuestaIncorrecta1BienImagenUpdate =
                  document.getElementById(
                    "respuestaIncorrecta1BienImagenUpdate"
                  );
                respuestaIncorrecta1BienImagenUpdate.style.visibility =
                  "visible";

                var respuestaIncorrecta2BienImagenUpdate =
                  document.getElementById(
                    "respuestaIncorrecta2BienImagenUpdate"
                  );
                respuestaIncorrecta2BienImagenUpdate.style.visibility =
                  "visible";
                find = true;
              }
            }

            if (find == false) {
              putImagen(
                id,
                descripcionOK,
                respuestaCorrectaOK,
                respuestaIncorrectaOK,
                respuestaIncorrecta1OK,
                respuestaIncorrecta2OK
              );
            }
          })
          .finally(() => {
            quitarDivUpdateImagen();
          });
      }
    }
  }

  function putImagen(
    id,
    descripcionOK,
    respuestaCorrectaOK,
    respuestaIncorrectaOK,
    respuestaIncorrecta1OK,
    respuestaIncorrecta2OK
  ) {
    var urlPregunta = "http://localhost:3000/api/v2/pregunta/";
    var urlPreguntaImagen = "http://localhost:3000/api/v2/preguntaImagen/";

    let token = JSON.parse(localStorage.getItem("token"));
    var data = {
      descripcion: descripcionOK,
      respuestaCorrecta: respuestaCorrectaOK,
      respuestaIncorrecta: respuestaIncorrectaOK,
      respuestaIncorrecta1: respuestaIncorrecta1OK,
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
  }
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
  var descripcionMalUpdate4x1 = document.getElementById(
    "descripcionMalUpdate4x1"
  );
  descripcionMalUpdate4x1.style.visibility = "hidden";

  var respuestaCorrectaMalUpdate4x1 = document.getElementById(
    "respuestaCorrectaMalUpdate4x1"
  );
  respuestaCorrectaMalUpdate4x1.style.visibility = "hidden";

  var respuestaIncorrectaMalUpdate4x1 = document.getElementById(
    "respuestaIncorrectaMalUpdate4x1"
  );
  respuestaIncorrectaMalUpdate4x1.style.visibility = "hidden";

  var respuestaIncorrecta1MalUpdate = document.getElementById(
    "respuestaIncorrecta1MalUpdate"
  );
  respuestaIncorrecta1MalUpdate.style.visibility = "hidden";

  var respuestaIncorrecta2MalUpdate4x1 = document.getElementById(
    "respuestaIncorrecta2MalUpdate4x1"
  );
  respuestaIncorrecta2MalUpdate4x1.style.visibility = "hidden";

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
  var descripcionMalUpdateVoF = document.getElementById(
    "descripcionMalUpdateVoF"
  );
  descripcionMalUpdateVoF.style.visibility = "hidden";
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
  var descripcionMalImagenUpdate = document.getElementById(
    "descripcionMalImagenUpdate"
  );
  descripcionMalImagenUpdate.style.visibility = "hidden";

  var imagenMalUpdate = document.getElementById("imagenMalUpdate");
  imagenMalUpdate.style.visibility = "hidden";

  var respuestaCorrectaMalImagenUpdate = document.getElementById(
    "respuestaCorrectaMalImagenUpdate"
  );
  respuestaCorrectaMalImagenUpdate.style.visibility = "hidden";

  var respuestaIncorrectaMalImagenUpdate = document.getElementById(
    "respuestaIncorrectaMalImagenUpdate"
  );
  respuestaIncorrectaMalImagenUpdate.style.visibility = "hidden";

  var respuestaIncorrecta1MalImagenUpdate = document.getElementById(
    "respuestaIncorrecta1MalImagenUpdate"
  );
  respuestaIncorrecta1MalImagenUpdate.style.visibility = "hidden";

  var respuestaIncorrecta2MalImagenUpdate = document.getElementById(
    "respuestaIncorrecta2MalImagenUpdate"
  );
  respuestaIncorrecta2MalImagenUpdate.style.visibility = "hidden";

  var botonModificarImagen = document.getElementById("botonModificarImagen");
  var chargerModificarImagen = document.getElementById(
    "chargerModificarImagen"
  );

  chargerModificarImagen.style.opacity = "0";
  botonModificarImagen.innerHTML = "Modificar Pregunta";
  botonModificarImagen.disabled = false;
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

const validarFormulario4x1Update = (e) => {
  console.log(e);
  switch (e.target.name) {
    case "descripcionUpdate4x1":
      validarCampoUpdate(
        expresiones4x1Update.descripcion,
        e.target,
        "descripcion"
      );
      break;
    case "respuestaCorrectaUpdate4x1":
      validarCampoUpdate(
        expresiones4x1Update.respuestaCorrecta,
        e.target,
        "respuestaCorrecta"
      );
      break;
    case "respuestaIncorrectaUpdate4x1":
      validarCampoUpdate(
        expresiones4x1Update.respuestaIncorrecta,
        e.target,
        "respuestaIncorrecta"
      );
      break;
    case "respuestaIncorrecta1Update4x1":
      validarCampoUpdate(
        expresiones4x1Update.respuestaIncorrecta1,
        e.target,
        "respuestaIncorrecta1"
      );
      break;
    case "respuestaIncorrecta2BienUpdate4x1":
      validarCampoUpdate(
        expresiones4x1Update.respuestaIncorrecta2,
        e.target,
        "respuestaIncorrecta2"
      );
      break;
  }
};

const validarCampoUpdate = (expresion, input, campo) => {
  var descripcionMalUpdate4x1 = document.getElementById(
    "descripcionMalUpdate4x1"
  );
  descripcionMalUpdate4x1.style.visibility = "hidden";

  var respuestaCorrectaMalUpdate4x1 = document.getElementById(
    "respuestaCorrectaMalUpdate4x1"
  );
  respuestaCorrectaMalUpdate4x1.style.visibility = "hidden";

  var respuestaIncorrectaMalUpdate4x1 = document.getElementById(
    "respuestaIncorrectaMalUpdate4x1"
  );
  respuestaIncorrectaMalUpdate4x1.style.visibility = "hidden";

  var respuestaIncorrecta1MalUpdate = document.getElementById(
    "respuestaIncorrecta1MalUpdate"
  );
  respuestaIncorrecta1MalUpdate.style.visibility = "hidden";

  var respuestaIncorrecta2MalUpdate4x1 = document.getElementById(
    "respuestaIncorrecta2MalUpdate4x1"
  );
  respuestaIncorrecta2MalUpdate4x1.style.visibility = "hidden";

  //Aqui
  var descripcionBienUpdate4x1 = document.getElementById(
    "descripcionBienUpdate4x1"
  );
  descripcionBienUpdate4x1.style.visibility = "hidden";

  var respuestaCorrectaBienUpdate4x1 = document.getElementById(
    "respuestaCorrectaBienUpdate4x1"
  );
  respuestaCorrectaBienUpdate4x1.style.visibility = "hidden";

  var respuestaIncorrectaBienUpdate4x1 = document.getElementById(
    "respuestaIncorrectaBienUpdate4x1"
  );
  respuestaIncorrectaBienUpdate4x1.style.visibility = "hidden";

  var respuestaIncorrecta1BienUpdate = document.getElementById(
    "respuestaIncorrecta1BienUpdate"
  );
  respuestaIncorrecta1BienUpdate.style.visibility = "hidden";

  var respuestaIncorrecta2BienUpdate4x1 = document.getElementById(
    "respuestaIncorrecta2BienUpdate4x1"
  );
  respuestaIncorrecta2BienUpdate4x1.style.visibility = "hidden";

  if (expresion.test(input.value)) {
    campos4x1Update[campo] = true;
  } else if (campo == "descripcion") {
    descripcionMalUpdate4x1.style.visibility = "visible";
    campos4x1Update[campo] = false;
  } else if (campo == "respuestaCorrecta") {
    respuestaCorrectaMalUpdate4x1.style.visibility = "visible";
    campos4x1Update[campo] = false;
  } else if (campo == "respuestaIncorrecta") {
    respuestaIncorrectaMalUpdate4x1.style.visibility = "visible";
    campos4x1Update[campo] = false;
  } else if (campo == "respuestaIncorrecta1") {
    respuestaIncorrecta1MalUpdate.style.visibility = "visible";
    campos4x1Update[campo] = false;
  } else if (campo == "respuestaIncorrecta2") {
    respuestaIncorrecta2MalUpdate4x1.style.visibility = "visible";
    campos4x1Update[campo] = false;
  }
};

const inputs4x1Update = document.querySelectorAll("#formularioUpdate4x1 input");

inputs4x1Update.forEach((input) => {
  input.addEventListener("keyup", validarFormulario4x1Update);
});

const validarFormularioVoFUpdate = (e) => {
  console.log(e);
  switch (e.target.name) {
    case "descripcionUpdateVoF":
      validarCampoUpdateVoF(
        expresionesVoFUpdate.descripcion,
        e.target,
        "descripcion"
      );
      break;
  }
};

const validarCampoUpdateVoF = (expresion, input, campo) => {
  var descripcionMalUpdateVoF = document.getElementById(
    "descripcionMalUpdateVoF"
  );
  descripcionMalUpdateVoF.style.visibility = "hidden";

  //Aqui
  var descripcionBienUpdateVoF = document.getElementById(
    "descripcionBienUpdateVoF"
  );
  descripcionBienUpdateVoF.style.visibility = "hidden";

  if (expresion.test(input.value)) {
    campos4x1Update[campo] = true;
  } else if (campo == "descripcion") {
    descripcionMalUpdateVoF.style.visibility = "visible";
    campos4x1Update[campo] = false;
  }
};

const inputsVoFUpdate = document.querySelectorAll("#formularioUpdateVoF input");

inputsVoFUpdate.forEach((input) => {
  input.addEventListener("keyup", validarFormularioVoFUpdate);
});

const validarFormularioImagenUpdate = (e) => {
  console.log(e);
  switch (e.target.name) {
    case "descripcionImagenUpdate":
      validarCampoUpdateImagen(
        expresionesImagenUpdate.descripcion,
        e.target,
        "descripcion"
      );
      break;
    case "respuestaCorrectaImagenUpdate":
      validarCampoUpdateImagen(
        expresionesImagenUpdate.respuestaCorrecta,
        e.target,
        "respuestaCorrecta"
      );
      break;
    case "respuestaIncorrectaImagenUpdate":
      validarCampoUpdateImagen(
        expresionesImagenUpdate.respuestaIncorrecta,
        e.target,
        "respuestaIncorrecta"
      );
      break;
    case "respuestaIncorrecta1ImagenUpdate":
      validarCampoUpdateImagen(
        expresionesImagenUpdate.respuestaIncorrecta1,
        e.target,
        "respuestaIncorrecta1"
      );
      break;
    case "respuestaIncorrecta2ImagenUpdate":
      validarCampoUpdateImagen(
        expresionesImagenUpdate.respuestaIncorrecta2,
        e.target,
        "respuestaIncorrecta2"
      );
      break;
  }
};

function validarExtensionArchivoUpdate() {
  var fileInput = document.getElementById("imagenUpdate");
  console.log(fileInput);
  var filePath = fileInput.value;
  var allowedExtensions = /\.(jpg|jpeg|png)$/i;
  if (!allowedExtensions.exec(filePath)) {
    var imagenMalUpdate = document.getElementById("imagenMalUpdate");
    imagenMalUpdate.style.visibility = "visible";

    fileInput.value = "";
    return false;
  } else {
    var imagenMalUpdate = document.getElementById("imagenMalUpdate");
    imagenMalUpdate.style.visibility = "hidden";
    return true;
  }
}

const validarCampoUpdateImagen = (expresion, input, campo) => {
  var descripcionMalImagenUpdate = document.getElementById(
    "descripcionMalImagenUpdate"
  );
  descripcionMalImagenUpdate.style.visibility = "hidden";

  var respuestaCorrectaMalImagenUpdate = document.getElementById(
    "respuestaCorrectaMalImagenUpdate"
  );
  respuestaCorrectaMalImagenUpdate.style.visibility = "hidden";

  var respuestaIncorrectaMalImagenUpdate = document.getElementById(
    "respuestaIncorrectaMalImagenUpdate"
  );
  respuestaIncorrectaMalImagenUpdate.style.visibility = "hidden";

  var respuestaIncorrecta1MalImagenUpdate = document.getElementById(
    "respuestaIncorrecta1MalImagenUpdate"
  );
  respuestaIncorrecta1MalImagenUpdate.style.visibility = "hidden";

  var respuestaIncorrecta2MalImagenUpdate = document.getElementById(
    "respuestaIncorrecta2MalImagenUpdate"
  );
  respuestaIncorrecta2MalImagenUpdate.style.visibility = "hidden";

  //Aqui
  var descripcionBienImagenUpdate = document.getElementById(
    "descripcionBienImagenUpdate"
  );
  descripcionBienImagenUpdate.style.visibility = "hidden";

  var respuestaCorrectaBienImagenUpdate = document.getElementById(
    "respuestaCorrectaBienImagenUpdate"
  );
  respuestaCorrectaBienImagenUpdate.style.visibility = "hidden";

  var respuestaIncorrectaBienImagenUpdate = document.getElementById(
    "respuestaIncorrectaBienImagenUpdate"
  );
  respuestaIncorrectaBienImagenUpdate.style.visibility = "hidden";

  var respuestaIncorrecta1BienImagenUpdate = document.getElementById(
    "respuestaIncorrecta1BienImagenUpdate"
  );
  respuestaIncorrecta1BienImagenUpdate.style.visibility = "hidden";

  var respuestaIncorrecta2BienImagenUpdate = document.getElementById(
    "respuestaIncorrecta2BienImagenUpdate"
  );
  respuestaIncorrecta2BienImagenUpdate.style.visibility = "hidden";

  if (expresion.test(input.value)) {
    camposImagenUpdate[campo] = true;
  } else if (campo == "descripcion") {
    descripcionMalImagenUpdate.style.visibility = "visible";
    camposImagenUpdate[campo] = false;
  } else if (campo == "respuestaCorrecta") {
    respuestaCorrectaMalImagenUpdate.style.visibility = "visible";
    camposImagenUpdate[campo] = false;
  } else if (campo == "respuestaIncorrecta") {
    respuestaIncorrectaMalImagenUpdate.style.visibility = "visible";
    camposImagenUpdate[campo] = false;
  } else if (campo == "respuestaIncorrecta1") {
    respuestaIncorrecta1MalImagenUpdate.style.visibility = "visible";
    camposImagenUpdate[campo] = false;
  } else if (campo == "respuestaIncorrecta2") {
    respuestaIncorrecta2MalImagenUpdate.style.visibility = "visible";
    camposImagenUpdate[campo] = false;
  }
};

const inputsImagenUpdate = document.querySelectorAll(
  "#formularioUpdateImagen input"
);

inputsImagenUpdate.forEach((input) => {
  input.addEventListener("keyup", validarFormularioImagenUpdate);
});
