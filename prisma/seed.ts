import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { roundsOfHashing } from '../src/users/users.service'; 

const prisma = new PrismaClient();

// create dummy articles
async function main() {

  const passwordDennis = await bcrypt.hash('supersecret', roundsOfHashing);
  const passwordElon = await bcrypt.hash('supersecret', roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: { email: 'dennis@gmail.com' },
    update: {
      password: passwordDennis,
    },
    create: {
      email: 'dennis@gmail.com',
      name: 'Dennis Black',
      password: passwordElon,
    },
  });
  
  const user2 = await prisma.user.upsert({
    where: { email: 'elon@tesla.com' },
    update: {
      password: passwordElon,
    },
    create: {
      email: 'elon@tesla.com',
      name: 'Elon Musk',
      password: passwordElon,
    },
  });

    const post1 = await prisma.article.upsert({
      where: { title: 'Prisma Adds Support for MongoDB' },
      update: {},
      create: {
        title: 'Prisma Adds Support for MongoDB',
        body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
        description: 'We are excited to share that today\'s Prisma ORM release adds stable support for MongoDB!',
        published: false,
      },
    });
  
    const post2 = await prisma.article.upsert({
      where: { title: "What's new in Prisma? (Q1/22)" },
      update: {},
      create: {
        title: "What's new in Prisma? (Q1/22)",
        body: 'Our engineers have been working hard, issuing new releases with many improvements...',
        description: 'Learn about everything in the Prisma ecosystem and community from January to March 2022',
        published: true,
      },
    });

    console.log(user1, user2, post1, post2);
  }
  
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });