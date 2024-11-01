import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { CommunityController } from '../controllers/CommunityController';
import { PlayerController } from '../controllers/PlayerController';
import { MatchController } from '../controllers/MatchController';
import { authMiddleware, checkRole } from '../middlewares/auth';

const routes = Router();

// Controllers
const authController = new AuthController();
const communityController = new CommunityController();
const playerController = new PlayerController();
const matchController = new MatchController();

// Rotas públicas
routes.post('/register', authController.register);
routes.post('/login', authController.login);

// Middleware de autenticação
routes.use(authMiddleware);

// Rotas de Comunidades
routes.post('/communities', checkRole(['ADMIN', 'ORGANIZER']), communityController.create);
routes.get('/communities', communityController.list);
routes.post('/communities/:id/organizers', checkRole(['ADMIN']), communityController.addOrganizer);
routes.post('/communities/:id/members', checkRole(['ADMIN', 'ORGANIZER']), communityController.addMember);

// Rotas de Jogadores
routes.post('/players', checkRole(['ADMIN', 'ORGANIZER']), playerController.create);
routes.get('/players', playerController.list);
routes.get('/players/:id/stats', playerController.getStats);

// Rotas de Partidas
routes.post('/matches', checkRole(['ADMIN', 'ORGANIZER']), matchController.create);
routes.patch('/matches/:id/finish', checkRole(['ADMIN', 'ORGANIZER']), matchController.finish);
routes.get('/matches', matchController.list);

export { routes };