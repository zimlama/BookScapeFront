interface ValidarCrearCuentaErrors {
  nombre?: string;
  email?: string;
  password?: string;
  passwordRepetida?: string;
}

export default function validarCrearCuenta(valores: {
  nombre: string;
  email: string;
  password: string;
  passwordRepetida?: string;
}): ValidarCrearCuentaErrors {
  let errores: ValidarCrearCuentaErrors = {};

  // Validar el nombre del usuario
  if (!valores.nombre) {
    errores.nombre = "Introduce tu nombre";
  }

  // validar el email
  if (!valores.email) {
    errores.email = "Escriba su correo electrónico";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
    errores.email = "Email no válido";
  }

  // validar el password
  if (!valores.password) {
    errores.password = "El password es obligatorio";
  } else if (valores.password.length < 6) {
    errores.password = "Se requiere un mínimo de 6 caracteres";
  }

  // Validar la contraseña repetida
  if (valores.password !== valores.passwordRepetida) {
    errores.passwordRepetida = "Las contraseñas no coinciden";
  }

  return errores;
}
