# Sistema de Monitoramento de Eventos

Projeto completo em uma única raiz, dividido em `backend` e `frontend`.

## Requisitos
- Node.js 20+
- PostgreSQL 14+
- PostgreSQL em `localhost:5432`
- banco `monitoramento_eventos`
- Docker com Docker Compose (opcional)

## Execução com Docker Compose

Na raiz do projeto, execute:

```powershell
docker compose -f backend/docker_compose.yml up
```

O Compose inicia o PostgreSQL, o backend e o frontend. Na primeira inicialização,
o backend aplica as migrations e carrega os dados iniciais. Acesse
http://localhost:5173. Para parar os serviços, use `Ctrl+C`; para removê-los,
execute:

```powershell
docker compose -f backend/docker_compose.yml down
```

## Instalação
```powershell
npm run install:all
npm run backend:db:check
npm run backend:db:migrate
npm run backend:db:seed
```

## Execução

Terminal 1:
```powershell
npm run backend:dev
```

Terminal 2:
```powershell
npm run frontend:dev
```

Frontend: http://localhost:5173  
Backend: http://localhost:3000  
Health: http://localhost:3000/health

Login inicial:
`admin@evento.com`
`admin123`
