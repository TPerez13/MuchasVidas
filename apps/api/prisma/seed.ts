import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create habit types if they don't exist
  const habitTypes = [
    { name: 'Hidratación', description: 'Registro de ingesta de agua' },
    { name: 'Nutrición', description: 'Registro de comidas saludables' },
    { name: 'Ejercicio', description: 'Registro de actividad física' },
    { name: 'Sueño', description: 'Registro de horas de sueño' },
    { name: 'Meditación', description: 'Registro de sesiones de meditación' },
  ];

  for (const habitType of habitTypes) {
    await prisma.habitType.upsert({
      where: { name: habitType.name },
      update: {},
      create: habitType,
    });
  }

  // Create some sample achievements
  const achievements = [
    {
      name: 'Primeros pasos',
      description: 'Completa tu primer registro de hábito',
      criterion: 'FIRST_ENTRY',
    },
    {
      name: 'Racha de 7 días',
      description: 'Registra un hábito por 7 días seguidos',
      criterion: 'SEVEN_DAY_STREAK',
    },
    {
      name: 'Hidratación constante',
      description: 'Registra hidratación por 5 días seguidos',
      criterion: 'FIVE_DAY_HYDRATION',
    },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { name: achievement.name },
      update: {},
      create: {
        ...achievement,
        points: 10, // All achievements give 10 points for now
      },
    });
  }

  console.log('✅ Database seeded successfully');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
