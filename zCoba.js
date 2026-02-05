const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const result = await prisma.notifikasi.updateMany({
    where: {
      recipientId: 'cmha7p6yc0000cfoe5w2e7gdr',
    },
    data: {
      isRead: false,
      readAt: null,
    },
  })

  console.log(`✅ Rows affected: ${result.count}`)
}

main()
  .catch((err) => {
    console.error('❌ Error:', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
