const mailInput = document.getElementById("EmailInput")
const passwordInput = document.getElementById("PasswordInput")
const btnSingin = document.getElementById("btnSignin")
const signinForm = document.getElementById("signinForm")

btnSingin.addEventListener("click", checkCredentials)

function checkCredentials() {
  let dataForm = new FormData(signinForm)

  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  const raw = JSON.stringify({
    username: dataForm.get("email"),
    password: dataForm.get("mdp"),
  })

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  }

  fetch(apiUrl + "login", requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        mailInput.classList.add("is-invalid")
        passwordInput.classList.add("is-invalid")
      }
    })
    .then((result) => {
      if (result) {
        const token = result.apiToken
        setToken(token)
        // placer ce token en cookie
        setCookie(RoleCookieName, result.roles[0], 1)

        // Redirection en fonction du role (admin, employe, veterinaire)
        const email = result.user // Assurez-vous que l'API renvoie l'email dans 'result.user'
        if (email === "marc@mail.com") {
          window.location.replace("/dashboard_veterinaire.html")
        } else if (email === "caroline@mail.com") {
          window.location.replace("/dashboard_employe.html")
        } else if (email === "jose@mail.com") {
          window.location.replace("/dashboard_admin.html")
        } else {
          window.location.replace("/dashboard_default.html") // Page par défaut si l'email ne correspond à aucun cas
        }
      }
    })
    .catch((error) => console.log("error", error))
}
