const inputNom = document.getElementById("NomInput")
const inputPrenom = document.getElementById("PrenomInput")
const inputAvis = document.getElementById("AvisInput")
const formAvis = document.getElementById("formulaireAvis")
const btnValidation = document.getElementById("btnValidation")

inputNom.addEventListener("keyup", validateForm)
inputPrenom.addEventListener("keyup", validateForm)
inputAvis.addEventListener("keyup", validateForm)

btnValidation.addEventListener("click", EnvoyerAvis)

function validateForm() {
  const nomOk = validateRequired(inputNom)
  const prenomOk = validateRequired(inputPrenom)
  const avisOk = validateRequired(inputAvis)

  if (nomOk && prenomOk && avisOk) {
    btnValidation.disabled = false
  } else {
    btnValidation.disabled = true
  }
}

function validateRequired(input) {
  if (input.value != "") {
    input.classList.add("is-valid")
    input.classList.remove("is-invalid")
    return true
  } else {
    input.classList.remove("is-valid")
    input.classList.add("is-invalid")
    return false
  }
}

function EnvoyerAvis() {
  let dataForm = new FormData(formAvis)

  const myHeaders = new Headers()
  myHeaders.append("X-AUTH-TOKEN")
  myHeaders.append("Content-Type", "application/json")

  const raw = JSON.stringify({
    nom: dataForm.get("nom"),
    prenom: dataForm.get("prenom"),
    message: dataForm.get("message"),
  })

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  }

  fetch(apiUrl + "avis", requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        alert("Erreur lors de le l'envoi de l'avis")
      }
    })

    .then((result) => {
      alert(
        "Bravo " +
          dataForm.get("prenom") +
          ", votre avis a été envoyé avec succès"
      )
      document.location.href = "/"
    })
    .catch((error) => console.log("error", error))
}
