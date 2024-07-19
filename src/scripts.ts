import { PrismaClient } from '@prisma/client'
import { importUsers } from '../tests/db/randomData'

const prisma = new PrismaClient()

export async function main() {
  const activeStatus = await prisma.userStatus.upsert({
    where: { name: 'Ativo' },
    update: {},
    create: { name: 'Ativo' }
  })
  const inactiveStatus = await prisma.userStatus.upsert({
    where: { name: 'Inativo' },
    update: {},
    create: { name: 'Inativo' }
  })
  const vacationStatus = await prisma.userStatus.upsert({
    where: { name: 'Férias' },
    update: {},
    create: { name: 'Férias' }
  })
  const sickLeaveStatus = await prisma.userStatus.upsert({
    where: { name: 'Afastado' },
    update: {},
    create: { name: 'Afastado' }
  })

  await importUsers()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
