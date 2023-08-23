interface ValidarCrearCuentaErrors {
  nombre?: string;
  password?: string;
}

export default function validarIniciarSesion(valores: {
  nombre: string;
  password: string;
}): ValidarCrearCuentaErrors {
  let errores: ValidarCrearCuentaErrors = {};

  // Validar el nombre del usuario
  if (!valores.nombre) {
    errores.nombre = "Introduce tu nombre";
  }

  // validar el password
  if (!valores.password) {
    errores.password = "El password es obligatorio";
  } else if (valores.password.length < 6) {
    errores.password = "Se requiere un mínimo de 6 caracteres";
  }

  return errores;
}
