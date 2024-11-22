import { validationResult } from 'express-validator';

const validateInputs = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Retorna los errores en formato JSON
  }
  next(); // Continuar si no hay errores
};

export default validateInputs;
