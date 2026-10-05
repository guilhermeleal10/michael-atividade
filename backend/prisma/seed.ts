import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const senha = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@evento.com" },
    update: {},
    create: {
      nome: "Administrador",
      email: "admin@evento.com",
      senha,
      role: "ADMIN"
    }
  });

  const turmaA = await prisma.turma.upsert({
    where: { id: "11111111-1111-4111-8111-111111111111" },
    update: {},
    create: {
      id: "11111111-1111-4111-8111-111111111111",
      nome: "1º Ano A",
      anoEscolar: "1º Ano",
      escola: "Escola Modelo"
    }
  });

  const turmaB = await prisma.turma.upsert({
    where: { id: "22222222-2222-4222-8222-222222222222" },
    update: {},
    create: {
      id: "22222222-2222-4222-8222-222222222222",
      nome: "2º Ano A",
      anoEscolar: "2º Ano",
      escola: "Escola Modelo"
    }
  });

  await prisma.turma.upsert({
    where: { id: "33333333-3333-4333-8333-333333333333" },
    update: {},
    create: {
      id: "33333333-3333-4333-8333-333333333333",
      nome: "3º Ano A",
      anoEscolar: "3º Ano",
      escola: "Escola Modelo"
    }
  });

  const estudante = await prisma.estudante.upsert({
    where: { id: "44444444-4444-4444-8444-444444444444" },
    update: {},
    create: {
      id: "44444444-4444-4444-8444-444444444444",
      nome: "Estudante de Exemplo",
      idade: 16,
      profissaoFutura: "Desenvolvedor de Software",
      turmaId: turmaA.id
    }
  });

  await prisma.evento.upsert({
    where: { id: "55555555-5555-4555-8555-555555555555" },
    update: {},
    create: {
      id: "55555555-5555-4555-8555-555555555555",
      nome: "Evento de Exemplo",
      descricao: "Evento inicial para validar o sistema",
      local: "Escola Modelo",
      ativo: true
    }
  });

  console.log("Seed concluído.");
  console.log(`Administrador: ${admin.email} / admin123`);
  console.log(`Turmas criadas: ${turmaA.nome}, ${turmaB.nome}`);
  console.log(`Estudante de exemplo: ${estudante.nome}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
