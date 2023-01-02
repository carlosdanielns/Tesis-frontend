const nivel = JSON.parse(localStorage.getItem("nivelId"));
const usuario = JSON.parse(localStorage.getItem("usuario"));

function modalInformacion() {
  $("#modalInformacion").modal("show");
  var nombreUsuario = document.getElementById("nombreUsuario");
  var nombreAsigantura = document.getElementById("nombreAsigantura");
  var descripcionNivel = document.getElementById("descripcionNivel");
  var nota5Nivel = document.getElementById("nota5Nivel");
  var tiempoDuracionNivel = document.getElementById("tiempoDuracionNivel");

  if (
    nombreUsuario.innerHTML == "" &&
    nombreAsigantura.innerHTML == "" //&&
    //descripcionNivel.innerHTML == "" &&
    //nota5Nivel.innerHTML == "" &&
    //tiempoDuracionNivel == ""
  ) {
    onClickModal();
    buscarProfesor();
  }
}

const selectElement = document.getElementById("tipo");
selectElement.addEventListener("onchange", cargarDatos());

function cargarDatos() {
  var tipo;
  tipo = selectElement.options[selectElement.selectedIndex].text;
  console.log(tipo);
  eliminarTabla();
  crearThead(tipo);
  llenarTabla(tipo);
}

function eliminarTabla() {
  const tabla = document.getElementById("table");
  tabla.remove();
}

function llenarTabla(tipo) {
  let token = JSON.parse(localStorage.getItem("token"));

  const urlNivel = "http://localhost:3000/api/v2/nivel/";

  if (navigator.onLine) {
    server(urlNivel);

    fetch(urlNivel + nivel.id, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */ /*",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resById) => resById.json())
      .then((resById) => {
        if (resById.status == 401 || resById.statusCode == 401) {
          $("#modal401").modal({
            backdrop: "static",
            keyboard: false,
          });
          $("#modal401").modal("show");
        } else if (resById.status != 500 || resById.statusCode != 500) {
          crearTbody(resById.preguntas, tipo);
        }
      })
      .finally(() => {
        quitarTable();
      });
  } else {
    $("#internet").modal("show");
  }
}

function quitarTable() {
  var divPrincipal = document.getElementById("divPrincipal");
  var mainPrincipal = document.getElementById("mainPrincipal");
  var chargerTable = document.getElementById("chargerTable");

  chargerTable.style.visibility = "hidden";
  chargerTable.style.opacity = "0";
  mainPrincipal.style.display = "block";
  divPrincipal.style.display = "block";
}

function crearThead(tipo) {
  var divTable = document.getElementById("divTable");
  var table = document.createElement("table");
  table.id = "table";
  table.className = "w-full text-sm text-center text-gray-500";
  var thead = document.createElement("thead");
  thead.className = "text-lg text-gray-700 bg-gray-50";
  var tbody = document.createElement("tbody");
  tbody.id = "tbody";

  table.appendChild(thead);
  table.appendChild(tbody);

  if (tipo == "4 x 1") {
    let row_1 = document.createElement("tr");
    let heading_1 = document.createElement("th");
    heading_1.scope = "col";
    heading_1.innerHTML = "_id";
    heading_1.className = "py-3 px-6 columnaID";

    let heading_2 = document.createElement("th");
    heading_2.innerHTML = "#";
    heading_2.scope = "col";
    heading_2.className = "py-3 px-6";

    let heading_3 = document.createElement("th");
    heading_3.innerHTML = "Descripcion";
    heading_3.scope = "col";
    heading_3.className = "py-3 px-6";

    let heading_4 = document.createElement("th");
    heading_4.innerHTML = "Respuesta Correcta";
    heading_4.scope = "col";
    heading_4.className = "py-3 px-6";

    let heading_5 = document.createElement("th");
    heading_5.innerHTML = "Respuesta Incorrecta";
    heading_5.scope = "col";
    heading_5.className = "py-3 px-6";

    let heading_6 = document.createElement("th");
    heading_6.innerHTML = "Respuesta Incorrecta";
    heading_6.scope = "col";
    heading_6.className = "py-3 px-6";

    let heading_7 = document.createElement("th");
    heading_7.innerHTML = "Respuesta Incorrecta";
    heading_7.scope = "col";
    heading_7.className = "py-3 px-6";

    let heading_8 = document.createElement("th");
    heading_8.innerHTML = "Acciones";
    heading_8.scope = "col";
    heading_8.className = "py-3 px-6";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    row_1.appendChild(heading_5);
    row_1.appendChild(heading_6);
    row_1.appendChild(heading_7);
    row_1.appendChild(heading_8);
    thead.appendChild(row_1);
    divTable.appendChild(table);
  } else if (tipo == "V o F") {
    let row_1 = document.createElement("tr");
    let heading_1 = document.createElement("th");
    heading_1.scope = "col";
    heading_1.innerHTML = "_id";
    heading_1.className = "py-3 px-6 columnaID";

    let heading_2 = document.createElement("th");
    heading_2.innerHTML = "#";
    heading_2.scope = "col";
    heading_2.className = "py-3 px-6";

    let heading_3 = document.createElement("th");
    heading_3.innerHTML = "Descripcion";
    heading_3.scope = "col";
    heading_3.className = "py-3 px-6";

    let heading_4 = document.createElement("th");
    heading_4.innerHTML = "Respuesta Correcta";
    heading_4.scope = "col";
    heading_4.className = "py-3 px-6";

    let heading_5 = document.createElement("th");
    heading_5.innerHTML = "Respuesta Incorrecta";
    heading_5.scope = "col";
    heading_5.className = "py-3 px-6";

    let heading_6 = document.createElement("th");
    heading_6.innerHTML = "Acciones";
    heading_6.scope = "col";
    heading_6.className = "py-3 px-6";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    row_1.appendChild(heading_5);
    row_1.appendChild(heading_6);
    thead.appendChild(row_1);
    divTable.appendChild(table);
  } else if (tipo == "Imagen") {
    let row_1 = document.createElement("tr");
    let heading_1 = document.createElement("th");
    heading_1.scope = "col";
    heading_1.innerHTML = "_id";
    heading_1.className = "columnaID";
    let heading_2 = document.createElement("th");
    heading_2.innerHTML = "#";
    heading_2.scope = "col";
    heading_2.className = "py-3 px-6";

    let heading_3 = document.createElement("th");
    heading_3.innerHTML = "Imagen";
    heading_3.scope = "col";
    heading_3.className = "py-3";

    let heading_4 = document.createElement("th");
    heading_4.innerHTML = "Descripcion";
    heading_4.scope = "col";
    heading_4.className = "py-3 px-6";

    let heading_5 = document.createElement("th");
    heading_5.innerHTML = "Respuesta Correcta";
    heading_5.scope = "col";
    heading_5.className = "py-3 px-6";

    let heading_6 = document.createElement("th");
    heading_6.innerHTML = "Respuesta Incorrecta";
    heading_6.scope = "col";
    heading_6.className = "py-3 px-6";

    let heading_7 = document.createElement("th");
    heading_7.innerHTML = "Respuesta Incorrecta";
    heading_7.scope = "col";
    heading_7.className = "py-3 px-6";

    let heading_8 = document.createElement("th");
    heading_8.innerHTML = "Respuesta Incorrecta";
    heading_8.scope = "col";
    heading_8.className = "py-3 px-6";

    let heading_9 = document.createElement("th");
    heading_9.innerHTML = "Acciones";
    heading_9.scope = "col";
    heading_9.className = "py-3 px-6";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    row_1.appendChild(heading_5);
    row_1.appendChild(heading_6);
    row_1.appendChild(heading_7);
    row_1.appendChild(heading_8);
    row_1.appendChild(heading_9);
    thead.appendChild(row_1);
    divTable.appendChild(table);
  }
}

function crearTbody(res, tipo) {
  var tbody = $("tbody");
  for (let i = 0; i < res.length; i++) {
    if (res[i].tiposDePregunta == tipo && tipo == "4 x 1") {
      tbody.append(`
        <tr class="bg-white border-b hover:bg-gray-50">
        <td class="text-base p-4 w-2 id columnaID">${res[i]._id}</td>
          <td class="text-base p-4 w-32 numero">${i + 1}</td>
          <td class="text-base p-4 w-32 descripcion">${res[i].descripcion}</td>
          <td class="text-base p-4 w-32 respuestaCorrecta">${
            res[i].respuestaCorrecta
          }</td>
          <td class="text-base p-4 w-32 respuestaIncorrecta">${
            res[i].respuestaIncorrecta
          }</td>
          <td class="text-base p-4 w-32 respuestaIncorrecta1">${
            res[i].respuestaIncorrecta1
          }</td>
          <td class="text-base p-4 w-32 respuestaIncorrecta2">${
            res[i].respuestaIncorrecta2
          }</td>
          <td class="text-base p-4 w-32"  >
          <button class="modificar font-medium text-cyan-600 hover:underline" onclick="update('${
            res[i]._id
          }','${res[i].descripcion}','${res[i].respuestaCorrecta}','${
        res[i].respuestaIncorrecta
      }','${res[i].respuestaIncorrecta1}','${
        res[i].respuestaIncorrecta2
      }')"><i class="far fa-edit"></i></button>
          <button class="eliminar font-medium text-red-600 hover:underline" onclick="eliminar('${
            res[i]._id
          }')"><i class="far fa-trash-alt"></i></button>
          </td>
        </tr>                        
      `);
    } else if (res[i].tiposDePregunta == tipo && tipo == "V o F") {
      tbody.append(`
        <tr class="bg-white border-b hover:bg-gray-50">
        <td class="text-base p-4 w-32 id columnaID">${res[i]._id}</td>
          <td class="text-base p-4 w-2 numero">${i + 1}</td>
          <td class="text-base p-4 w-32 descripcion">${res[i].descripcion}</td>
          <td class="text-base p-4 w-32 respuestaCorrecta">${
            res[i].respuestaCorrecta
          }</td>
          <td class="text-base p-4 w-32 respuestaIncorrecta">${
            res[i].respuestaIncorrecta
          }</td>
          <td class="text-base p-4 w-32" >
          <button class="modificar font-medium text-cyan-600 hover:underline" onclick="update('${
            res[i]._id
          }','${res[i].descripcion}','${res[i].respuestaCorrecta}','${
        res[i].respuestaIncorrecta
      }')"><i class="far fa-edit"></i></button>
          <button class="eliminar font-medium text-red-600 hover:underline" onclick="eliminar('${
            res[i]._id
          }')"><i class="far fa-trash-alt"></i></button>
          </td>
        </tr>                        
      `);
    } else if (res[i].tiposDePregunta == tipo && tipo == "Imagen") {
      tbody.append(`
      <tr class="bg-white border-b hover:bg-gray-50">
      <td class="text-base p-4 w-32 id columnaID">${res[i]._id}</td>
        <td class="text-base p-4 w-2 numero">${i + 1}</td>
        <td  class="text-base content-center p-4 w-6 imagen" id="imagenTabla"><img onclick="mostrar('${
          res[i].imagen
        }')" src="${res[i].imagen}" width="100" height="80"></td>
        <td class="text-base p-4 w-32 descripcion">${res[i].descripcion}</td>
        <td class="text-base p-4 w-32 respuestaCorrecta">${
          res[i].respuestaCorrecta
        }</td>
        <td class="text-base p-4 w-32 respuestaIncorrecta">${
          res[i].respuestaIncorrecta
        }</td>
        <td class="text-base p-4 w-32 respuestaIncorrecta1">${
          res[i].respuestaIncorrecta1
        }</td>
        <td class="text-base p-4 w-32 respuestaIncorrecta2">${
          res[i].respuestaIncorrecta2
        }</td>
        <td class="text-base p-4 w-32" >
        <button class="modificar font-medium text-cyan-600 hover:underline" onclick="update('${
          res[i]._id
        }','${res[i].descripcion}','${res[i].respuestaCorrecta}','${
        res[i].respuestaIncorrecta
      }','${res[i].respuestaIncorrecta1}','${
        res[i].respuestaIncorrecta2
      }')"><i class="far fa-edit"></i></button>
        <button class="eliminar font-medium text-red-600 hover:underline" onclick="eliminar('${
          res[i]._id
        }')" ><i class="far fa-trash-alt"></i></button>
        </td>
      </tr>                        
    `);
    }
  }
}

function mostrar(imagenBD) {
  var imagen = document.getElementById("fotoModal");
  imagen.src = imagenBD;
  $("#modalFoto").modal("show");
}

function onClickModal() {
  var charger = document.getElementById("charger");
  charger.style.visibility = "visible";
  charger.style.opacity = "100";
}

function quitarDiv() {
  var charger = document.getElementById("charger");
  charger.style.visibility = "hidden";
  charger.style.opacity = "0";
}

function buscarProfesor() {
  var urlProfesor = "http://localhost:3000/api/v2/profesor/";
  let token = JSON.parse(localStorage.getItem("token"));
  console.log(urlProfesor + usuario.CI);
  if (navigator.onLine) {
    server(urlProfesor);
    fetch(urlProfesor + usuario.CI, {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resByCI) => resByCI.json())
      .then((resByCI) => {
        var urlNivel = "http://localhost:3000/api/v2/nivel/";
        let token = JSON.parse(localStorage.getItem("token"));

        fetch(urlNivel + nivel.id, {
          method: "get",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resById) => resById.json())
          .then((resById) => {
            console.log(resById);
            var nombreUsuario = document.getElementById("nombreUsuario");
            nombreUsuario.innerHTML = "" + resByCI.name;
            var nombreAsigantura = document.getElementById("nombreAsigantura");
            nombreAsigantura.innerHTML = "" + resByCI.asignatura;
            var descripcionNivel = document.getElementById("descripcionNivel");
            var nota5Nivel = document.getElementById("nota5Nivel");
            var tiempoDuracionNivel = document.getElementById(
              "tiempoDuracionNivel"
            );
            descripcionNivel.innerHTML = "" + resById.descripcion;
            nota5Nivel.innerHTML = "" + resById.nota5;
            tiempoDuracionNivel.innerHTML = "" + resById.tiempoDuracion;
          })
          .finally(() => {
            quitarDiv();
          });
      });
  } else {
    $("#modalInformacion").modal("hide");
    $("#internet").modal("show");
  }
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
