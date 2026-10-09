# Fundação Bradesco — Eventos e Pesquisa

Sistema web para organizar eventos, turmas e estudantes e registrar pesquisas de campo. O projeto tem uma interface React, uma API Node.js/Express e banco PostgreSQL.

## O que o sistema oferece

- Painel com totais de eventos, turmas, estudantes e pesquisas.
- Cadastro e consulta de eventos, turmas e estudantes.
- Registro de pesquisas de campo associado a um evento e a um estudante.
- Acesso de administrador para gerenciar usuários e perfis.
- Tema claro e escuro. Use o botão **Tema escuro** ou **Tema claro** na tela de login ou no menu lateral; a escolha fica salva no navegador.

## Requisitos

Escolha uma das formas de execução:

- **Docker:** Docker Desktop com Docker Compose e acesso à internet para baixar as imagens na primeira execução.
- **Execução local:** Node.js 20 ou superior, npm e PostgreSQL 14 ou superior.

## Opção 1: executar com Docker Compose

Abra o PowerShell na pasta raiz do projeto e inicie os serviços:

```powershell
docker compose -f backend/docker_compose.yml up -d
```

Na primeira execução, o Compose baixa as imagens, inicia o PostgreSQL, instala as dependências nos containers, aplica a migration e cria os dados iniciais. Aguarde alguns instantes até os serviços ficarem prontos.

Abra no navegador:

- Site: <http://localhost:5173>
- API: <http://localhost:3000>
- Saúde da API: <http://localhost:3000/health>

Para acompanhar a inicialização e consultar erros:

```powershell
docker compose -f backend/docker_compose.yml logs -f
```

Para parar os serviços:

```powershell
docker compose -f backend/docker_compose.yml down
```

Os dados do PostgreSQL ficam em um volume Docker e são preservados ao parar os serviços. Para iniciar novamente, use o comando `up -d` acima.

## Opção 2: executar localmente

### 1. Inicie e prepare o PostgreSQL

Inicie o serviço PostgreSQL e crie um banco chamado `monitoramento_eventos`. A configuração de exemplo usa usuário e senha `postgres`, na porta `5432`. Se suas credenciais forem diferentes, atualize o arquivo de ambiente no próximo passo.

### 2. Configure o backend

Na raiz do projeto, crie `backend/.env` a partir do exemplo:

```powershell
Copy-Item backend/.env.example backend/.env
```

Edite `backend/.env` se necessário. Exemplo:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/monitoramento_eventos?schema=public"
JWT_SECRET="defina-uma-chave-local"
PORT=3000
FRONTEND_URL="http://localhost:5173"
```

`DATABASE_URL` deve apontar para seu PostgreSQL. `JWT_SECRET` é usado para assinar os tokens de acesso; defina uma chave própria para qualquer ambiente compartilhado.

### 3. Instale as dependências e prepare o banco

Ainda na raiz do projeto:

```powershell
npm run install:all
npm run backend:db:check
npm run backend:db:migrate
npm run backend:db:seed
```

O comando de verificação confirma a conexão com o banco. A migration cria as tabelas; o seed adiciona a conta de administrador e dados de exemplo.

### 4. Inicie a API e o site

Abra dois terminais PowerShell na raiz do projeto.

No primeiro, inicie o backend:

```powershell
npm run backend:dev
```

No segundo, inicie o frontend:

```powershell
npm run frontend:dev
```

Acesse <http://localhost:5173>. A API ficará em <http://localhost:3000> e o endpoint de saúde em <http://localhost:3000/health>.

## Acesso inicial

Depois de executar o seed, entre com:

- **E-mail:** `admin@evento.com`
- **Senha:** `admin123`

Essa conta é destinada à configuração local inicial. Após entrar, use **Usuários** para criar as contas necessárias. Administradores podem gerenciar usuários; pesquisadores usam as funções de eventos, turmas, estudantes e pesquisa de campo.

## Scripts úteis

Execute estes comandos na raiz do projeto:

| Comando | Ação |
| --- | --- |
| `npm run install:all` | Instala dependências do backend e do frontend |
| `npm run backend:dev` | Inicia a API em modo de desenvolvimento |
| `npm run frontend:dev` | Inicia o site em modo de desenvolvimento |
| `npm run backend:db:check` | Verifica a conexão com PostgreSQL |
| `npm run backend:db:migrate` | Aplica migrations em desenvolvimento |
| `npm run backend:db:seed` | Cria a conta inicial e registros de exemplo |
| `npm run build` | Compila o backend e gera o build do frontend |

## Solução de problemas

### PostgreSQL indisponível ou erro Prisma P1001

Confirme que o PostgreSQL está iniciado, que o banco `monitoramento_eventos` existe e que a URL em `backend/.env` tem usuário, senha, porta e nome do banco corretos. No PowerShell, verifique se a porta padrão está acessível:

```powershell
Test-NetConnection localhost -Port 5432
```

O resultado esperado é `TcpTestSucceeded : True`.

### Porta 5173 ou 3000 já está em uso

Encerre o outro processo que usa a porta ou ajuste a configuração correspondente. A porta do backend vem de `PORT` em `backend/.env`; o frontend usa Vite e, por padrão, a porta `5173`.

### O site não consegue acessar a API

Confirme que o backend está em execução e que <http://localhost:3000/health> responde. Se alterou as portas ou endereços, atualize `VITE_API_URL` em `frontend/.env.local` e `FRONTEND_URL` em `backend/.env` para apontarem aos endereços corretos.

### Docker não baixa as imagens

Na primeira execução é necessário acessar o Docker Hub. Verifique a conexão com a internet e tente novamente:

```powershell
docker compose -f backend/docker_compose.yml pull
docker compose -f backend/docker_compose.yml up -d
```

### Consultar logs do Docker

```powershell
docker compose -f backend/docker_compose.yml logs -f backend
docker compose -f backend/docker_compose.yml logs -f frontend
docker compose -f backend/docker_compose.yml logs -f db
```

## Estrutura do projeto

```text
frontend/   Interface React, páginas, estilos e integração com a API
backend/    API Express, autenticação, Prisma e configuração Docker
```
