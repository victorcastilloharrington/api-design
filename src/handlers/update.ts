import { NextFunction, Request, Response } from "express"
import prismaClient from "../db"
import { Update } from "@prisma/client"

// Get all updates
export const getUpdates = async (req: Request, res: Response) => {
    const products = await prismaClient.product.findMany({
        where: { belongsToId: req.user.id },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) =>
        [...allUpdates, ...product.updates], [] as Update[])

    res.json({ data: updates })
}

// Get one updates
export const getUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const update = await prismaClient.update.findUnique({
        where: { id: req.params.id },
    })

    res.json({ data: update })
}



// Create one update
export const createUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await prismaClient.product.findUnique({
            where: {
                id: req.body.productId,
            }
        })

        if (!product) {
            res.status(400).json({ error: "nope" })
            return
        }

        const update = await prismaClient.update.create({
            data: {
                title: req.body.title,
                body: req.body.body,
                productId: product.id,
            }
        })

        res.json({ data: update })
    } catch (e: any) {
        e.type = 'input'
        next(e)
    }
}


// Update one update
export const updateUpdate = async (req: Request, res: Response) => {
    const products = await prismaClient.product.findMany({
        where: { belongsToId: req.user.id },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) =>
        [...allUpdates, ...product.updates], [] as Update[])

    const match = updates.find(update => update.id === req.params.id)

    if (!match) {
        res.status(400).json({ error: "nope" })
        return
    }

    const updatedUpdate = await prismaClient.update.update({
        where: {
            id: req.params.id
        },
        data: req.body,
    })

    res.json({ data: updatedUpdate })
}

// Delete one update
export const deleteUpdate = async (req: Request, res: Response) => {
    const deleted = await prismaClient.update.delete({
        where: {
            id: req.params.id,
        }
    })

    res.json({ data: deleted })
}