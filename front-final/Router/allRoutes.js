import Route from "./Route.js"

//Définir ici vos routes
export const allRoutes = [
  new Route("/", "Accueil", "/pages/home.html"),
  new Route("/jungle", "Jungle", "/pages/habitats/jungle.html"),
  new Route("/savane", "Savane", "/pages/habitats/savane.html"),
  new Route("/marais", "Marais", "/pages/habitats/marais.html"),
  new Route("/contact", "Contact", "/pages/contact.html"),
  new Route("/avis", "Avis", "/pages/avis.html"),
  new Route("/signin", "Connexion", "/pages/signin.html"),
]

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Zoo Arcadia"
