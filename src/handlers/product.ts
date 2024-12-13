import { Request, Response } from "express"
import prismaClient from "src/db"

// Get all products
export const getProducts = async (req: Request, res: Response) => {
    const user = await prismaClient.user.findUnique({
        where: { id: req.user.id },
        include: {
            products: true
        }
    })

    res.json({ data: user?.products })
}

// Get one products
export const getProduct = async (req: Request, res: Response) => {
    const product = await prismaClient.product.findUnique({
        where: { belongsToId: req.user.id, id: req.params.id },
    })

    res.json({ data: product })
}

// Create one product
export const createProduct = async (req: Request, res: Response) => {
    const product = await prismaClient.product.create({
        data: {
            name: req.body.name,
            belongsToId: req.user.id
        }
    })

    res.json({ data: product })
}


// Update one product
export const updateProduct = async (req: Request, res: Response) => {
    const product = await prismaClient.product.update({
        where: { id: req.params.id, belongsToId: req.user.id },
        data: {
            name: req.body.name
        }
    })

    res.json({ data: product })
}

// Delete one product
export const deleteProduct = async (req: Request, res: Response) => {
    const deleted = await prismaClient.product.delete({
        where: {
            id: req.params.id,
            belongsToId: req.user.id
        }
    })

    res.json({ data: deleted })
}