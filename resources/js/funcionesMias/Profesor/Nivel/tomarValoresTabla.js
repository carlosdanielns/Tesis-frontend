$("table").on("click", ".listar-pregunta", function () {
  let row = $(this).closest("tr");
  var id = row.find(".id").text();
  var data = {
    id: id,
  };

  // Lo parseamos a texto para guardarlo en el localStorage
  localStorage.setItem("nivelId", JSON.stringify(data));

  location.replace("/pregunta/listado");
});
