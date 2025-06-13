const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const newAccount = await prisma.account.create({
      data: {
        firstName: 'Jean',
        lastName: 'DUPONT',
        email: 'test@gmail.com',
      },
    });

    console.log('Compte créé :', newAccount);
  } catch (error) {
    console.log("error : ", error);
  }


  const logementType = await prisma.logementType.createMany({
    data: [
      { type: 'MAISON' },
      { type: 'APPARTEMENT' },
    ],
    skipDuplicates: true,
  });

  console.log('Types de logement créés :', logementType);

  const propertyType = await prisma.propertyType.createMany({
    data: [
      { type: 'ENTIER' },
      { type: 'APPARTEMENT' },
      { type: 'HABITANT' },
    ],
    skipDuplicates: true,
  });

  console.log('Types de propriétés créés :', propertyType);
}

main()
    .catch(e => {
      console.error(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
