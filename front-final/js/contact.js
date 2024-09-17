const inputName = document.getElementById("NameInput")
const inputMail = document.getElementById("EmailInput")
const inputMessage = document.getElementById("DemandeInput")
const btnValidation = document.getElementById("btn-validation-demande")
const formContact = document.getElementById("formulaireContact")

inputName.addEventListener("keyup", validateForm)
inputMail.addEventListener("keyup", validateForm)
inputMessage.addEventListener("keyup", validateForm)

btnValidation.addEventListener("click", EnvoyerDemande)

function validateForm() {
  const nameOk = validateRequired(inputName)
  const mailOk = validateMail(inputMail)
  const messageOk = validateRequired(inputMessage)

  btnValidation.disabled = !(nameOk && mailOk && messageOk)
}

function validateMail(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const mailUser = input.value
  if (emailRegex.test(mailUser)) {
    input.classList.add("is-valid")
    input.classList.remove("is-invalid")
    return true
  } else {
    input.classList.remove("is-valid")
    input.classList.add("is-invalid")
    return false
  }
}

function validateRequired(input) {
  if (input.value.trim() !== "") {
    input.classList.add("is-valid")
    input.classList.remove("is-invalid")
    return true
  } else {
    input.classList.remove("is-valid")
    input.classList.add("is-invalid")
    return false
  }
}

function EnvoyerDemande() {
  let dataForm = new FormData(formContact)

  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  const raw = JSON.stringify({
    name: dataForm.get("name"),
    email: dataForm.get("email"),
    demande: dataForm.get("demande"),
  })

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  }

  fetch(apiUrl + "contact", requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Erreur lors de l'envoi de la demande")
      }
    })
    .then((result) => {
      alert(
        "Bravo " + dataForm.get("name") + ", votre demande a bien été envoyée."
      )
      document.location.href = "/"
    })
    .catch((error) => console.error("error", error))
}
