const tokenCookieName = "accesstoken"
const RoleCookieName = "role"
const signoutBtn = document.getElementById("signout-btn")
const apiUrl = "https://127.0.0.1:8000/api/"

signoutBtn.addEventListener("click", signout)

function getRole() {
  return getCookie(RoleCookieName)
}

function signout() {
  eraseCookie(tokenCookieName)
  eraseCookie(RoleCookieName)
  window.location.reload()
}

function setToken(token) {
  setCookie(tokenCookieName, token, 1)
}

function getToken() {
  return getCookie(tokenCookieName)
}

function setCookie(name, value, days) {
  var expires = ""
  if (days) {
    var date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = "; expires=" + date.toUTCString()
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/"
}

function getCookie(name) {
  var nameEQ = name + "="
  var ca = document.cookie.split(";")
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == " ") c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

function eraseCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
}

function isConnected() {
  const token = getToken()
  console.log("Vérification de la connexion - Token:", token) // Log pour vérifier si le token est récupéré
  if (token == null || token == undefined) {
    return false
  } else {
    return true
  }
}

/*
disconnected
connected ( admin, veto, ou employe)
- admin
- employe
- veterinaire
*/

function showAndHideElementsForRoles() {
  const userConnected = isConnected()
  const role = getRole()

  console.log("Role utilisateur récupéré:", role) // Log pour vérifier le rôle récupéré

  let allElementsToEdit = document.querySelectorAll("[data-show]")

  allElementsToEdit.forEach((element) => {
    switch (element.dataset.show) {
      case "disconnected":
        if (userConnected) {
          element.classList.add("d-none")
        }
        break
      case "connected":
        if (!userConnected) {
          element.classList.add("d-none")
        }
        break
      case "admin":
        if (!userConnected || role != "ROLE_ADMIN") {
          element.classList.add("d-none")
        }
        break
      case "employe":
        if (!userConnected || role != "ROLE_EMPLOYEE") {
          element.classList.add("d-none")
        }
        break
      case "veterinaire":
        if (!userConnected || role != "ROLE_VETERINAIRE") {
          element.classList.add("d-none")
        }
        break
    }
  })
}

function getInfosUser() {
  const token = getToken()
  console.log("Token utilisé pour récupérer les infos de l'utilisateur:", token) // Log pour vérifier le token

  const myHeaders = new Headers()
  myHeaders.append("X-AUTH-TOKEN", token)

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  }

  fetch(apiUrl + "account/me", requestOptions)
    .then((response) => {
      console.log("Réponse du serveur:", response) // Log de la réponse serveur
      if (response.ok) {
        return response.json()
      } else {
        console.log("Impossible de récupérer les informations de l'utilisateur")
      }
    })
    .then((result) => {
      console.log("Informations utilisateur récupérées:", result) // Log des infos de l'utilisateur
      return result
    })
    .catch((error) => {
      console.error(
        "Erreur lors de la récupération des informations de l'utilisateur",
        error
      )
    })
}
