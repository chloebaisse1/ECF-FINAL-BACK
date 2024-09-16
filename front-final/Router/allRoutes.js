import Route from "./Route.js"

//Définir ici vos routes
export const allRoutes = [
  new Route("/", "Accueil", "/pages/home.html", []),
  new Route("/jungle", "Jungle", "/pages/habitats/jungle.html", []),
  new Route("/savane", "Savane", "/pages/habitats/savane.html", []),
  new Route("/marais", "Marais", "/pages/habitats/marais.html", []),
  new Route("/contact", "Contact", "/pages/contact.html", []),
  new Route("/avis", "Avis", "/pages/avis.html", []),
  new Route(
    "/signin",
    "Connexion",
    "/pages/auth/signin.html",
    ["disconnected"],
    "/js/auth/signin.js"
  ),
  new Route(
    "/signup",
    "Inscription",
    "/pages/auth/signup.html",
    ["disconnected"],
    "/js/auth/signup.js"
  ),
  new Route("/account", "Mon compte", "pages/auth/account.html", [
    "admin, employe, veterinaire",
  ]),
  new Route(
    "/editPassword",
    "Changement de mot de passe",
    ["admin, employe, veterinaire"],
    "pages/auth/editPassword.html"
  ),
]

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Zoo Arcadia"
