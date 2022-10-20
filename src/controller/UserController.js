import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

module.exports = {
    async index(req, res) {
        const user = await prisma.user.findMany()

        res.json(user)
    },
    async showById(req, res) {

        const { id } = req.params
        const user = await prisma.user.findUnique({ where: { id: Number(id) } })

        res.json(user)
    },
    async create(req, res) {
        try {

            const { name, email } = req.body

            let user = await prisma.user.findUnique({ where: { email } })

            if (user) {
                return res.json({ error: "ja existe um Usuário com este email" })
            }

            user = await prisma.user.create({
                data: {
                    name,
                    email,
                },
            })

            return res.json(user)

        } catch (error) {
            return res.json({ error })
        }

    },
    async create(req, res) {
        try {

            const { name, email } = req.body

            let user = await prisma.user.findUnique({ where: { email } })

            if (user) {
                return res.json({ error: "ja existe um Usuário com este email" })
            }

            user = await prisma.user.create({
                data: {
                    name,
                    email,
                },
            })

            return res.json(user)

        } catch (error) {
            return res.json({ error })
        }

    },
    async update(req, res) {
        try {

            const { name, email } = req.body
            const { id } = req.params

            let user = await prisma.user.findUnique({ where: { id: Number(id) } })

            if (!user) {
                return res.json({ error: "user not found" })
            }

            user = await prisma.user.update({
                where: { id: Number(id) },
                data: {
                    name,
                    email,
                }
            })
            return res.json({ sucess: "atualizando com sucesso" })

        } catch (error) {
            return res.json({ error })
        }

    },

    async delete(req, res) {
        try {

            const { id } = req.params

            if (!id) {
                return res.json({ error: "user not found" })
            }

            await prisma.user.delete({ where: { id: Number(id) } })

            res.json({ sucess: "deletado com sucesso" })

        } catch (error) {
            return res.json({ error })
        }
    }
}