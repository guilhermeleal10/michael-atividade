import { Router } from "express";
import { authMiddleware, requireAdmin } from "./middlewares/auth.middleware";
import { AuthController } from "./controllers/auth.controller";
import { UserController } from "./controllers/user.controller";
import { TurmaController } from "./controllers/turma.controller";
import { EstudanteController } from "./controllers/estudante.controller";
import { EventoController } from "./controllers/evento.controller";
import { PesquisaController } from "./controllers/pesquisa.controller";

const router = Router();

const auth = new AuthController();
const users = new UserController();
const turmas = new TurmaController();
const estudantes = new EstudanteController();
const eventos = new EventoController();
const pesquisas = new PesquisaController();

router.get("/health", (_req, res) => {
  return res.json({
    ok: true,
    service: "monitoramento-eventos-backend",
    timestamp: new Date().toISOString()
  });
});

router.post("/login", auth.login.bind(auth));

router.use(authMiddleware);

router.get("/me", auth.me.bind(auth));
router.post("/logout", auth.logout.bind(auth));

router.get("/turmas", turmas.list.bind(turmas));
router.get("/turmas/:id", turmas.get.bind(turmas));
router.get("/turmas/:id/estudantes", turmas.students.bind(turmas));
router.post("/turmas", turmas.create.bind(turmas));
router.put("/turmas/:id", turmas.update.bind(turmas));
router.delete("/turmas/:id", turmas.delete.bind(turmas));

router.get("/estudantes", estudantes.list.bind(estudantes));
router.get("/estudantes/:id", estudantes.get.bind(estudantes));
router.post("/estudantes", estudantes.create.bind(estudantes));
router.put("/estudantes/:id", estudantes.update.bind(estudantes));
router.delete("/estudantes/:id", estudantes.delete.bind(estudantes));

router.get("/eventos", eventos.list.bind(eventos));
router.get("/eventos/:id", eventos.get.bind(eventos));
router.post("/eventos", eventos.create.bind(eventos));
router.put("/eventos/:id", eventos.update.bind(eventos));
router.delete("/eventos/:id", eventos.delete.bind(eventos));

router.get("/pesquisas", pesquisas.list.bind(pesquisas));
router.post("/pesquisas", pesquisas.create.bind(pesquisas));
router.delete("/pesquisas/:id", pesquisas.delete.bind(pesquisas));

router.use("/usuarios", requireAdmin);
router.get("/usuarios", users.list.bind(users));
router.post("/usuarios", users.create.bind(users));
router.put("/usuarios/:id", users.update.bind(users));
router.delete("/usuarios/:id", users.delete.bind(users));

export default router;
