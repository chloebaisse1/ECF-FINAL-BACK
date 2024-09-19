// Sélectionner le formulaire et le bouton de validation
const form = document.getElementById("formulaireCompte-rendu")

// Fonction de validation
function validateForm() {
  let isValid = true

  // Récupérer tous les champs du formulaire
  const inputs = form.querySelectorAll("input")

  // Réinitialiser les erreurs de validation
  inputs.forEach((input) => {
    input.classList.remove("is-invalid")
    const feedback = input.nextElementSibling
    if (feedback && feedback.classList.contains("invalid-feedback")) {
      feedback.style.display = "none"
    }
  })

  // Valider chaque champ
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      input.classList.add("is-invalid")
      const feedback = input.nextElementSibling
      if (feedback && feedback.classList.contains("invalid-feedback")) {
        feedback.style.display = "block"
      }
      isValid = false
    }
  })

  return isValid
}

// Fonction pour soumettre le formulaire
async function submitForm(event) {
  event.preventDefault() // Empêcher le comportement par défaut du formulaire

  if (!validateForm()) {
    return
  }

  // Récupérer les données du formulaire
  const formData = {
    nom: document.getElementById("NomInput").value,
    race: document.getElementById("RaceInput").value,
    habitat: document.getElementById("HabitatInput").value,
    nourriture: document.getElementById("NourritureInput").value,
    quantitee: document.getElementById("QuantiteeInput").value,
    date: document.getElementById("DateInput").value,
    commentaire: document.getElementById("CommentaireInput").value,
  }

  // Récupérer le token stocké (assurez-vous que le token existe)
  const token = localStorage.getItem("X-AUTH-TOKEN")
  if (!token) {
    alert(
      "Token manquant. Veuillez vous connecter pour accéder à ce formulaire."
    )
    return
  }

  try {
    // Appel à l'API avec la méthode POST
    const response = await fetch(apiUrl + "compteR", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `ApiToken ${token}`, // Utilisez "Authorization" avec le préfixe "ApiToken"
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      // Traiter la réponse de l'API
      alert("Formulaire soumis avec succès !")
      form.reset() // Réinitialiser le formulaire après la soumission
    } else {
      alert("Erreur lors de la soumission du formulaire.")
    }
  } catch (error) {
    console.error("Erreur réseau:", error)
    alert("Erreur de connexion à l'API.")
  }
}

// Ajouter l'écouteur d'événement pour la soumission du formulaire
form.addEventListener("submit", submitForm)
