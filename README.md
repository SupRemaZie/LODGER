# 🚀 Projet Next.js LODGER

## 📌 Description
Ce projet est un application web de recherche de logement à long terme avec en plus une centralisation de toutes les démarches. 

## 📂 Structure du Projet
```
📁 project-root/
├── 📁 app/ 
    ├── 📁 [Locale]/ ( gestionnaire de langue pour les traductions)
        ├── 📁 deposit/ ( pages de depot de bien)
├── 📁 ui/
     ├── 📁 components/ ( dossier des composents ui)
      ├── font.ts ( export statique des fonts utilisée dans le projet )

├── 📁 context/ (centralisation et gestion de l'etat d'APK React Context API)
    ├── BreadcrumbContext.tsx
    ├── providers.tsx (Utilisation de bibliotheque de composants HeroUI)
├── 📁 i18n/ (nextjs gestion de l'internationalisation des labels )
├── 📁 messages/ (contenair des traductions en/fr en json)

## 🚀 Installation et Lancement
### 1️⃣ Cloner le projet
```sh
git clone https://github.com/ton-utilisateur/ton-repo.git
cd ton-repo
```

### 2️⃣ Installer les dépendances
```sh
yarn install  # ou npm install
```

### 3️⃣ Lancer le serveur de développement
```sh
yarn dev  # ou npm run dev
```
Accédez ensuite à `http://localhost:3000/deposit`.

Enjoy :

```