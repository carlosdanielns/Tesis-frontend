
$("table").on("click", ".listar-nivel", function () {
  let row = $(this).closest("tr");
  var id = row.find(".id").text();
  var data = {
    id: id,
  };

  // Lo parseamos a texto para guardarlo en el localStorage
  localStorage.setItem("temaId", JSON.stringify(data));

  location.replace("/nivel/listado");
});
