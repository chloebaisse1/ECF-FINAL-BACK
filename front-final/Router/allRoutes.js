import Route from "./Route.js"

//Définir ici vos routes
export const allRoutes = [
  new Route("/", "Accueil", "/pages/home.html"),
  new Route("/jungle", "Jungle", "/pages/jungle.html"),
  new Route("/savane", "Savane", "/pages/savane.html"),
  new Route("/marais", "Marais", "/pages/marais.html"),
  new Route("/contact", "Contact", "/pages/contact.html"),
  new Route("/avis", "Avis", "/pages/avis.html"),
]

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Zoo Arcadia"
