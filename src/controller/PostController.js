import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

module.exports = {

    async index(req, res, next) {

        const post = await prisma.post.findMany()

        res.json(post)

    },
    async create(req, res) {
        try {
            const { id } = req.params
            const { content } = req.body

            const user = await prisma.user.findUnique({ where: { id: Number(id) } })

            if (!user) {
                return res.json({ error: "user not found" })
            }

            const post = await prisma.post.create({
                data: {
                    content,
                    userId: user.id,
                },
                include: {
                    author: true
                }
            })

            return res.json({ post })

        } catch (error) {
            return res.json({ error })
        }

    }

}