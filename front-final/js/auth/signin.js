const mailInput = document.getElementById("EmailInput")
const passwordInput = document.getElementById("PasswordInput")
const btnSignin = document.getElementById("BtnSignin")

btnSignin.addEventListener("click", checkCredentials)
function checkCredentials() {
  // Ici il faudra appeler l'API pour vérifier les identifiants

  if (mailInput.value == "test@mail.com" && passwordInput.value == "123") {
    // il faudra recuperer le vrai token
    const token = "loeoeikgu56607kffhoylyy7777OTL"
    setToken(token)
    // placer le token en cookie

    setCookie("RoleCookieName", "admin", 1)
    window.location.replace("/")
  } else {
    mailInput.classList.add("is-invalid")
    passwordInput.classList.add("is-invalid")
  }
}
