// Sélectionner tous les éléments du formulaire

const nomInput = document.getElementById("NomInput")
const raceInput = document.getElementById("RaceInput")
const habitatInput = document.getElementById("HabitatInput")
const nourritureInput = document.getElementById("NourritureInput")
const quantiteeInput = document.getElementById("QuantiteeInput")
const dateInput = document.getElementById("DateInput")
const commentaireInput = document.getElementById("CommentaireInput")
const btnValidation = document.getElementById("btn-validation-compte-rendu")
const formCompteR = document.getElementById("formulaireCompte-rendu")

nomInput.addEventListener("keyup", validateForm)
raceInput.addEventListener("keyup", validateForm)
habitatInput.addEventListener("keyup", validateForm)
nourritureInput.addEventListener("keyup", validateForm)
quantiteeInput.addEventListener("keyup", validateForm)
dateInput.addEventListener("keyup", validateForm)
commentaireInput.addEventListener("keyup", validateForm)

// Ajouter un écouteur d'événement pour le bouton d'envoi
btnValidation.addEventListener("click", CreerCompteRendu)

// Fonction permettant de valider tout le formulaire
function validateForm() {
  const nomOk = validateRequired(nomInput)
  const raceOk = validateRequired(raceInput)
  const habitatOk = validateRequired(habitatInput)
  const nourritureOk = validateRequired(nourritureInput)
  const quantiteeOk = validateRequired(quantiteeInput)
  const dateOk = validateRequired(dateInput)
  const commentaireOk = validateRequired(commentaireInput)

  if (
    nomOk &&
    raceOk &&
    habitatOk &&
    nourritureOk &&
    quantiteeOk &&
    dateOk &&
    commentaireOk
  ) {
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

function CreerCompteRendu() {
  // Recuperer les valeurs des inputs
  let dataForm = new FormData(formCompteR)

  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  const raw = JSON.stringify({
    nom: dataForm.get("nom"),
    race: dataForm.get("race"),
    habitat: dataForm.get("habitat"),
    nourriture: dataForm.get("nourriture"),
    quantitee: dataForm.get("quantitee"),
    date: dataForm.get("date"),
    commentaire: dataForm.get("commentaire"),
  })

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  }

  fetch(apiUrl + "compteR", requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        alert("Erreur lors de la création du compte rendu")
      }
    })

    .then((result) => {
      alert("Compte rendu créé avec succès")
      formCompteR.reset()
    })
    .catch((error) => console.log("error", error))
}
