const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/a", (req, res) => {
  res.sendFile(__dirname + "/views" + "/a.html");
});

//Inicio
app.get("/inicio", (req, res) => {
  res.sendFile(__dirname + "/views" + "/inicioAplicacion.html");
});


//---------------------Profesor
app.get("/profesor/principal", (req, res) => {
  res.sendFile(__dirname + "/views" + "/profesorPrincipal.html");
});

app.get("/profesor/configuracion", (req, res) => {
  res.sendFile(__dirname + "/views" + "/profesorConfiguracion.html");
});

//---------------------Tema--------------------
app.get("/tema/listado", (req, res) => {
  res.sendFile(__dirname + "/views" + "/profesorTemaListar.html");
});

//---------------------Nivel--------------------
app.get("/nivel/listado", (req, res) => {
  res.sendFile(__dirname + "/views" + "/profesorNivelListar.html");
});

//---------------------Pregunta-----------------
app.get("/pregunta/listado", (req, res) => {
  res.sendFile(__dirname + "/views" + "/profesorPreguntaListar.html");
});

app.get("/nota", (req, res) => {
  res.sendFile(__dirname + "/views" + "/profesorNotasXAnno.html");
});

//---------------------------Administrador
app.get("/administrador/principal", (req, res) => {
  res.sendFile(__dirname + "/views" + "/administradorPrincipal.html");
});

app.get("/profesor/listado", (req, res) => {
  res.sendFile(__dirname + "/views" + "/administradorProfesor.html");
});

app.get("/estudiante/listado", (req, res) => {
  res.sendFile(__dirname + "/views" + "/administradorEstudiante.html");
});

app.get("/asignatura/listado", (req, res) => {
  res.sendFile(__dirname + "/views" + "/administradorAsignatura.html");
});

app.get("/usuario/listado", (req, res) => {
  res.sendFile(__dirname + "/views" + "/administradorUsuario.html");
});

//----------------------------Estudiante-
app.get("/estudiante/asignatura", (req, res) => {
  res.sendFile(__dirname + "/views" + "/estudianteAsignaturas.html");
});

app.get("/estudiante/temas", (req, res) => {
  res.sendFile(__dirname + "/views" + "/estudianteTemas.html");
});

app.get("/estudiante/pregunta", (req, res) => {
  res.sendFile(__dirname + "/views" + "/estudiantePregunta.html");
});

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/resources")));
app.get("/favicon.ico", (req, res) => res.status(204));

app.listen(port, () => {
  console.log("Puerto agregado" + port);
});
