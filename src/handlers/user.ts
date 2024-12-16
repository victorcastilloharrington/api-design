import prismaClient from "../db";
import { NextFunction, Request, Response } from "express";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";


export const createNewUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const user = await prismaClient.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password)
            }
        })

        const token = createJWT(user)

        return res.json({ token })
    } catch (e: any) {
        e.type = 'input'
        return next(e)
    }
}

export const signIn = async (req: Request, res: Response): Promise<any> => {
    const user = await prismaClient.user.findUnique({
        where: {
            username: req.body.username
        }
    })

    if (!user) return res.status(401).json({ message: 'nope' })

    const isValid = await comparePasswords(req.body.password, user?.password)

    if (!isValid) return res.status(401).json({ message: 'nope' })

    const token = createJWT(user)

    return res.json({ token })

}