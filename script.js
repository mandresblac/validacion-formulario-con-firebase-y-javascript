const firebaseConfig = {
  apiKey: "AIzaSyDsH9iNYPcwM_9AddMIzVNhovFrc1EL3ak",
  authDomain: "datos-formulario-b5250.firebaseapp.com",
  projectId: "datos-formulario-b5250",
  storageBucket: "datos-formulario-b5250.appspot.com",
  messagingSenderId: "257522131252",
  appId: "1:257522131252:web:43275a13c4085ddba50561",
  measurementId: "G-LDCCGJNQ57",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

/* --------- AQUI COMIENZA EL CODIGO DE NUESTRA APLICACIÓN --------- */

document.querySelector("#formulario").addEventListener("submit", (event) => {
  event.preventDefault(); // Para prevenir accion por defecto de recarga del formulario

  // Validar campo nombre
  const entradaNombre = document.querySelector("#name");
  const errorNombre = document.querySelector("#nameError");

  // trim() elmina espacios al principio y al final de un string
  if (entradaNombre.value.trim() === "") {
    errorNombre.textContent = "Por favor, ingresa tu nombre";
    errorNombre.classList.add("error-message");
  } else {
    errorNombre.textContent = "";
    errorNombre.classList.remove("error-message");
  }

  // Validar correo electronico
  const emailEntrada = document.querySelector("#email");
  const emailError = document.querySelector("#emailError");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patron de valición basico para el email

  if (!emailPattern.test(emailEntrada.value)) {
    emailError.textContent = "Por favor, ingresa un correo valido";
    emailError.classList.add("error-message");
  } else {
    emailError.textContent = "";
    emailError.classList.remove("error-message");
  }

  // Validar contraseña
  const contrasenaEntrada = document.querySelector("#password");
  const contrasenaError = document.querySelector("#passwordError");
  const contrasenaPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/; // Patron de valición para la contraseña que permite minimo 8 caracteres y maximo 15, números, mayúsculas y minúsculas y caracteres especiales

  if (!contrasenaPattern.test(contrasenaEntrada.value)) {
    contrasenaError.textContent =
      "La contraseña debe tener minimo 8 caracteres, números, mayúsculas y minúsculas y caracteres especiales";
    contrasenaError.classList.add("error-message");
  } else {
    contrasenaError.textContent = "";
    contrasenaError.classList.remove("error-message");
  }

  // Si todos los campos de son validos enviamos formulario
  if (
    !errorNombre.textContent &&
    !emailError.textContent &&
    !contrasenaError.textContent
  ) {
    // BACKEND que reciba la información en firebase
    db.collection("users")
      .add({
        nombre: entradaNombre.value,
        email: emailEntrada.value,
        password: contrasenaEntrada.value,
      })
      .then((docRef) => {
        alert("El formulario se ha enviado con éxito", docRef.id);
        document.querySelector("#formulario").reset();
      })
      .catch((error) => {
        alert(error);
      });
  }
});
