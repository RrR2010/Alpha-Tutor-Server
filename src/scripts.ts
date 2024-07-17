import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function main() {
  const activeStatus = await prisma.userStatus.upsert({
    where: {name: 'Ativo'},
    update: {},
    create: {name: 'Ativo'},
  })
  const inactiveStatus = await prisma.userStatus.upsert({
    where: {name: 'Inativo'},
    update: {},
    create: {name: 'Inativo'},
  })
  const vacationStatus = await prisma.userStatus.upsert({
    where: {name: 'Férias'},
    update: {},
    create: {name: 'Férias'},
  })
  const sickLeaveStatus = await prisma.userStatus.upsert({
    where: {name: 'Afastado'},
    update: {},
    create: {name: 'Afastado'},
  })

  const user = await prisma.user.upsert({
    where: {externalID: '555314'},
    update: {},
    create: {
      externalID: '555314',
      name: 'Richard de Souza Morais Inacio',
      email: 'rdinacio@arcor.com',
      statusId: activeStatus.id,
    },
  })

  const richardUser = await prisma.user.findFirstOrThrow({where: {email: 'rdinacio@arcor.com'}})

  const adminRole = await prisma.role.upsert({
    where: {name: 'Admin'},
    update: {},
    create: {
      name: 'Admin',
      description:
        'Tem acesso completo ao sistema, incluindo gestão de usuários, configuração da plataforma, gerenciamento de conteúdo, segurança, e acesso a relatórios detalhados.',
    },
  })

  const userRole = await prisma.userRole.upsert({
    where: {userId_roleId: {userId: richardUser.id, roleId: adminRole.id}},
    update: {},
    create: {
      userId: richardUser.id,
      roleId: adminRole.id,
      assignedById: richardUser.id,
    },
  })
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
