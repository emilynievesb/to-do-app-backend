import { Router } from 'express';

import userInitRoute from './user.route.js';

const initAPIRoutes = () => {
    const router = Router();
    router.use('/user', userInitRoute());
    return router;
};

export { initAPIRoutes };
