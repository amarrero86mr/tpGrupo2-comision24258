const usuariosRegistrados = { email: "usuario1@gmail.com", pass: "1234" };

const credencial = document.querySelector("#formLogin");
credencial.addEventListener("submit", (e) => {
  e.preventDefault();

  const obtenerEmail = document.getElementById("emailUsuario").value;
  const obtenerClave = document.getElementById("claveUsuario").value;
  const datosForm = { email: obtenerEmail, pass: obtenerClave };
  miLogin(datosForm);
});

function miLogin(credenciales) {
  if (
    credenciales.email == usuariosRegistrados.email &&
    credenciales.pass == usuariosRegistrados.pass
  ) {
    window.location.href = "./nosotros.html";
  } else {
    alert("El usuario y/o contraseña no son validos!");
  }
}

