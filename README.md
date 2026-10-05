# Sistema de Monitoramento de Eventos

Projeto completo em uma única raiz, dividido em `backend` e `frontend`.
Docker não é utilizado.

## Requisitos
- Node.js 20+
- PostgreSQL 14+
- PostgreSQL em `localhost:5432`
- banco `monitoramento_eventos`

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
