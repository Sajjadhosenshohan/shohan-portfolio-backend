import prisma from '../shared/prisma';

export const defaultSkills = [
  // Backend & Core
  {
    name: 'Node.js',
    category: 'Backend & Core',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    sortOrder: 1,
  },
  {
    name: 'Express.js',
    category: 'Backend & Core',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    sortOrder: 2,
  },
  {
    name: 'TypeScript',
    category: 'Backend & Core',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    sortOrder: 3,
  },
  {
    name: 'REST API Design',
    category: 'Backend & Core',
    image: 'https://img.icons8.com/color/96/api-settings.png',
    sortOrder: 4,
  },
  {
    name: 'JWT / Auth',
    category: 'Backend & Core',
    image: 'https://jwt.io/img/pic_logo.svg',
    sortOrder: 5,
  },
  {
    name: 'Socket.io',
    category: 'Backend & Core',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg',
    sortOrder: 6,
  },
  {
    name: 'Redis',
    category: 'Backend & Core',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    sortOrder: 7,
  },
  {
    name: 'BullMQ',
    category: 'Backend & Core',
    image: 'https://avatars.githubusercontent.com/u/60454378?s=200&v=4',
    sortOrder: 8,
  },

  // Database & ORM
  {
    name: 'PostgreSQL',
    category: 'Database & ORM',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    sortOrder: 9,
  },
  {
    name: 'MongoDB',
    category: 'Database & ORM',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    sortOrder: 10,
  },
  {
    name: 'Mongoose',
    category: 'Database & ORM',
    image: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mongoose/mongoose.png',
    sortOrder: 11,
  },
  {
    name: 'Prisma',
    category: 'Database & ORM',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg',
    sortOrder: 12,
  },

  // Automation & Integrations
  {
    name: 'n8n',
    category: 'Automation & Integrations',
    image: 'https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png',
    sortOrder: 13,
  },
  {
    name: 'Zapier',
    category: 'Automation & Integrations',
    image: 'https://cdn.simpleicons.org/zapier/FF4A00',
    sortOrder: 14,
  },
  {
    name: 'Webhooks',
    category: 'Automation & Integrations',
    image: 'https://img.icons8.com/color/96/webhook.png',
    sortOrder: 15,
  },
  {
    name: 'Stripe / Payment Gateway',
    category: 'Automation & Integrations',
    image: 'https://cdn.simpleicons.org/stripe/635BFF',
    sortOrder: 16,
  },
  {
    name: 'Twilio',
    category: 'Automation & Integrations',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twilio/twilio-original.svg',
    sortOrder: 17,
  },
  {
    name: 'ElevenLabs',
    category: 'Automation & Integrations',
    image: 'https://cdn.simpleicons.org/elevenlabs/000000',
    sortOrder: 18,
  },

  // AI / LLM
  {
    name: 'LLM Integration (OpenAI)',
    category: 'AI / LLM',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    sortOrder: 19,
  },
  {
    name: 'Prompt Engineering',
    category: 'AI / LLM',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
    sortOrder: 20,
  },

  // Deploy & Infra
  {
    name: 'Nginx',
    category: 'Deploy & Infra',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
    sortOrder: 21,
  },
  {
    name: 'AWS (EC2, S3)',
    category: 'Deploy & Infra',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    sortOrder: 22,
  },
  {
    name: 'CI/CD',
    category: 'Deploy & Infra',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg',
    sortOrder: 23,
  },
  {
    name: 'Domain Configuration',
    category: 'Deploy & Infra',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg',
    sortOrder: 24,
  },
  {
    name: 'DB Setup / Hosting',
    category: 'Deploy & Infra',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg',
    sortOrder: 25,
  },

  // Frontend
  {
    name: 'Next.js',
    category: 'Frontend',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    sortOrder: 26,
  },
  {
    name: 'React',
    category: 'Frontend',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    sortOrder: 27,
  },
  {
    name: 'Redux',
    category: 'Frontend',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
    sortOrder: 28,
  },
  {
    name: 'JavaScript',
    category: 'Frontend',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    sortOrder: 29,
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    sortOrder: 30,
  },
  {
    name: 'HTML/CSS',
    category: 'Frontend',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    sortOrder: 31,
  },

  // Tools
  {
    name: 'Git / GitHub',
    category: 'Tools',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    sortOrder: 32,
  },
  {
    name: 'Docker',
    category: 'Tools',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    sortOrder: 33,
  },
  {
    name: 'Postman',
    category: 'Tools',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
    sortOrder: 34,
  },
  {
    name: 'VS Code',
    category: 'Tools',
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    sortOrder: 35,
  },
];

export const seedSkills = async (force: boolean = false) => {
  try {
    const existingCount = await prisma.skill.count();

    if (existingCount > 0 && !force) {
      console.log(`[Seed Skills] ${existingCount} skills already exist in database. Skipping.`);
      return;
    }

    if (force && existingCount > 0) {
      console.log(`[Seed Skills] Force flag detected. Clearing existing ${existingCount} skills...`);
      await prisma.skill.deleteMany({});
    }

    console.log(`[Seed Skills] Seeding ${defaultSkills.length} skills into MongoDB...`);

    for (const skill of defaultSkills) {
      await prisma.skill.create({
        data: skill,
      });
    }

    console.log(`[Seed Skills] Successfully seeded all ${defaultSkills.length} skills!`);
  } catch (error) {
    console.error('[Seed Skills] Error:', error);
  }
};

// Run directly if called as a script
if (require.main === module) {
  const isForce = process.argv.includes('--force');
  seedSkills(isForce)
    .then(() => {
      console.log('[Seed Skills] Complete.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('[Seed Skills] Failed:', err);
      process.exit(1);
    });
}
