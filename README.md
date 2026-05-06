# Backend - Gestion des Produits

API REST Express.js pour la gestion des catégories et produits avec Prisma et PostgreSQL.

## 🚀 Démarrage Rapide

### Installation
```bash
npm install
```

### Configuration Base de Données
```bash
# Créer le fichier .env
cp .env.example .env

# Éditer .env avec vos identifiants PostgreSQL
# DATABASE_URL="postgresql://user:password@localhost:5432/database_name"

# Exécuter les migrations
npx prisma migrate dev
```

### Démarrage
```bash
# Mode développement (avec auto-reload)
npm run dev

# Mode production
npm start
```

Le serveur s'exécutera sur `http://localhost:3000`

## 📚 Structure du Code

### Controllers
- **category.controller.js**: Gestion des catégories (CRUD)
- **product.controller.js**: Gestion des produits (CRUD + filtrage)

### Routes
- **category.route.js**: Routes `/categories`
- **product.route.js**: Routes `/products`

### Prisma
- **schema.prisma**: Définition du schéma de base de données
- **lib/prisma.js**: Instance client Prisma

## 🔌 API Endpoints

### Catégories

**GET /categories**
- Récupère toutes les catégories
- Réponse: Array de catégories

**POST /categories**
- Crée une nouvelle catégorie
- Body: `{ "name": "string" }`
- Validation: name est requis et unique

**PUT /categories/:id**
- Met à jour une catégorie
- Body: `{ "name": "string" }`
- Validation: name doit être unique (sauf le même)

**DELETE /categories/:id**
- Supprime une catégorie
- Condition: aucun produit ne doit utiliser cette catégorie

### Produits

**GET /products**
- Récupère tous les produits avec leurs catégories
- Inclut: nom, description, prix, devise, quantité, statut

**GET /products/:id**
- Récupère un produit spécifique
- Inclut: détails complets + catégorie

**GET /products/category/:categoryId**
- Récupère tous les produits d'une catégorie

**POST /products**
- Crée un nouveau produit
- Body:
  ```json
  {
    "name": "string",           // Requis, unique
    "description": "string",     // Optionnel
    "price": number,             // Requis, >= 0
    "currency": "string",        // Optionnel, défaut: USD
    "quantity": number,          // Optionnel, défaut: 0
    "active": boolean,           // Optionnel, défaut: true
    "categoryId": number         // Requis
  }
  ```

**PUT /products/:id**
- Met à jour un produit
- Body: les mêmes champs (tous optionnels)

**DELETE /products/:id**
- Supprime un produit

## 🗄️ Schéma de Base de Données

### Modèle Category
```
id          : Int       (Clé primaire, auto-incrémenté)
name        : String    (Unique, max 60 caractères)
createdAt   : DateTime  (Automatique)
updatedAt   : DateTime  (Automatique)
products    : Product[] (Relation)
```

### Modèle Product
```
id          : Int       (Clé primaire, auto-incrémenté)
name        : String    (Unique, max 120 caractères)
description : String    (Optionnel, texte long)
price       : Decimal   (10 chiffres, 2 décimales)
currency    : String    (3 caractères, défaut: USD)
quantity    : Int       (Défaut: 0)
active      : Boolean   (Défaut: true)
categoryId  : Int       (Clé étrangère)
category    : Category  (Relation)
createdAt   : DateTime  (Automatique)
updatedAt   : DateTime  (Automatique)
```

## 🔄 Gestion des Erreurs

### Codes d'Erreur HTTP
- **200/201**: Succès
- **204**: Succès (aucun contenu)
- **404**: Ressource non trouvée
- **409**: Conflit (ex: nom déjà existant)
- **422**: Données invalides
- **500**: Erreur serveur

### Formats d'Erreur
```json
{
  "error": "Description de l'erreur"
}
```

## 📦 Dépendances

### Production
- **express**: ^5.2.1 - Framework web
- **@prisma/client**: ^5.22.0 - Client ORM
- **cors**: ^2.8.5 - CORS middleware

### Développement
- **prisma**: ^5.22.0 - CLI Prisma
- **nodemon**: ^3.1.14 - Auto-reload

## 🔐 Sécurité

⚠️ **À implémenter pour la production**:
- Authentification JWT
- Validation des inputs (sanitization)
- Rate limiting
- Logging et monitoring
- HTTPS obligatoire

## 📝 Commandes Prisma Utiles

```bash
# Afficher les migrations appliquées
npx prisma migrate status

# Créer une migration (après modification du schéma)
npx prisma migrate dev --name nom_de_la_migration

# Réinitialiser la base de données
npx prisma migrate reset

# Ouvrir Prisma Studio (UI pour la BD)
npx prisma studio
```

## 🐛 Dépannage

### Erreur: `PrismaClientInitializationError`
- Vérifier que PostgreSQL est en cours d'exécution
- Vérifier le DATABASE_URL dans .env

### Erreur: `Unique constraint failed`
- Le nom de catégorie/produit existe déjà

### Erreur: `Foreign key constraint failed`
- La catégorie spécifiée n'existe pas

## 📞 Notes

- Les prix sont stockés avec 2 décimales (DECIMAL(10,2))
- Les quantités doivent être des entiers
- Les noms doivent être uniques
- Les descriptions sont optionnelles
- Les timestamps sont automatiquement gérés

---

**API créée avec Express.js et Prisma**
