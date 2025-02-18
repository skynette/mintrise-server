import { Router } from 'express';

import users from './users/users.route';
import auth from './auth/auth.route';

const router: Router = Router();

router.use('/user', users);
router.use('/auth', auth);
// router.use("/projects", projects);

export default router;
