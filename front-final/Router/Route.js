export default class Route {
  constructor(url, title, pathHtml, authorize, pathJS = "") {
    this.url = url
    this.title = title
    this.pathHtml = pathHtml
    this.pathJS = pathJS
    this.authorize = authorize
  }
}

/*

[] -> Tout le monde peux y acceder
["disconnected"] -> Réserver aux utilisateurs déconnectés
["admin"] -> reserver aux utilisateurs admin
["employe"] -> reserver aux utilisateurs employe
["veterinaire"] ->  reserver aux utilisateurs veterinaire
["admin", "employe"] -> reserver aux utilisateurs admin et employe
["admin", "employe", "veterinaire"] -> reserver aux utilisateurs admin, employe et veterinaire

*/
