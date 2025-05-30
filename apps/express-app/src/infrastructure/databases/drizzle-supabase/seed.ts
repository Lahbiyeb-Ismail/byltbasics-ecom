import { envConfig } from "@/config";
import { logger } from "@/presentation/service-provider";

import { connection, db } from "./";
import { clearProductDatabase, seedProductDatabase } from "./seeds";

if (!envConfig.db.db_seeding) {
  throw new Error("You must set DB_SEEDING to \"true\" when running seeds");
}

async function main() {
  await clearProductDatabase(db);

  await seedProductDatabase(db);

  await connection.end();
}

main()
  .then(() => {
    logger.info("Seeding completed");
    process.exit(0);
  })
  .catch((error) => {
    logger.error("Seeding failed", error);
    process.exit(1);
  });
