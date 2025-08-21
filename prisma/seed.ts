import prisma from "../src/lib/prisma";
import { generate_seeder } from "./../src/app_modules/_global/fun/generate_seeder";

(async () => {
  console.log("start seeder >>");
  await generate_seeder();
})()
  .then(() => {
    console.log("<< success seeder");
    process.exit(0);
  })
  .catch((e) => {
    console.error("<< error seeder", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
