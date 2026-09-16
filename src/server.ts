import app from './app';
import config from './app/config';
import { seedDatabase } from './app/seed';

async function main() {
  try {
    await seedDatabase();
    console.log("=== DATABASE URL CHECK ===", process.env.DATABASE_URL ? `LOADED SUCCESSFULLY ${process.env.DATABASE_URL}` : "NOT LOADED (UNDEFINED)");
    app.listen(config.PORT, () => {
      console.log('App is listening on port', config.PORT);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
