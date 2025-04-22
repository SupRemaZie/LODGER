# Documentation

## Technologies utilisés

- On utilise comme technologie principale **NextJS** pour le back et le front.
- Pour la base, on utilise PostGreSQL et on la connecte à **NextJS** avec **Prisma**.
- Pour les tests de régression **PlayWright**.
- Pour la traduction anglais / français, on utilise la librairie **i18n**.
- Pour les composants, on utilise la librairie **HeroUI**.
- Pour le déploiement, on utilise **Vercel**.
- Pour la documentation, on utilise **Doxygen**.

## Nom des branches

Dans notre projet, nous avons plusieurs branches ayant différents usages :

- Branche de **Feature** : branche unique créée pour une nouvelle fonctionnalité à développer.
- Branche de **Fix** : branche unique créée pour corriger un nouveau bug.
- Branche de **Dev** : branche regoupant toutes les branches features et bugs développées et pas encore livrés.
- Branche **Main** : branche principale permettant de livrer les versions de l'application.

## Nom des commits

Les commits doivent respecter les normes suivantes : 

- La description doit comporter un changelog avec ce que le commit ajoute ou corrige.

## Commentaires en code

Réaliser les commentaires de génération de documentation automatisée.

Ex : 
```node
/**
 * \file main.c
 * \brief Programme de tests.
 * \author Franck.H
 * \version 0.1
 * \date 11 septembre 2007
 *
 * Programme de test pour l'objet de gestion des chaines de *caractères Str_t.
 *
 */
```

## Nom des fonctions

Le nom des fonction doit être explicite et en **camelCase**.