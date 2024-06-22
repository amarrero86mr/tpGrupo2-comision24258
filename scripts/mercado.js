document.getElementById("btn_filter").addEventListener("change", function () {
  var lista_filter = document.querySelector(".lista_filter");
  if (this.checked) {
    lista_filter.classList.add("active");
  } else {
    lista_filter.classList.remove("active");
  }
});
