/**
 * Category Controller
 * Ce controller gère les opérations CRUD pour les catégories de produits.
 * Il utilise Prisma pour interagir avec la base de données.
 * Les fonctions incluent:
 * - createCategory: Créer une nouvelle catégorie
 * - getCategories: Récupérer toutes les catégories
 * - updateCategory: Mettre à jour une catégorie existante
 * - deleteCategory: Supprimer une catégorie (si elle n'est pas utilisée par des produits)
 */

const prisma = require('../lib/prisma')

// Créer une nouvelle categorie
exports.createCategory = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(422).json({ error: 'Name is required' })
        }

        if (await prisma.category.findUnique({where: {name: req.body.name}})) {
            return res.status(409).json({ error:  `La categorie ${req.body.name} existe deja` })
        }

        const newCategory = await prisma.category.create({
            data: {
                name: req.body.name,
            },
        })

        return res.status(201).json(newCategory)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// Récupérer toutes les categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany()
        
        return res.status(200).json(categories)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// Mettre à jour une categorie
exports.updateCategory = async (req, res) => {
    try {
        if (!await prisma.category.findUnique({where: {id: parseInt(req.params.id)}})) {
            return res.status(404).json({ error: 'Category not found' })
        }

        if (!req.body.name) {
            return res.status(422).json({ error: 'Name is required' })
        }

        if (await prisma.category.findUnique({where: {name: req.body.name}})) {
            return res.status(409).json({ error:  `La categorie ${req.body.name} existe deja` })
        }

        const updatedCategory = await prisma.category.update({
            where: { id: parseInt(req.params.id) },
            data: {
                name: req.body.name,
            },
        })

        return res.status(200).json(updatedCategory)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
} 

// Supprimer une categorie
exports.deleteCategory = async (req, res) => {
    try {
        if (!await prisma.category.findUnique({ where: { id: parseInt(req.params.id) } })) {
            return res.status(404).json({ error: 'Category not found' })
        }

        const productCount = await prisma.product.count({
            where: {
                categoryId: parseInt(req.params.id)
            }
        })

        if (productCount) {
            return res.status(409).json({ error: `Category id is being used in ${productCount} product(s)` })
        }
        
        await prisma.category.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })

        return res.status(204).send()
    } catch (error) {
        return res.status(500).json({ error: error.message }) 
    }
}