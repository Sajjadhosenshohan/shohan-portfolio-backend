import bcrypt from 'bcryptjs';
import config from '../config';
import prisma from '../shared/prisma';
import { seedSkills } from './seedSkills';

export const seedAdmin = async () => {
  try {
    const adminEmail = config.ADMIN_EMAIL!;
    const adminPassword = config.ADMIN_PASSWORD!;

    const existingAdmin = await prisma.user.findFirst({
      where: {
        role: 'ADMIN',
      },
    });

    if (existingAdmin) {
      console.log('Admin already exists. Skipping seeding.');
      return;
    }

    const hashedPassword = await bcrypt.hash(
      adminPassword,
      Number(config.BCRYPT_SALt_ROUNDS || 12),
    );

    const admin = await prisma.user.create({
      data: {
        name: 'Sajjad',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    console.log('Admin created successfully:', admin.email);
  } catch (error) {
    console.error('Error seeding admin:', error);
  }
};

export { seedSkills };

export const seedDatabase = async () => {
  await seedAdmin();
  await seedSkills();
};

if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Database seeding finished.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Database seeding failed:', err);
      process.exit(1);
    });
}
