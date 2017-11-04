# Processus de développment

## Github flow

Nous allons manipuler 3 types de branches : `master`, `next`, `local`

- La branche `master` est la branche de production sur laquelle le code doit être dans un état fonctionnel
- La branche `next` comporte l'intégralité des nouvelles features qui seront dans la prochaine release. Tout comme master elle doit être dans un état stable
- Il n'y a pas une mais des branches `local` (convention de nommage à définir), ce sont nos branches de développment

### Développer une fontionnalité (feature)

Les variables seront entre crochets

1) Sur la branche `next` faire un `git pull origin/next`
2) `git checkout -b [ma-branche]` pour créer une nouvelle branche
3) Développment
4) `git push origin [ma-branche]` pour envoyer ma branche sur Github
5) Créer une pull request sur Github
6) Soumettre son code à revue des autres développeurs
- Tant qu'il y a des retours répéter les étapes 3, 4 et 6
7) Merger dans la branche `next`

### Corriger un bug (bugfix, hotfix) ou ajouter de la documentation au projet

1) Sur la branche `master` faire un `git pull origin/master`
2) `git checkout -b [ma-branche]` pour créer une nouvelle branche
3) Développment
4) `git push origin [ma-branche]` pour envoyer ma branche sur Github
5) Créer une pull request sur Github
6) Soumettre son code à revue des autres développeurs
- Tant qu'il y a des retours répéter les étapes 3, 4 et 6
7) Merger dans la branche `master`
