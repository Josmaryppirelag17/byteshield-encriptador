// Función para validar si un carácter es válido (solo letras minúsculas y algunos caracteres especiales)
function isValidChar(char) {
  let regex = /^[a-z ¡¿?!]+$/;

  return regex.test(char);
}

// Función para encriptar el texto ingresado en el textarea
function textEncrypt() {
  let textareaEncrypt = document.querySelector("#encrypted");
  let textEncrypt = textareaEncrypt.value;
  let encryptedText = "";

  // Mapa de reemplazo para la encriptación
  let requeriment = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat",
  };

  // Recorre cada carácter del texto ingresado
  for (let i = 0; i < textEncrypt.length; i++) {
    let char = textEncrypt[i];
    if (isValidChar(char)) {
      // Verifica si el carácter es válido
      if (requeriment.hasOwnProperty(char)) {
        // Si el carácter está en el mapa de reemplazo, lo reemplaza
        encryptedText += requeriment[char];
      } else {
        // Si no está en el mapa, lo deja igual
        encryptedText += char;
      }
    } else {
      swal("Oops!", "Introdujo un cáracter inválido", "error");
      return;
    }
  }

  // Coloca el texto encriptado en el textarea de desencriptación
  let textareaDecrypt = document.querySelector("#decrypted");
  textareaDecrypt.value = encryptedText;

  // Revelar el botón de copiar al encriptar
  document.getElementById("copy").style.display = "block";
}


// Función para desencriptar el texto ingresado en el textarea
function textDecrypted() {
  let textareaDecrypt = document.querySelector("#decrypted");
  let textDecrypt = textareaDecrypt.value;
  let decryptedText = textDecrypt;

  // Mapa de reemplazo inverso para la desencriptación
  let requeriment = {
    ai: "a",
    enter: "e",
    imes: "i",
    ober: "o",
    ufat: "u",
  };

  // Recorre cada carácter del texto desencriptado
  for (let i = 0; i < decryptedText.length; i++) {
    let char = decryptedText[i];
    // Verifica si el carácter es válido
    if (isValidChar(char)) {
      // Busca en el mapa de reemplazo inverso y deshace la encriptación
      for (let key in requeriment) {
        if (decryptedText.slice(i, i + key.length) === key) {
          decryptedText =
            decryptedText.slice(0, i) +
            requeriment[key] +
            decryptedText.slice(i + key.length);
        }
      }
    } else {
      swal("Oops!", "Introdujo un cáracter inválido", "error");
      return;
    }
  }

  // Coloca el texto desencriptado en el textarea de encriptación
  let textareaEncrypt = document.querySelector("#encrypted");
  textareaEncrypt.value = decryptedText;

  // Revelar el botón de copiar al encriptar
  document.getElementById("copy").style.display = "block";
}

// Función para copiar el texto desencriptado al portapapeles
function copyText() {
  var text = document.getElementById("decrypted").value;

  navigator.clipboard
    .writeText(text)
    .then(() => {
      swal("Copiado", "Llevas tu secreto contigo", "success");
    })
    .catch((err) => {
      console.error("Error al copiar el texto: ", err);
    });
}
