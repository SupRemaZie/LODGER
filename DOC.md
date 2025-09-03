# Documentation

## Technologies utilisées

- **NextJS** (v14.x) : Framework React pour le développement full-stack
    - Front-end : Composants React, Routing, API Routes
    - Back-end : API Routes, Middleware
- **PostgreSQL** : Base de données relationnelle
- **Prisma** (v5.x) : ORM pour la gestion de la base de données
- **PlayWright** : Framework de tests end-to-end et tests de régression
- **i18n** : Internationalisation pour la gestion multilingue (FR/EN)
- **HeroUI** : Bibliothèque de composants UI modernes
- **Docker** : Pour le déploiement et la gestion des environnements
- **TypeDoc** : Générateur de documentation pour TypeScript

## Gestion des branches

Notre workflow Git s'organise autour de quatre types de branches :

- Branche de **Feature** : `feature/[numéro-ticket]-[description]`
    - Exemple : `feature/147-ajout-authentification`
    - Usage : Développement de nouvelles fonctionnalités

- Branche de **Fix** : `fix/[numéro-ticket]-[description]`
    - Exemple : `fix/123-correction-formulaire`
    - Usage : Corrections de bugs

- Branche de **Dev** : `dev`
    - Usage : Intégration des features et fixes
    - Environnement de pré-production

- Branche **Main** : `main`
    - Usage : Code en production
    - Version stable de l'application

## Convention de nommage des commits

Les commits doivent suivre cette structure :

## Convention de Nommage


- **Services** : `[nom]Service.ts`
  - Exemple : `userService.ts`, `authService.ts`
  - Responsabilité : Logique métier

- **Request/Response** : `[nom].Request.ts` et `[nom].Response.ts`
  - Exemple : `userRequest.ts`, `userResponse.ts`
  - Responsabilité : Types pour les données entrantes/sortantes des API

### Séparation des Responsabilités

1. **API Routes** (Controllers)
  - Validation des requêtes
  - Gestion des réponses HTTP
  - Appel des services appropriés

2. **Services**
  - Implémentation de la logique métier
  - Orchestration des opérations
