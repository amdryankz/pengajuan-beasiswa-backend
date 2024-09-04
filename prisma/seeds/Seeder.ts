import { UserSeeder } from "./UserSeeder";
import { prisma } from "../../src/applications/prisma"

async function seed() {
    await UserSeeder(prisma);
}

seed().then(() => {
    console.log("Seeding successfully")
})