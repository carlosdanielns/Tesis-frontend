//Esto es para poder utilizar los datos de la pantalla anterior a esta en este caso era la de nivel
var dataFromlocalStorage = JSON.parse(localStorage.getItem("nivelBD"));
console.log(dataFromlocalStorage);

//Estas son las constantes para poder llenar los datos y poder cambiar los datos
const colorRojo = "linkrojo";
const colorVerde = "linkverde";

const inputRespuestas1 = "#respuesta1";
const inputRespuestas2 = "#respuesta2";
const inputRespuestas3 = "#respuesta3";
const inputRespuestas4 = "#respuesta4";

var cantidad_preguntas = 0;
var cantidadMostrar = 1;

//Este es el boton para cambiar hacia la siguiente pregunta.
var siguiente = document.getElementById("siguiente");
var btnSiguiente = siguiente.addEventListener("click", cargarPreguntaNuevo);

//Esta es para cargar la pregunta nueva y quitarle la clase de css de los colores de la respuesta
function cargarPreguntaNuevo(btnSiguiente) {
  if (cantidad_preguntas == dataFromlocalStorage.nivel.preguntas.length - 1) {
    location.replace("/finalizarNivel");
  } else if (btnSiguiente.target) {
    $(inputRespuestas1).removeClass(colorVerde);
    $(inputRespuestas1).removeClass(colorRojo);
    $(inputRespuestas2).removeClass(colorVerde);
    $(inputRespuestas2).removeClass(colorRojo);
    $(inputRespuestas3).removeClass(colorVerde);
    $(inputRespuestas3).removeClass(colorRojo);
    $(inputRespuestas4).removeClass(colorVerde);
    $(inputRespuestas4).removeClass(colorRojo);
    //esta cantidad es para poder tener el conteo de las preguntas
    cantidad_preguntas++;
    cantidadMostrar++;
    window.addEventListener("load", ajax(cantidad_preguntas));
    //esta funcion es para cambiar el input de la cantidad de preguntas q tiene el nivel
    cantidadPreguntas();
  }
}

function cantidadPreguntas() {
  const inputCantidad = document.getElementById("inputCantiPreguntas");
  inputCantidad.value =
    cantidadMostrar + "/" + dataFromlocalStorage.nivel.preguntas.length;
}

window.addEventListener("load", ajax(cantidad_preguntas));

//Esta funcion lo que hace es cambiar los valores de los input que estan en cada pregunta
function cambiaValores(valor, valorPantalla) {
  var inputNombre = document.getElementById(valor.id);
  inputNombre.value = valorPantalla;
}

//esta funcion lo que hace es tomar los datos del array y poner en la pantalla
function cambiarDatosPantalla(arrayShuffle) {
  document.getElementById("parrafoPregunta").innerHTML =
    dataFromlocalStorage.nivel.preguntas[cantidad_preguntas].descripcion;
  cambiaValores(respuesta1, arrayShuffle[0]);
  cambiaValores(respuesta2, arrayShuffle[1]);
  cambiaValores(respuesta3, arrayShuffle[2]);
  cambiaValores(respuesta4, arrayShuffle[3]);
}

//esat es la funcion principal
function ajax(cantidad_preguntas) {
  if (cantidad_preguntas == dataFromlocalStorage.nivel.preguntas.length - 1) {
    var terminar = (siguiente.value = "Terminar");
  }
  //aqui se carga cada vez q se cambia de pregunta
  cantidadPreguntas();
  /*este es el array de las respuestas por tanto yo obtengo las respuestas de la base de datos
    y luego las agrego a este array para poder despues hacerle un shuffle para poder variar las opciones
*/
  var arrayRespuestas = [];
  arrayRespuestas.push(
    dataFromlocalStorage.nivel.preguntas[cantidad_preguntas].respuestaCorrecta
  );
  arrayRespuestas.push(
    dataFromlocalStorage.nivel.preguntas[cantidad_preguntas].respuestaIncorrecta
  );
  arrayRespuestas.push(
    dataFromlocalStorage.nivel.preguntas[cantidad_preguntas]
      .respuestaIncorrecta1
  );
  arrayRespuestas.push(
    dataFromlocalStorage.nivel.preguntas[cantidad_preguntas]
      .respuestaIncorrecta2
  );

  var arrayShuffle = shuffle(arrayRespuestas);

  cambiarDatosPantalla(arrayShuffle);
  cambiar_color_bajr_vidas(
    dataFromlocalStorage.nivel.preguntas[cantidad_preguntas].respuestaCorrecta
  );
}

function cambiar_color_bajr_vidas(valorCorrecto) {
  var inputArray = document.querySelectorAll("input");

  for (var index = 0; index < inputArray.length; index++) {
    var btn = inputArray[index].addEventListener("click", cambiarColores);
  }

  function cambiarColores(btn) {
    var botonTocado = btn.target.id;
    console.log(botonTocado);
    if (btn.target.value == valorCorrecto) {
      $("#" + botonTocado + "").removeClass();
      $("#" + botonTocado + "").addClass(colorVerde);
      var inputNuevo = document.querySelectorAll("input");
      console.log(inputNuevo);
      for (var index = 0; index < inputNuevo.length; index++) {
        var btn = inputNuevo[index].removeEventListener(
          "click",
          cambiarColores
        );
      }
    } else if (btn.target.value != valorCorrecto) {
      $("#" + botonTocado + "").removeClass(
        "btn btn-outline-light btn-lg px-5"
      );
      $("#" + botonTocado + "").addClass(colorRojo);

      for (var index = 0; index < inputNuevo.length; index++) {
        var btn = inputNuevo[index].removeEventListener(
          "click",
          cambiarColores
        );
      }
    }
  }
}
