import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    status: 429,
    message: "Trop de tentatives de connexion échoué. Veuillez réessayer après 10 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default loginLimiter;