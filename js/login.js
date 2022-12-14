import {
  validarNombreUsuario,
  validarContrasenia,
  validarEmail,
} from "./helpers.js";
import { userAdmin, Usuario } from "./UserAdmin.js";

const modalFormLogin = new bootstrap.Modal(
  document.querySelector("#modalLogin")
);
let listaUsuarios = JSON.parse(localStorage.getItem("listaUsuariosKey")) || [];

function mostrarModal() {
  modalFormLogin.show();
  limpiarModal();
}

function guardarDatosEnLS() {
  localStorage.setItem("listaUsuariosKey", JSON.stringify(listaUsuarios));
}

const btnLogin = document.querySelector("#btnModal");
let formulario = document.querySelector("#formLogin");
let nombre = document.querySelector("#nombre");
let email = document.querySelector("#email");
let contrasenia = document.querySelector("#contraseña");

btnLogin.addEventListener("click", mostrarModal);
formulario.addEventListener("submit", crearUsuario);
nombre.addEventListener("blur", () => {
  validarNombreUsuario(nombre);
});
email.addEventListener("blur", () => {
  validarEmail(email);
});
contrasenia.addEventListener("blur", () => {
  validarContrasenia(contrasenia);
});

function crearUsuario(e) {
  e.preventDefault();
  if (
    validarNombreUsuario(nombre) &&
    validarContrasenia(contrasenia) &&
    validarEmail(email)
  ) {
    const nuevoUsuario = new Usuario(
      nombre.value,
      email.value,
      contrasenia.value
    );
    listaUsuarios.push(nuevoUsuario);
    guardarDatosEnLS();
    if (
      nuevoUsuario.nombre === userAdmin.nombre &&
      nuevoUsuario.contrasenia === userAdmin.contrasenia &&
      nuevoUsuario.email === userAdmin.email
    ) {
      crearLinkAdmin();
      modalFormLogin.hide();
    } else {
      let navLogin = document.querySelector("#navLogin");
      navLogin.className = "ocultar";
      modalFormLogin.hide();
    }
    Swal.fire(
      `Bienvenido ${nuevoUsuario.nombre}`,
      'Gracias por registrarte!',
      'success'
    )
  }
}

function crearLinkAdmin() {
  let navAdmin = document.querySelector("#navAdmin");
  let etiquetaAdmin = `<a href="pages/admin.html" class="nav-link">Administrador</a>`;
  navAdmin.innerHTML += etiquetaAdmin;
  let navLogin = document.querySelector("#navLogin");
  navLogin.className = "ocultar";
}

function limpiarModal() {
  formulario.reset();
  nombre.className = "form-control";
  email.className = "form-control";
  contrasenia.className = "form-control";
}

for (let i = 0; i < listaUsuarios.length; i++) {
  if (
    listaUsuarios[i].nombre === "Administrador" &&
    listaUsuarios[i].contrasenia === "Lujenntho1" &&
    listaUsuarios[i].email === "administrador@lujenntho.com"
  ) {
    let navAdmin = document.querySelector("#navAdmin");
    let etiquetaAdmin = `<a href="pages/admin.html" class="nav-link">Administrador</a>`;
    navAdmin.innerHTML = etiquetaAdmin;
    let navLogin = document.querySelector("#navLogin");
    navLogin.className = "ocultar";
  }
}

for (let i = 0; i < listaUsuarios.length; i++) {
  if (
    listaUsuarios[i].nombre != "Administrador" ||
    listaUsuarios[i].contrasenia != "Lujenntho1" ||
    listaUsuarios[i].email != "administrador@lujenntho.com"
  ) {
    let navLogin = document.querySelector("#navLogin");
    navLogin.className = "ocultar";
  }
}
