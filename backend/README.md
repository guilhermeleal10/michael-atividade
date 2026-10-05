# Backend — Sistema de Monitoramento de Eventos

## Requisitos

- Node.js 20+
- PostgreSQL 14+
- Banco PostgreSQL chamado `monitoramento_eventos`
- PostgreSQL acessível em `localhost:5432`

## 1. Instalar

```powershell
npm install
```

## 2. Configurar

Copie `.env.example` para `.env` e ajuste a senha do PostgreSQL.

Exemplo:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/monitoramento_eventos?schema=public"
JWT_SECRET="chave-secreta"
PORT=3000
FRONTEND_URL="http://localhost:5173"
```

## 3. Gerar Prisma

```powershell
npm run prisma:generate
```

## 4. Testar banco

```powershell
npm run db:check
```

## 5. Criar tabelas

```powershell
npm run db:migrate
```

## 6. Criar dados iniciais

```powershell
npm run db:seed
```

## 7. Rodar

```powershell
npm run dev
```

API:

http://localhost:3000

Health:

http://localhost:3000/health

Login inicial:

- E-mail: `admin@evento.com`
- Senha: `admin123`

## Se o erro P1001 aparecer

O código `P1001` significa que o Prisma não consegue alcançar o PostgreSQL em `localhost:5432`.

No PowerShell:

```powershell
Get-Service *postgres*
```

Depois:

```powershell
Test-NetConnection localhost -Port 5432
```

O esperado é:

```text
TcpTestSucceeded : True
```

Se o serviço existir e estiver parado, inicie-o usando o nome retornado por `Get-Service *postgres*`, por exemplo:

```powershell
Start-Service postgresql-x64-16
```
