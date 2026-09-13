import app from './app';
import config from './app/config';
import { seedDatabase } from './app/seed';

async function main() {
  try {
    await seedDatabase();
    app.listen(config.PORT, () => {
      console.log('App is listening on port', config.PORT);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
