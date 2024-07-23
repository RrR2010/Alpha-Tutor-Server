import { PrismaClient } from '@prisma/client'
import userJson from './randomData/user.json'
import knowledgeJson from './randomData/knowledge.json'

const prisma = new PrismaClient()

export async function importUsers() {
  userJson.forEach(async (user) => {
    const status = await prisma.userStatus.upsert({
      where: { name: user.statusName },
      update: {},
      create: {
        name: user.statusName
      }
    })

    await prisma.user.upsert({
      where: { externalID: user.externalID },
      update: {},
      create: {
        externalID: user.externalID,
        name: user.name,
        email: user.email,
        statusId: status.id
      }
    })
  })
}

export async function importKnowledge() {}
