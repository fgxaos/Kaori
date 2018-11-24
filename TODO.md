# TODO list
## Back
* Adapter le controller _extractMAL_ pour qu'il envoie les données au front, afin d'afficher les résultats de la recherche (s'inspirer de ce qui a été fait pour _watching_)
* Gérer les différents comptes d'utilisateur, afin que la partie "identification" soit fonctionnelle


## Front
* Mettre en place les différentes sections en fonction du menu choisi
* Créer les composants pour chaque section (_watching, seen, search_)
* Corriger _watching_ pour pouvoir afficher les _animeDetails_
* Ajouter une navbar avec les infos sur le compte et un accès aux différents menus. Navbar présente sur toutes les pages

* Le "anime_id" de AnimeTile doit être inutile : vérifier (sans le fichier css) et supprimer si inutile
* Ajouter système d'identification et contenu réservé aux inscrits


## Design
* Remplacer le bouton _Search_ des barres de recherche par une image de loupe
* Remplacer le logo React
* Vérifier que le site s'affiche bien sur mobile
* Faire un CSS convenable pour que le site soit pas trop moche
* Proprifier les "Jumbotron" de l'AnimeTile : pour l'instant, la grille pour "Search", "Watching" (et bientôt "Seen") est moche
* Modifier le CSS de Modal pour que le 'background' ne soit pas noir

# Concept 

## Search

* Quand on appuie sur le bouton "search", on obtient bien les résultats. Toutefois, j'aimerais que "appuyer sur Entrée" et "cliquer sur 'search'" soient deux actions équivalentes, ce qui n'est pas le cas (appuyer sur entrer recharge la page, mais ne donne pas les résultats)
* Il faut un autre modèle d'AnimeTile, et ce pour deux raisons. La première est qu'il faut certaines informations supplémentaires, notamment le synopsis et le ranking (deux éléments très importants). La deuxième est qu'il faut rajouter le bouton "Add" pour rajouter l'anime dans la base de données (<=> ajouter l'anime à 'Watching'). Voir si on peut juste créer AnimeTileSearch et lui faire hériter la classe AnimeTile, ce qui permettrait de gagner du temps (NOTE : apparemment, l'hérédité n'est pas vraiment optimale pour React)
Au lieu d'en créer un autre, on peut simplement faire passer une variable "type" et modifier ensuite les animeDetails en fonction du "type" passé en props => implémenter cette dernière solution
* (Optionnel) La recherche d'informations sur les animes prend trop de temps. Il faudrait accélérer tout ça. Une idée : parser le bloc de code html correspondant à toutes les infos sur les animes, et à partir de ce bloc, récupérer les infos. Ainsi, au lieu de parser plusieurs fois une même page et le gros bloc de code associé, on peut effectuer nos recherches au sein d'un bloc plus réduit, sans avoir besoin de parser à nouveau (pas de nouvelle recherche internet, seulement calcul du PC)

## Watching

* Ajouter un "Progress" (cf. react bootstrap), pour afficher l'avancée du visionnage (nombre d'épisodes vus / nombre total)
* Ajouter une "checkbox" pour marquer les épisodes déjà vus (remplacer le 'ListGroupItem' par un 'CustomComponent'). Il faudra donc sauvegarder dans la bdd les épisodes déjà vus/cochés.

## Seen


## A faire pour le DTY
* Faire un système de connexion avec plusieurs utilisateurs
* Si possible, s'occuper des épisodes à cocher/mémoriser, à l'aide de la fonction "changeDetailsAnime" dans 'animesWatching.controller.js'
* Supprimer le fichier 'config' du gitlab