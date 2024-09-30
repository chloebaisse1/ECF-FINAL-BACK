// Sélectionne tous les boutons de like
const likeButtons = document.querySelectorAll(".like-button")

// Fonction pour envoyer un like à l'API
async function sendLike(animalId, button) {
  const url = `https://127.0.0.1:8000/like/${animalId}`

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      const data = await response.json() // Si tu reçois des données en réponse (comme le nombre de likes)
      console.log("Like enregistré avec succès !")

      // Met à jour l'UI
      const likeCountElement = document.getElementById(`like-count-${animalId}`)
      if (likeCountElement && data.likes) {
        likeCountElement.textContent = data.likes // Met à jour le nombre de likes affiché
      }

      // Désactive le bouton pour éviter les likes multiples
      button.disabled = true
      button.classList.add("liked") // Ajoute une classe pour changer le style (CSS)
    } else {
      console.error("Erreur lors de l'enregistrement du like")
      alert(
        "Une erreur est survenue lors de l'enregistrement du like. Veuillez réessayer."
      )
    }
  } catch (error) {
    console.error("Erreur réseau : ", error)
    alert("Erreur réseau : Veuillez vérifier votre connexion Internet.")
  }
}

// Ajoute l'événement de clic sur chaque bouton de like
likeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const animalId = this.closest(".savane-box").dataset.animalId // Récupère l'ID de l'animal à partir de l'attribut de l'élément parent
    sendLike(animalId, this) // Envoie le like à l'API
  })
})
