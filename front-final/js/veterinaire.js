const inputNom = document.getElementById("NomInput")
const inputRace = document.getElementById("RaceInput")
const inputHabitat = document.getElementById("HabitatInput")
const inputNourriture = document.getElementById("NourritureInput")
const inputQuantitee = document.getElementById("QuantiteeInput")
const inputDate = document.getElementById("DateInput")
const inputCommentaire = document.getElementById("CommentaireInput")
const formCompteR = document.getElementById("formulaireCompte-rendu")
const btnValidation = document.getElementById("btn-validation-compte-rendu") // ID corrigé

inputNom.addEventListener("keyup", validateForm)
inputRace.addEventListener("keyup", validateForm)
inputHabitat.addEventListener("keyup", validateForm)
inputNourriture.addEventListener("keyup", validateForm)
inputQuantitee.addEventListener("keyup", validateForm)
inputDate.addEventListener("keyup", validateForm)
inputCommentaire.addEventListener("keyup", validateForm)

formCompteR.addEventListener("submit", EnvoyerCompteR)

function validateForm() {
  const nomOk = validateRequired(inputNom)
  const raceOk = validateRequired(inputRace)
  const habitatOk = validateRequired(inputHabitat)
  const nourritureOk = validateRequired(inputNourriture)
  const quantiteeOk = validateRequired(inputQuantitee)
  const dateOk = validateRequired(inputDate)
  const commentaireOk = validateRequired(inputCommentaire)

  btnValidation.disabled = !(
    nomOk &&
    raceOk &&
    habitatOk &&
    nourritureOk &&
    quantiteeOk &&
    dateOk &&
    commentaireOk
  )
}

function validateRequired(input) {
  if (!input.value.trim()) {
    input.classList.add("is-invalid")
    return false
  } else {
    input.classList.remove("is-invalid")
    return true
  }
}

function EnvoyerCompteR(event) {
  event.preventDefault()

  let dataForm = new FormData(formCompteR)

  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("X-AUTH-TOKEN", getToken()) // Utilise le token récupéré

  const raw = JSON.stringify({
    nom: dataForm.get("nom"), // Utiliser le nom du champ
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
    credentials: "include", // Ajout des credentials
    redirect: "follow",
  }

  fetch(apiUrl + "compteR", requestOptions)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(
            err.message || "Erreur dans la soumission du formulaire"
          )
        })
      }
      return response.json() // Utilisez .json() pour traiter la réponse
    })
    .then((data) => {
      console.log("Réponse du serveur:", data)
      alert("Compte-rendu créé avec succès!")
      formCompteR.reset() // Réinitialise le formulaire
    })
    .catch((error) => {
      console.error("Erreur:", error)
      alert(error.message)
    })
}
