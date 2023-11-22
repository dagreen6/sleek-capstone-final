const { PrismaClient } = require("@prisma/client");
const cuid = require("cuid");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { userId: cuid() },
    update: {},
    create: {
      fullName: "Joseph Balisacan",
      email: "luke.balisacan@gmail.com",
      password: bcrypt.hashSync("@Default123", bcrypt.genSaltSync(10)),
      role: "admin",
      image: "",
      verificationStatus: true,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
