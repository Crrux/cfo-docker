# Système d'Authentification Admin - CrossFit Obernai

## 📋 Vue d'ensemble

Ce système d'authentification permet à un administrateur de se connecter de manière sécurisée au tableau de bord admin du site CrossFit Obernai.

### Fonctionnalités

- ✅ Authentification sécurisée avec JWT
- ✅ Base de données SQLite pour stocker les utilisateurs
- ✅ Session persistante (localStorage) ou temporaire (sessionStorage)
- ✅ Refresh token automatique
- ✅ Changement de mot de passe
- ✅ Routes protégées
- ✅ Interface admin responsive

## 🚀 Installation et Configuration

### Backend

1. **Installer les dépendances** (déjà fait si vous avez suivi les étapes)
   ```bash
   cd back
   npm install
   ```

2. **Configurer les variables d'environnement**
   
   Créez un fichier `.env.dev` dans le dossier `back/` :
   ```env
   NODE_ENV=development
   JWT_SECRET=votre-secret-jwt-tres-securise
   JWT_EXPIRES_IN=15m
   REFRESH_TOKEN_SECRET=votre-secret-refresh-token-tres-securise
   REFRESH_TOKEN_EXPIRES_IN=7d
   ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
   ```

   **⚠️ IMPORTANT** : En production, utilisez des secrets forts et différents !

3. **Démarrer le backend**
   ```bash
   npm run start:dev
   ```

   Au premier démarrage, un utilisateur admin par défaut sera créé :
   - **Username**: `admin`
   - **Password**: `admin123`
   - **Email**: `admin@crossfitobernai.fr`

   **⚠️ CHANGEZ CE MOT DE PASSE IMMÉDIATEMENT après la première connexion !**

### Frontend

1. **Installer les dépendances**
   ```bash
   cd front
   npm install
   ```

2. **Configurer l'URL de l'API**
   
   Créez un fichier `.env.dev` dans le dossier `front/` :
   ```env
   VITE_API_URL=http://localhost:3000
   ```

3. **Démarrer le frontend**
   ```bash
   npm run dev
   ```

## 📱 Utilisation

### Première connexion

1. Accédez à `http://localhost:5173/admin/login`
2. Connectez-vous avec les identifiants par défaut :
   - Username: `admin`
   - Password: `admin123`
3. **IMPORTANT** : Allez immédiatement dans le dashboard et changez votre mot de passe

### Changer le mot de passe

1. Dans le dashboard (`/admin/dashboard`), cliquez sur "Changer le mot de passe"
2. Entrez votre mot de passe actuel
3. Entrez le nouveau mot de passe (minimum 8 caractères)
4. Confirmez le nouveau mot de passe

### Option "Se souvenir de moi"

- **Coché** : Utilise `localStorage` - la session persiste même après fermeture du navigateur
- **Non coché** : Utilise `sessionStorage` - la session expire à la fermeture du navigateur

## 🔐 Sécurité

### Tokens

- **Access Token** : Expire après 15 minutes
- **Refresh Token** : Expire après 7 jours
- Le refresh est automatique toutes les 12 minutes si vous êtes connecté

### Base de données

La base SQLite (`database.sqlite`) est créée automatiquement dans le dossier `back/`.
Elle est déjà ajoutée au `.gitignore` pour ne pas être versionnée.

### En production

1. **Changez absolument les secrets JWT** dans `.env.production`
2. **Désactivez `synchronize: true`** dans TypeORM (app.module.ts)
3. **Configurez HTTPS** pour protéger les tokens en transit
4. **Configurez les CORS** correctement avec votre domaine de production

## 📁 Structure des fichiers

### Backend
```
back/src/auth/
├── auth.module.ts          # Module principal
├── auth.service.ts         # Logique métier
├── auth.controller.ts      # Routes API
├── local.strategy.ts       # Stratégie Passport locale
├── jwt.strategy.ts         # Stratégie Passport JWT
├── local-auth.guard.ts     # Guard pour login
├── jwt-auth.guard.ts       # Guard pour routes protégées
├── seed.ts                 # Création admin initial
├── dto/
│   ├── login.dto.ts
│   └── change-password.dto.ts
└── entities/
    └── user.entity.ts      # Modèle User
```

### Frontend
```
front/src/
├── context/
│   └── AuthContext.jsx     # Context global d'auth
├── services/
│   └── authService.js      # API calls et intercepteurs
├── components/
│   └── ProtectedRoute/
│       └── ProtectedRoute.jsx
└── pages/admin/
    ├── login/
    │   ├── login.jsx
    │   └── _login.sass
    └── dashboard/
        ├── dashboard.jsx
        └── _dashboard.sass
```

## 🔗 Endpoints API

- `POST /auth/login` - Connexion
- `POST /auth/refresh` - Rafraîchir le token
- `POST /auth/logout` - Déconnexion
- `GET /auth/profile` - Obtenir le profil (protégé)
- `POST /auth/change-password` - Changer le mot de passe (protégé)

## 🐛 Dépannage

### "Identifiants incorrects"
- Vérifiez que le backend est bien démarré
- Vérifiez les identifiants (admin/admin123 par défaut)

### "Token invalide" ou déconnexion automatique
- Le token a peut-être expiré
- Reconnectez-vous

### Erreur CORS
- Vérifiez que `ALLOWED_ORIGINS` inclut bien l'URL du frontend
- Vérifiez que `withCredentials: true` est dans authService.js

### Base de données non créée
- Vérifiez que le backend démarre sans erreur
- Le fichier `database.sqlite` doit apparaître dans `back/`

## 📝 TODO / Améliorations futures

- [ ] Ajouter une gestion multi-utilisateurs
- [ ] Implémenter des rôles (admin, super-admin)
- [ ] Ajouter un rate limiting sur le login
- [ ] Ajouter des logs d'audit
- [ ] Implémenter la récupération de mot de passe par email
- [ ] Ajouter une page de gestion des utilisateurs

## 👨‍💻 Développement

Créé pour CrossFit Obernai - 2025

