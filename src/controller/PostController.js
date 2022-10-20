import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

module.exports = {

    async index(req, res, next) {

        const post = await prisma.post.findMany({
            select: {

                userId: true,
                content: true
            }
        })

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

    },
    async update(req, res) {
        try {
            const { id } = req.params
            const { content } = req.body

            const post = await prisma.post.findUnique({ where: { id: Number(id) } })

            if (!post) {
                return res.json({ error: "post not found" })
            }

            await prisma.post.update({ where: { id: Number(id) }, data: { content }, })

            return res.json({ sucess: "atualizado com sucesso" })

        } catch (error) {
            return res.json({ error })
        }

    },
    async delete(req, res) {
        try {
            const { id } = req.params

            const post = await prisma.post.findUnique({ where: { id: Number(id) } })

            if (!post) {
                return res.json({ error: "post not found" })
            }

            await prisma.post.delete({ where: { id: Number(id) } })

            return res.json({ sucess: "deletado com sucesso" })

        } catch (error) {
            return res.json({ error })
        }

    }

}