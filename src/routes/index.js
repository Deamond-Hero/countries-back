const { Router } = require("express");
const { getRouter } = require("./getRouter");
const { postRouter } = require("./postRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", getRouter);
router.use("/", postRouter);

module.exports = router;
